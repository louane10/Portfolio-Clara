import "./navbar.scss";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const items = ["Accueil", "APropos", "Projets", "Contact"];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // Ferme le menu sur mobile
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${scrolled ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="_logo">
          <a href="#Accueil" className="logo" onClick={(e) => handleSmoothScroll(e, "Accueil")}>
            LKG4CLA
          </a>
        </div>

        <div className={`links ${menuOpen ? "active" : ""}`}>
          {items.map((item) => (
            <a
              href={`#${item}`}
              key={item}
              className="link"
              onClick={(e) => handleSmoothScroll(e, item)}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="social">
          <a href="https://www.instagram.com/lkg4cla/" className="social-icon" target="_blank" rel="noreferrer">
            <img src="/instagram.png" alt="logo instagram" />
          </a>
        </div>

        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
