import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../styles/LiveStream.css";

const LiveStream = () => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const timeoutRef = useRef(null);
  const noPlantTimeoutRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [cameraIP, setCameraIP] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectionFailed, setConnectionFailed] = useState(false);
  const [connectionError, setConnectionError] = useState("");
  const [noPlantDetected, setNoPlantDetected] = useState(false);

  const VIDEO_WIDTH = 960;
  const VIDEO_HEIGHT = 720;

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
      if (!imgRef.current || !canvasRef.current) return;

   
    setIsConnected(true);

     if (timeoutRef.current) clearTimeout(timeoutRef.current);

  
    timeoutRef.current = setTimeout(() => {
        setIsConnected(false);
      }, 3000);

      // update image
      imgRef.current.src = `data:image/jpeg;base64,${data.image}`;

      // draw boxes
      // Show "No medicinal plant detected" only after 6 seconds
      if (data.predictions && data.predictions.length > 0) {

          // Plant detected
          setNoPlantDetected(false);

          // Cancel any pending timer
          if (noPlantTimeoutRef.current) {
              clearTimeout(noPlantTimeoutRef.current);
              noPlantTimeoutRef.current = null;
          }

      } else {

          // Start timer only once
          if (!noPlantTimeoutRef.current) {
              noPlantTimeoutRef.current = setTimeout(() => {
                  setNoPlantDetected(true);
                  noPlantTimeoutRef.current = null;
              }, 2000);
          }

      }

      // Draw boxes
      drawBoxes(data.predictions);                          
    });

    return () => {
      socket.off("detection_data");
      socket.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const drawBoxes = (predictions) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!predictions || predictions.length === 0) return;

    predictions.forEach((p) => {
      if (!p.bbox || p.bbox.length !== 4) return;

      const [x1, y1, x2, y2] = p.bbox;
      const plantName = p.label || p.name || "Detection";
      const confidence = p.conf !== undefined ? p.conf : 0;

      // box
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 4;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

      // label
      ctx.font = "bold 18px Arial";
      const text = `${plantName} ${Math.round(confidence * 100)}%`;
      const textWidth = ctx.measureText(text).width;

      ctx.fillStyle = "#00FF00";
      ctx.fillRect(x1 - 2, y1 - 30, textWidth + 12, 30);

      ctx.fillStyle = "black";
      ctx.fillText(text, x1 + 4, y1 - 8);
    });
  };

  const connectCamera = async () => {
    const ipRegex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
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
      setConnectionFailed(true);
    }, 6000);

    try {
      const response = await fetch("http://localhost:5000/api/connect-camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip: cameraIP }),
      });

      const result = await response.json();
      if (result.success) {
        clearTimeout(timer);
        setConnecting(false);
        setCameraReady(true);
      } else {
        clearTimeout(timer);
        setConnecting(false);
        setConnectionError(result.message);
        setConnectionFailed(true);
      }
    } catch {
      clearTimeout(timer);
      setConnecting(false);
      setConnectionError("Unable to connect.");
      setConnectionFailed(true);
    }
  };

  const disconnectCamera = async () => {
    try {
      await fetch("http://localhost:5000/api/disconnect-camera", {
        method: "POST",
      });
      setCameraReady(false);
      setIsConnected(false);
      setCameraIP("");
      setConnectionError("");
      setNoPlantDetected(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="live-container">
      <h2 className="live-title">Live Detection</h2>

      <div className="video-wrapper">
        {!cameraReady && (
          <div className="camera-connect-overlay">
            <div className="camera-card">
              <h2>Connect Mobile Camera</h2>
              <p>Enter Mobile IP Address</p>
              <input
                type="text"
                className="camera-input"
                placeholder="Enter Mobile IP Address"
                value={cameraIP}
                onChange={(e) => setCameraIP(e.target.value)}
              />
              {connectionError && (
                <p className="camera-error" style={{ color: "red" }}>
                  {connectionError}
                </p>
              )}
              <button
                className="camera-connect-btn"
                onClick={connectCamera}
              >
                {connecting ? "Connecting..." : "Connect Camera"}
              </button>
            </div>
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

        <img
          ref={imgRef}
          className="live-video-layer"
          alt="Live Stream"
        />
        <canvas
          ref={canvasRef}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          className="live-canvas-layer"
        />

        {!isConnected && (
            <div className="camera-overlay">
                NO SIGNAL
            </div>
        )}

        {isConnected && noPlantDetected && (
            <div className="no-plant-overlay">
                No medicinal plant detected
            </div>
        )}                            
      </div>

      <div className="live-status">
        <span className={`status-dot ${isConnected ? "green" : "red"}`}></span>
        <p className={`status ${isConnected ? "green" : "red"}`}>
          {isConnected ? "Live Stream Active" : "Camera Disconnected"}  
        </p>
      </div>
    </div>
  );
};

export default LiveStream;