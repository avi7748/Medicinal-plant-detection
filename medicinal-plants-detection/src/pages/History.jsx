import { useState } from "react";
import "../styles/History.css";

const History = () => {

  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    minConfidence: "",
    maxConfidence: "",
    fromDate: "",
    toDate: "",
    sortBy: "latest",
    radius: ""
  });

  // ==========================
  // Fetch Detection History
  // ==========================

  const fetchHistory = () => {

    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {

        const formatted = data.map((item) => ({
          id: item.id,
          speciesId: item.species_id,
          name: item.name,
          scientificName: item.scientific_name,
          confidence: item.confidence,
          timestamp: item.detected_at,
          lat: item.latitude,
          long: item.longitude,
        }));

        setHistory(formatted);

      })
      .catch((err) => console.error(err));

  };

  // ==========================
  // Search + Filters
  // ==========================

  const filteredHistory = [...history]

    // Search
    .filter((item) => {

      const search = searchTerm.toLowerCase().trim();

      if (!search) return true;

      return (

        item.speciesId.toString().includes(search) ||

        item.name.toLowerCase().includes(search) ||

        item.scientificName.toLowerCase().includes(search)

      );

    })

    // Confidence

    .filter((item) => {

      const min =
        filters.minConfidence === ""
          ? 0
          : Number(filters.minConfidence);

      const max =
        filters.maxConfidence === ""
          ? 100
          : Number(filters.maxConfidence);

      return (
        item.confidence >= min &&
        item.confidence <= max
      );

    })

    // Date

    .filter((item) => {

      if (!filters.fromDate && !filters.toDate)
        return true;

      const recordDate = new Date(item.timestamp);

      if (filters.fromDate) {

        const from = new Date(filters.fromDate);

        if (recordDate < from)
          return false;

      }

      if (filters.toDate) {

        const to = new Date(filters.toDate);

        to.setHours(23, 59, 59, 999);

        if (recordDate > to)
          return false;

      }

      return true;

    })

    // Sort

    .sort((a, b) => {

      switch (filters.sortBy) {

        case "oldest":
          return new Date(a.timestamp) - new Date(b.timestamp);

        case "high":
          return b.confidence - a.confidence;

        case "low":
          return a.confidence - b.confidence;

        default:
          return new Date(b.timestamp) - new Date(a.timestamp);

      }

    });

  return (

    <div className="history-container">

      <h2 className="history-title">
        Detection History
      </h2>

      <div className="border-bottom"></div>

      <button
        className="fetch-btn"
        onClick={fetchHistory}
      >
        Get Records
      </button>

      {/* Search */}

      <div className="search-filter-container">

        <input
          type="text"
          className="search-input"
          placeholder="Search by Plant Name or Species ID..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <button
          type="button"
          className="filter-btn"
          onClick={() =>
            setShowFilter(!showFilter)
          }
        >
          Filter
        </button>

      </div>

      {/* Filter Popup */}

      {showFilter && (

        <div className="filter-overlay">

          <button
            type="button"
            className="close-filter"
            onClick={() => setShowFilter(false)}
          >
            ✕
          </button>

          <h3>Filter Records</h3>

          <label>Confidence Score</label>

          <div className="filter-row">

            <input
              type="number"
              min="0"
              max="100"
              placeholder="Minimum"
              value={filters.minConfidence}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minConfidence: e.target.value,
                })
              }
            />

            <input
              type="number"
              min="0"
              max="100"
              placeholder="Maximum"
              value={filters.maxConfidence}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxConfidence: e.target.value,
                })
              }
            />

          </div>

          <label>Detection Date</label>

          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                fromDate: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={filters.toDate}
            onChange={(e) =>
              setFilters({
                ...filters,
                toDate: e.target.value,
              })
            }
          />
                    <label>Sort By</label>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value,
              })
            }
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="high">Highest Confidence</option>
            <option value="low">Lowest Confidence</option>
          </select>

          <label>Nearby Radius</label>

          <select
            value={filters.radius}
            onChange={(e) =>
              setFilters({
                ...filters,
                radius: e.target.value,
              })
            }
          >
            <option value="">All</option>
            <option value="100">100 m</option>
            <option value="200">200 m</option>
            <option value="500">500 m</option>
            <option value="1000">1 km</option>
            <option value="2000">2 km</option>
            <option value="5000">5 km</option>
            <option value="10000">10 km</option>
          </select>

          <div className="filter-actions">

            <button
              type="button"
              onClick={() => {
                setFilters({
                  minConfidence: "",
                  maxConfidence: "",
                  fromDate: "",
                  toDate: "",
                  sortBy: "latest",
                  radius: ""
                });

                setShowFilter(false);
              }}
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => {

                if (
                  filters.minConfidence !== "" &&
                  filters.maxConfidence !== "" &&
                  Number(filters.minConfidence) >
                    Number(filters.maxConfidence)
                ) {
                  alert(
                    "Minimum confidence cannot be greater than maximum confidence."
                  );
                  return;
                }

                setShowFilter(false);
              }}
            >
              Apply
            </button>

          </div>

        </div>

      )}

      <div className="history-info">
        Showing <strong>{filteredHistory.length}</strong> of{" "}
        <strong>{history.length}</strong> records
      </div>

      <div className="table-wrapper">

        <table className="history-table">

          <thead>

            <tr>
              <th>Sr No</th>
              <th>ID</th>
              <th>Name</th>
              <th>Scientific Name</th>
              <th>Confidence (%)</th>
              <th>Timestamp</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>

          </thead>

          <tbody>

            {filteredHistory.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>

                <td>{item.speciesId}</td>

                <td>{item.name}</td>

                <td>{item.scientificName}</td>

                <td>{item.confidence}</td>

                <td>{item.timestamp}</td>

                <td>{item.lat}</td>

                <td>{item.long}</td>

              </tr>

            ))}

          </tbody>

        </table>

        {history.length === 0 ? (

          <p className="no-data">
            No history available
          </p>

        ) : filteredHistory.length === 0 ? (

          <p className="no-data">
            No matching records found
          </p>

        ) : null}

      </div>

    </div>

  );

};

export default History;