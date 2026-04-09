import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../styles/LiveStream.css";

const LiveStream = () => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);

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

  return (
    <div className="live-container">
      <h2 className="live-title">Live Detection</h2>

      <div className="video-wrapper">
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
          <div className="camera-overlay">NO SIGNAL</div>
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