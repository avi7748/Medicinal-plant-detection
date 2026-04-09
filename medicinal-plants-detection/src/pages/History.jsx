import { useState } from "react";
import "../styles/History.css";

const History = () => {
  const [history, setHistory] = useState([]);

  // 🔥 FETCH FROM BACKEND
  const fetchHistory = () => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          speciesId: item.species_id,
          name: item.scientific_name,
          confidence: item.confidence,
          timestamp: item.detected_at,
          lat: item.latitude,
          long: item.longitude,
        }));

        setHistory(formatted);
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Detection History</h2>
      <div className="border-bottom"></div>
      <button className="fetch-btn" onClick={fetchHistory}>
        Get Records
      </button>

      <div className="table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Species ID</th>
              <th>Name</th>
              <th>Confidence (%)</th>
              <th>Timestamp</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.speciesId}</td>
                <td>{item.name}</td>
                <td className="num">{item.confidence}</td>
                <td>{item.timestamp}</td>
                <td>{item.lat}</td>
                <td>{item.long}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <p className="no-data">No history available</p>
        )}
      </div>
    </div>
  );
};

export default History;