import "./styles/global.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import History from "./pages/History";
import MedDe from "./pages/MedicinalPlants.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <div className="logo-container"> */}
        {/* <img src="src/assets/tabLogoT.png" alt="logo" className="logo-img" /> */}

        <h1 className="app-title">
          {"PUSHPAKSANJEEVANI".split("").map((char, index) => (
            <span key={index} className="char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      {/* </div> */}
        

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/history" element={<History />} />
          {/* <Route path="/meddee" element={<MedDe />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;