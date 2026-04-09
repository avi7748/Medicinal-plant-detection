# Add all your plants here
PLANT_INFO = {
    "Aloe vera": "Aloe barbadensis miller",
    "Neem": "Azadirachta indica",
    "Tulsi": "Ocimum tenuiflorum",
    # 👉 add all 30 classes
}

last_detected = set()

def process_detections(detections):
    global last_detected

    current = set([d["name"] for d in detections])

    # ❌ No new species → skip
    if current == last_detected:
        return None

    last_detected = current

    enriched = []
    for d in detections:
        enriched.append({
            "name": d["name"],
            "scientific_name": PLANT_INFO.get(d["name"], "Unknown"),
            "confidence": d["confidence"],
            "bbox": d["bbox"]
        })

    return enriched