import cv2, base64, threading, time
from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS
from ultralytics import YOLO
from datetime import datetime, timedelta
from urllib.parse import unquote
from database import DatabaseManager

# ---------------- APP SETUP ----------------
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# ---------------- CONFIG ----------------
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'medicinal_plants'
}

db = DatabaseManager(DB_CONFIG)

model = YOLO("D:/ENGINEERING/BE Project/Med/new/runs/detect/runs/detect/medicinal_plants_finetune_v23/weights/best.pt")
# model = YOLO("C:/Users/avisa/Downloads/plant_yolo11s_finetune4 (1)/plant_yolo11s_finetune4/weights/best.pt")
# model = YOLO(r"D:\Medicinal-Plants-Detection-Using-Machine-Learning-main\Model\Best_Model.pkl")
camera_ip = None
camera_url = None
camera_connected = False
camera_running = False
camera_lock = threading.Lock()

latest_frame = None
frame_lock = threading.Lock()

# 🔥 NEW: lock for GPS
location_lock = threading.Lock()

last_db_save = datetime.now()

# 🔥 FIX: store as float (not string)
latest_location = {
    "lat": 18.6224,
    "lng": 73.8168
}

species_id_map = db.fetch_species_map()

WRONG_CLASS_ID = 3
CORRECT_NAME = "Centella asiatica"


# ---------------- SOCKET ----------------
@socketio.on('save_plant_location')
def handle_location(data):
    global latest_location

    lat = data.get("lat")
    lng = data.get("lng")

    if lat is None or lng is None:
        print("❌ INVALID GPS RECEIVED:", data)
        return

    # 🔥 THREAD SAFE UPDATE
    with location_lock:
        latest_location["lat"] = float(lat)
        latest_location["lng"] = float(lng)

    # print("✅ UPDATED LOCATION:", latest_location)    


# ---------------- API ----------------
@app.route('/api/species')
def fetch_library():
    return jsonify(db.fetch_all_species())


@app.route('/api/plantinfo/<path:name>')
def get_plantinfo(name):
    try:
        name = unquote(name).strip()

        conn = db.get_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM species_info WHERE name = %s OR scientific_name = %s"
        cursor.execute(query, (name, name))

        row = cursor.fetchone()
        conn.close()

        return jsonify(row if row else {})

    except Exception as e:
        print("API Error:", e)
        return jsonify({})


@app.route('/api/history')
def get_history():
    try:
        page = request.args.get("page", default=1, type=int)
        limit = request.args.get("limit", default=50, type=int)

        data = db.get_detections(page=page, limit=limit)

        return jsonify(data)

    except Exception as e:
        print("History API Error:", e)

        return jsonify({
            "records": [],
            "page": 1,
            "pages": 1,
            "total": 0
        })


@app.route("/api/connect-camera", methods=["POST"])
def connect_camera():
    global camera_ip
    global camera_url
    global camera_connected
    global camera_running

    data = request.get_json()
    ip = data.get("ip", "").strip()

    if ip == "":
        return jsonify({
            "success": False,
            "message": "IP Address Required"
        })

    url = f"http://{ip}:8080/video"
    cap = cv2.VideoCapture(url)

    if not cap.isOpened():
        cap.release()
        return jsonify({
            "success": False,
            "message": "Unable to connect"
        })

    cap.release()

    with camera_lock:
        camera_ip = ip
        camera_url = url
        camera_connected = True
        camera_running = True

    return jsonify({
        "success": True,
        "message": "Camera Connected"
    })


@app.route("/api/disconnect-camera", methods=["POST"])
def disconnect_camera():
    global camera_url
    global camera_ip
    global latest_frame
    global camera_running

    with camera_lock:
        camera_url = None
        camera_ip = None
        camera_connected = False
        camera_running = False

    with frame_lock:
        latest_frame = None

    print("Camera Disconnected")

    return jsonify({
        "success": True
    })


