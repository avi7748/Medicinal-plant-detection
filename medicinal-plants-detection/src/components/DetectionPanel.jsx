import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../styles/DetectionPanel.css";

const DetectionPanel = () => {
  const [liveDetections, setLiveDetections] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("detection_data", (data) => {
      setLiveDetections(data.predictions);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <div className="detect-container">
      <h2 className="detect-title">Live Confidence</h2>
      {liveDetections.slice(0, 4).map((item, i) => (
        <div key={i} className="detect-item">
          <div className="detect-row">
            <span>{item.label}</span>
            <span className="detect-confidence">{Math.round(item.conf * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${item.conf * 100}%` }}></div>
          </div>
        </div>
      ))}
      {liveDetections.length === 0 && (
        <p className="detect-empty">Waiting for detections...</p>
      )}
    </div>
  );
};

export default DetectionPanel;
