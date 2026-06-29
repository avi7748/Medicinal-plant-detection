import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../styles/LiveStream.css";

const LiveStream = () => {
    const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const browserCanvasRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const frameIntervalRef = useRef(null);
  const processingRef = useRef(false);
  const socketRef = useRef(null);
  const timeoutRef = useRef(null);
  const noPlantTimeoutRef = useRef(null);

  const VIDEO_WIDTH = 960;
  const VIDEO_HEIGHT = 720;

  const [isConnected, setIsConnected] = useState(false);

  const [cameraIP, setCameraIP] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraMode, setCameraMode] = useState("browser"); // browser | ip
  const [browserCameraStarted, setBrowserCameraStarted] = useState(false);

  const [connecting, setConnecting] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [connectionError, setConnectionError] = useState("");

  const [showHelp, setShowHelp] = useState(false);

  const [noPlantDetected, setNoPlantDetected] = useState(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("Connected to Backend");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("detection_data", (data) => {
      if (cameraMode !== "ip") return;
      if (!imgRef.current || !canvasRef.current) return;

      setIsConnected(true);

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsConnected(false);
      }, 3000);

      imgRef.current.src = `data:image/jpeg;base64,${data.image}`;

      if (data.predictions.length > 0) {
        setNoPlantDetected(false);
        if (noPlantTimeoutRef.current) {
          clearTimeout(noPlantTimeoutRef.current);
          noPlantTimeoutRef.current = null;
        }
      } else {
        if (!noPlantTimeoutRef.current) {
          noPlantTimeoutRef.current = setTimeout(() => {
            setNoPlantDetected(true);
            noPlantTimeoutRef.current = null;
          }, 2000);
        }
      }

      drawBoxes(data.predictions);
    });

    return () => {
      socket.off("detection_data");
      socket.disconnect();

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

      if (noPlantTimeoutRef.current)
        clearTimeout(noPlantTimeoutRef.current);

      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }

      processingRef.current = false;

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };

  }, [cameraMode]);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 960, 720);
    }
    setNoPlantDetected(false);
  }, [cameraMode]);

  const drawBoxes = (predictions) => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!predictions || predictions.length === 0)
      return;

    predictions.forEach((p) => {

      if (!p.bbox || p.bbox.length !== 4)
        return;

      const [x1, y1, x2, y2] = p.bbox;

      const plantName = p.label || p.name || "Detection";

      const confidence =
        p.conf !== undefined ? p.conf : 0;

      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 4;
      ctx.strokeRect(
        x1,
        y1,
        x2 - x1,
        y2 - y1
      );

      ctx.font = "bold 18px Arial";

      const text =
        `${plantName} ${Math.round(confidence * 100)}%`;

      const textWidth =
        ctx.measureText(text).width;

      ctx.fillStyle = "#00FF00";
      ctx.fillRect(
        x1 - 2,
        y1 - 30,
        textWidth + 12,
        30
      );

      ctx.fillStyle = "black";
      ctx.fillText(
        text,
        x1 + 4,
        y1 - 8
      );

    });

  };

  const startBrowserCamera = async () => {
    if (!navigator.mediaDevices) {
      alert("Browser camera not supported.");
      return;
    }

    try {
      let stream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
      }

      mediaStreamRef.current = stream;
      videoRef.current.srcObject = stream;

      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();
      if (settings.facingMode === "user") {
        videoRef.current.style.transform = "scaleX(-1)";
      } else {
        videoRef.current.style.transform = "none";
      }

      track.onended = () => {
        disconnectCamera();
      };

      await videoRef.current.play();
      videoRef.current.onloadeddata = () => {
        setCameraReady(true);
        setIsConnected(true);
        setConnectionFailed(false);
        setConnectionError("");
      };
      setBrowserCameraStarted(true);
      frameIntervalRef.current = setInterval(sendFrame, 100);
    } catch (err) {
      setConnectionError("Camera permission denied.");
      setConnectionFailed(true);
    }
  };

  const sendFrame = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.readyState < 2) return;
    if (processingRef.current) return;

    processingRef.current = true;

    const canvas = browserCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 960;
    canvas.height = 720;
    ctx.drawImage(videoRef.current, 0, 0, 960, 720);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const form = new FormData();
      form.append("frame", blob, "frame.jpg");

      try {
        const res = await fetch("http://localhost:5000/api/process-frame", {
          method: "POST",
          body: form,
          cache: "no-store",
        });
        const data = await res.json();
        processingRef.current = false;
        drawBoxes(data.predictions);

        if (data.predictions.length > 0) {
          setNoPlantDetected(false);
          if (noPlantTimeoutRef.current) {
            clearTimeout(noPlantTimeoutRef.current);
            noPlantTimeoutRef.current = null;
          }
        } else {
          if (!noPlantTimeoutRef.current) {
            noPlantTimeoutRef.current = setTimeout(() => {
              setNoPlantDetected(true);
              noPlantTimeoutRef.current = null;
            }, 1000);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }, "image/jpeg", 0.7);
  };

  const connectCamera = async () => {

    const ipRegex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    if (cameraIP.trim() === "") {
      setConnectionError("Please enter IP address.");
      setConnectionFailed(true);
      return;
    }

    if (!ipRegex.test(cameraIP.trim())) {
      setConnectionError("Please enter a valid IPv4 address.");
      setConnectionFailed(true);
      return;
    }

    setConnecting(true);
    setConnectionFailed(false);
    setConnectionError("");

    const timer = setTimeout(() => {
      setConnecting(false);
      setConnectionError("Unable to connect, try again!");
      setConnectionFailed(true);
    }, 5000);

    try {

      const response = await fetch(
        "http://localhost:5000/api/connect-camera",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ip: cameraIP,
          }),
        }
      );

      const result = await response.json();

      clearTimeout(timer);

      if (result.success) {

        setConnecting(false);
        setCameraReady(true);
        setConnectionFailed(false);
        setConnectionError("");

      } else {

        setConnecting(false);
        setConnectionFailed(true);
        setConnectionError(result.message);

      }

    } catch {

      clearTimeout(timer);

      setConnecting(false);
      setConnectionFailed(true);
      setConnectionError("Unable to connect.");

    }

  };

  const disconnectCamera = async () => {
    if (cameraMode === "browser") {
      if (frameIntervalRef.current) {
        clearInterval(frameIntervalRef.current);
        frameIntervalRef.current = null;
      }

      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }

      processingRef.current = false;
      setBrowserCameraStarted(false);
    } else {
      try {
        await fetch("http://localhost:5000/api/disconnect-camera", {
          method: "POST",
        });
      } catch (err) {
        console.log(err);
      }
    }

    setCameraReady(false);
    setIsConnected(false);
    setCameraIP("");
    setConnectionError("");
    setConnectionFailed(false);
    setNoPlantDetected(false);

    if (imgRef.current) {
      imgRef.current.src = "";
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    if (browserCanvasRef.current) {
      const browserCtx = browserCanvasRef.current.getContext("2d");
      browserCtx.clearRect(0, 0, 960, 720);
    }
  };

  return (

    <div className="live-container">

      <h2 className="live-title">
        Live Detection
      </h2>

      <div className="video-wrapper">

        {!cameraReady && (

          <div className="camera-connect-overlay">

            <div className="camera-card">

              <button
                className="camera-help-btn"
                onClick={() => setShowHelp(true)}
                title="How to connect"
              >
                <i>i</i>
              </button>

              <h2 className="camera-title">
                Connect Camera
              </h2>

              <p>
                {cameraMode === "browser"
                  ? "Use your device camera directly."
                  : "Enter Mobile IP Webcam Address."}
              </p>

              <div className="camera-source">
                <label>
                  <input
                    type="radio"
                    checked={cameraMode === "browser"}
                    onChange={() => setCameraMode("browser")}
                  />
                  <p>Browser Camera</p>
                </label>
                <label>
                  <input
                    type="radio"
                    checked={cameraMode === "ip"}
                    onChange={() => setCameraMode("ip")}
                  />
                  <p>IP Webcam</p>
                </label>
              </div>

              {cameraMode === "ip" && (
                <input
                  type="text"
                  className="camera-input"
                  placeholder="192.168.0.4"
                  value={cameraIP}
                  onChange={(e) => setCameraIP(e.target.value)}
                />
              )}

              {connectionError && (
                <p className="camera-error" style={{ color: "red" }}>
                  {connectionError}
                </p>
              )}

              <button
                className="camera-connect-btn"
                onClick={() =>
                  cameraMode === "browser"
                    ? startBrowserCamera()
                    : connectCamera()
                }
                disabled={connecting}
              >
                {cameraMode === "browser"
                  ? "Start Camera"
                  : connecting
                    ? "Connecting..."
                    : "Connect Camera"}
              </button>

            </div>

            {showHelp && (

              <div className="help-overlay">

                <div className="help-card">

                  <button
                    className="close-help"
                    onClick={() =>
                      setShowHelp(false)
                    }
                  >
                    ×
                  </button>

                  <h2>How to Connect Camera using IP Webcam</h2>

                  <div className="help-steps">

                    <div className="help-step">
                      <span>1</span>
                      <p>
                        Download <b>IP Webcam</b>
                        {" "}from the Google Play Store.
                      </p>
                    </div>

                    <div className="help-step">
                      <span>2</span>
                      <p>
                        Open the app and tap
                        {" "}
                        <b>Start Server</b>.
                      </p>
                    </div>

                    <div className="help-step">
                      <span>3</span>
                      <p>
                        The app displays an IP address
                        (Example:
                        {" "}
                        <b>192.168.0.4</b>)
                      </p>
                    </div>

                    <div className="help-step">
                      <span>4</span>
                      <p>
                        Enter only the IP address
                        and press
                        {" "}
                        <b>Connect Camera</b>.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        )}
                {cameraReady && (
          <button
            className="disconnect-btn"
            onClick={disconnectCamera}
          >
            Disconnect
          </button>
        )}

        {cameraMode === "ip" ? (
          <img
            ref={imgRef}
            className="live-video-layer"
            alt=""
          />
        ) : (
          <video
            ref={videoRef}
            className="live-video-layer"
            playsInline
            muted
            autoPlay
          />
        )}

        <canvas
          ref={canvasRef}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          className="live-canvas-layer"
        />

        <canvas
          ref={browserCanvasRef}
          style={{ display: "none" }}
        />

        {!isConnected && cameraReady && (
          <div className="camera-overlay">
            NO SIGNAL
          </div>
        )}

        {cameraReady && isConnected && noPlantDetected && (
          <div className="no-plant-overlay">
            No medicinal plant detected
          </div>
        )}

      </div>

      <div className="live-status">

        <span
          className={`status-dot ${
            isConnected ? "green" : "red"
          }`}
        ></span>

        <p
          className={`status ${
            isConnected ? "green" : "red"
          }`}
        >
          {!cameraReady
            ? "Camera Not Connected"
            : cameraMode === "browser"
              ? "Browser Camera Active"
              : isConnected
                ? "Live Stream Active"
                : "Camera Disconnected"}
        </p>

      </div>

    </div>

  );

};

export default LiveStream;