# ---------------- CAMERA THREAD ----------------
def camera_thread():
    global latest_frame

    while True:
        if camera_url is None:
            time.sleep(1)
            continue

        cap = cv2.VideoCapture(camera_url)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        while True:
            # Stop immediately when disconnect is requested
            if not camera_running:
                print("Camera Disconnected")
                break

            ret, frame = cap.read()

            if not ret:
                print("Camera Lost")
                break

            with frame_lock:
                latest_frame = frame

        cap.release()

        with frame_lock:
            latest_frame = None

        time.sleep(2)


# ---------------- INFERENCE LOOP ----------------
def inference_loop():
    global last_db_save

    while True:
        if latest_frame is None:
            socketio.sleep(0.1)
            continue

        with frame_lock:
            img = latest_frame.copy()

        raw_h, raw_w, _ = img.shape
        scale_x, scale_y = 960 / raw_w, 720 / raw_h

        results = model.predict(img, imgsz=320, conf=0.6, verbose=False)

        detections = []

        if len(results[0].boxes) > 0:

            top_box = results[0].boxes[0]

            cls_id = int(top_box.cls[0])

            if cls_id == WRONG_CLASS_ID:
                top_name = CORRECT_NAME
            else:
                top_name = model.names[cls_id]

            top_conf = float(top_box.conf[0])

            # SAVE EVERY 10 SEC
            if datetime.now() - last_db_save > timedelta(seconds=10):

                plant_name = top_name.strip().lower()
                s_id = None

                for key in species_id_map:
                    if key and key.strip().lower() == plant_name:
                        s_id = species_id_map[key]
                        break

                if s_id:

                    with location_lock:
                        lat = latest_location["lat"]
                        lng = latest_location["lng"]

                    success = db.save_detection(
                        s_id,
                        int(top_conf * 100),
                        lat,
                        lng
                    )

                    if success:
                        print(f"SAVED: {top_name} | {lat}, {lng}")
                        last_db_save = datetime.now()

            socketio.emit('request_location', {
                "detected": True,
                "name": top_name,
                "conf": int(top_conf * 100),
                "time": datetime.now().strftime("%H:%M:%S")
            })

            for b in results[0].boxes:

                x1, y1, x2, y2 = b.xyxy[0].tolist()

                label = CORRECT_NAME if int(b.cls[0]) == WRONG_CLASS_ID else model.names[int(b.cls[0])]

                detections.append({
                    "bbox": [x1 * scale_x, y1 * scale_y, x2 * scale_x, y2 * scale_y],
                    "label": label,
                    "conf": float(b.conf[0])
                })

        else:
            socketio.emit('request_location', {
                "detected": False,
                "name": "No Medicinal Plant Detected",
                "conf": 0,
                "time": datetime.now().strftime("%H:%M:%S")
            })                  

            # socketio.emit('request_location', {
            #     "name": top_name,
            #     "conf": int(top_conf * 100),
            #     "time": datetime.now().strftime("%H:%M:%S")
            # })

            # for b in results[0].boxes:
            #     x1, y1, x2, y2 = b.xyxy[0].tolist()

            #     label = CORRECT_NAME if cls_id == WRONG_CLASS_ID else model.names[cls_id]

            #     detections.append({
            #         "bbox": [x1 * scale_x, y1 * scale_y, x2 * scale_x, y2 * scale_y],
            #         "label": label,
            #         "conf": float(b.conf[0])
            #     })


        stream_img = cv2.resize(img, (960, 720))
        _, buffer = cv2.imencode('.jpg', stream_img, [cv2.IMWRITE_JPEG_QUALITY, 50])

        socketio.emit('detection_data', {
            "image": base64.b64encode(buffer).decode('utf-8'),
            "predictions": detections
        })

        socketio.sleep(0.01)


if __name__ == "__main__":
    threading.Thread(target=camera_thread, daemon=True).start()
    socketio.start_background_task(inference_loop)
    socketio.run(app, host="0.0.0.0", port=5000)