import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-border-top"></div>
      <div className="navbar-border-bottom"></div>
        
      <div className="nav-links">
        <Link 
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/plants"
          className={location.pathname === "/plants" ? "active" : ""}
        >
          All Plants
        </Link>

        <Link
          to="/history"
          className={location.pathname === "/history" ? "active" : ""}
        >
          History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;