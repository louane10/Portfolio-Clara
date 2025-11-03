import React, { useEffect, useRef } from "react";
import "./hero.scss";

const Hero = () => {
  const rootRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        // parallax léger (CPU-friendly) : translateY en %
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
        }
        raf = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="Accueil" className="hero" ref={rootRef} aria-labelledby="hero-title">
      {/* couche image + glow */}
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
      </div>
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-content">
        <h1 id="hero-title" className="title">
          Clara Durando<span className="dot">.</span>
          <br />
          <span className="role">Photographe & vidéaste</span>
        </h1>
        <p className="subtitle">
          Photographe et vidéaste indépendante - Côte d’Azur
        </p>
      </div>

      <a href="#APropos" className="scroll-down" aria-label="Aller à la section À propos">
      </a>
    </section>
  );
};

export default Hero;
