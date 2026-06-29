import { useState, useEffect } from "react";
import "../styles/Plants.css";

const Plants = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState(""); // 🔥 added

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/species")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item) => ({
          species: item.name,
          scientific: item.scientific_name,
          description: item.description,
          usage: item.usage_info,
          image: item.image_url
        }));

        setPlants(formatted);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  // 🔥 BODY SCROLL LOCK
  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [expandedIndex]);

  // 🔥 FILTER LOGIC (added)
  const filteredPlants = plants.filter((plant) =>
    plant.species.toLowerCase().includes(search.toLowerCase()) ||
    plant.scientific.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="plants-container">
      <div>
        <h2 className="plants-title">MEDICINAL PLANTS ENCYCLOPEDIA</h2>
      </div>

      {/* 🔥 SEARCH INPUT (added) */}
      <input
        type="text"
        placeholder="Search plants..."
        className="plants-search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {expandedIndex !== null && (
        <div
          className="modal-backdrop"
          onClick={() => setExpandedIndex(null)}
        ></div>
      )}

      <div className="plants-grid">
        {filteredPlants.map((plant, i) => {
          const isExpanded = expandedIndex === i;

          return (
            <div
              key={i}
              className={`plant-card ${isExpanded ? "expanded" : ""}`}
            >
              {/* IMAGE */}
              
              <div className="image-wrapper">
                <img
                  src={plant.image}
                  alt={plant.species}
                  className="plant-image"
                />

                <div className="image-overlay"></div>

                <h3 className="image-title">{plant.species}</h3>
              </div>

              {/* CONTENT */}
              <div className="plant-content">
                <p className="plant-scientific">
                  {plant.scientific}
                </p>

                <div className="plant-section">
                  <h4>Description</h4>
                  <p className={isExpanded ? "" : "truncate"}>
                    {plant.description}

                  </p>
                </div>

                <div className="plant-section">
                  <h4>Medicinal Usage</h4>
                  <ul className={`usage-list ${isExpanded ? "" : "truncate"}`}>
                    {plant.usage
                      ? plant.usage.split(". ").map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        ))
                      : <li>No usage info</li>}
                  </ul>
                </div>
                {/* {console.log(plants)}; */}

                <button
                  className="view-btn"
                  onClick={() => toggleExpand(i)}
                >
                  {isExpanded ? "View Less ▲" : "View More ▼"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 NO RESULT (added) */}
      {filteredPlants.length === 0 && (
        <p className="no-result">No plants found</p>
      )}
    </div>
  );
};

export default Plants;
