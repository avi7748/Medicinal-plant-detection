import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../styles/InfoPanel.css";

const InfoPanel = () => {
  const [activePlant, setActivePlant] = useState(null);
  const [lastPlant, setLastPlant] = useState(null);
  const [history, setHistory] = useState([]);
  const [coords, setCoords] = useState({ lat: "0 ", lng: "0" });

  const [info, setInfo] = useState({
    name: "Waiting...",
    scientific_name: "Waiting...",
    description: "Point your camera at a medicinal plant.",
    usage_info: "---"
  });

  const socketRef = useRef(null);

  useEffect(() => {
      const socket = io("http://localhost:5000");
      socketRef.current = socket;

      const updatePlantState = (plantName, time) => {
        if (!plantName) return;
        // Don't update if it's the same plant
        if (plantName === activePlant) return;
        setActivePlant(plantName);
        setLastPlant(plantName);

        setHistory((prev) => {
          if (prev[0]?.name === plantName)
            return prev;
          return [
            {
              name: plantName,
              time: time || new Date().toLocaleTimeString()
            },
            ...prev
          ].slice(0, 6);
        });
      };

      const handleLocation = (data) => {

    // No medicinal plant detected
    if (!data.detected) {
      // Keep showing the last detected plant.
      // Do not clear the information panel.
      return;
    }

    if (!data?.name) return;

    updatePlantState(data.name, data.time);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          setCoords({
            lat: lat.toFixed(4),
            lng: lng.toFixed(4)
          });

          socket.emit("save_plant_location", {
            name: data.name,
            conf: data.conf,
            lat,
            lng
          });
        },
        (err) => console.log("GPS Error:", err),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        }
      );
    }
  };

    const handleDetectionData = (data) => {
      if (!data?.predictions || data.predictions.length === 0) {
        // Don't update anything if no plant is detected
        return;
      }

      const topPrediction = data.predictions[0];
      const plantName = topPrediction.label || topPrediction.name;

      if (!plantName) return;

      updatePlantState(plantName);
    };

    socket.on("request_location", handleLocation);
    socket.on("detection_data", handleDetectionData);

    return () => {
      socket.off("request_location", handleLocation);
      socket.off("detection_data", handleDetectionData);
      socket.disconnect();
    };
  }, []);

useEffect(() => {
    if (
        !activePlant ||
        activePlant === "No Medicinal Plant Detected"
    ) return;

    const fetchData = () => {
      fetch(`http://localhost:5000/api/plantinfo/${encodeURIComponent(activePlant)}`)
        .then((res) => {
          if (!res.ok) throw new Error("API failed");
          return res.json();
        })
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setInfo({
              name: data.name || "Not found",
              scientific_name: data.scientific_name || "Not found",
              description: data.description || "No description",
              usage_info: data.usage_info || "---"
            });
          }
        })
        .catch((err) => {
          console.error("PlantInfo fetch failed:", err);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [activePlant]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${coords.lat}, ${coords.lng}`);
    alert("Coordinates copied!");
  };

  const usageList = info.usage_info && info.usage_info !== "---"
    ? info.usage_info
        .split(".")
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    : [];

  return (
    <div className="info-container">
      <div className="info-box highlight">
        <h2 className="info-title">Species</h2>
        <p className="info-text name-header">
          {info.name || "Waiting for detection..."}
        </p>
      </div>

      <div className="info-box">
        <h2 className="info-title">Scientific Name</h2>
        <p className="info-text italic">{info.scientific_name}</p>
      </div>

      <div className="info-box scroll-box">
        <h2 className="info-title">Description</h2>
        <p className="info-text">{info.description}</p>
      </div>

      <div className="info-box">
        <h2 className="info-title">Medicinal Usage</h2>
        {usageList.length > 0 ? (
          <ul className="usage-list">
            {usageList.map((item, index) => (
              <li key={index} className="info-text">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="info-text">---</p>
        )}
      </div>

      <div className="info-box">
        <h2 className="info-title">Live Coordinates</h2>
        <div className="coords-row">
          <p className="info-text">
            {coords.lat}, {coords.lng}
          </p>
          <button className="copy-btn" onClick={handleCopy}>
            Copy
          </button>
        </div>
      </div>

      <div className="info-box">
        <h2 className="info-title">Recent History</h2>
        <ul className="info-text history-list">
          {history.map((h, i) => (
            <li key={i}>
              <strong>{h.name}</strong> at {h.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPanel;
