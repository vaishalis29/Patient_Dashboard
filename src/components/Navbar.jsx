import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Jarurat Care</h1>
      <div className="links">
        <a href="#">Home</a>
        <a href="#">Patients</a>
        <a href="#">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
