import React, { useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.scss";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { name: "Concerts", image: "/SITE INTERNET/PHOTOS/CONCERTS/LUIDJI_X_TUERIE1_13-08-2024.webp", path: "/galerie/concerts" },
  { name: "Covers", image: "/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_1.webp", path: "/galerie/covers" },
  { name: "Événements", image: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL5_16112024.webp", path: "/galerie/evenements" },
  { name: "Shootings", image: "/SITE INTERNET/PHOTOS/SHOOTINGS/PAGE 1 MAGAZINE WOMAN 2.webp", path: "/galerie/shootings" }
];

const Projects = () => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRef = useRef(null);

  const handleNav = (to) => navigate(to);

  const preload = (src) => {
    const img = new Image();
    img.src = src;
  };

  const scrollByAmount = (dir = 1) => {
    if (!trackRef.current) return;
    const card = cardsRef.current?.[0];
    const step = card ? card.offsetWidth + 16 : 420;
    trackRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // clavier : flèches pour scroller + Enter/Space pour ouvrir
  const onKeyCard = (e, path) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNav(path);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 1025px)",
        },
        (ctx) => {
          const { reduce, desktop } = ctx.conditions;

          // Title reveal
          gsap.fromTo(
            titleRef.current,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top 75%",
              },
            }
          );

          // Cards stagger
          gsap.fromTo(
            cardsRef.current,
            { autoAlpha: 0, y: 16, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              delay: 0.1,
              scrollTrigger: {
                trigger: trackRef.current,
                start: "top 85%",
              },
            }
          );

          // Parallax doux du titre (desktop only)
          if (desktop && !reduce) {
            gsap.to(titleRef.current, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        }
      );

      // barre de progression horizontale
      const updateProgress = () => {
        const el = trackRef.current;
        const bar = progressRef.current;
        if (!el || !bar) return;
        const max = el.scrollWidth - el.clientWidth;
        const ratio = max > 0 ? el.scrollLeft / max : 0;
        bar.style.setProperty("--progress", `${Math.min(Math.max(ratio, 0), 1)}`);
      };

      trackRef.current?.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="projects-section"
      id="Projets"
      ref={rootRef}
      aria-labelledby="projects-title"
    >
      {/* Glow décoratif et masques d’edge fade */}
      <div className="projects-glow" aria-hidden="true" />
      <div className="edge-fade left" aria-hidden="true" />
      <div className="edge-fade right" aria-hidden="true" />

      {/* Titre */}
      <h2 className="projects-title" id="projects-title" ref={titleRef}>
        Mes <span>Projets</span>
      </h2>

      {/* Flèches desktop */}
      <button
        className="carousel-arrow arrow-left"
        aria-label="Défiler vers la gauche"
        onClick={() => scrollByAmount(-1)}
      >
        &#10094;
      </button>
      <button
        className="carousel-arrow arrow-right"
        aria-label="Défiler vers la droite"
        onClick={() => scrollByAmount(1)}
      >
        &#10095;
      </button>

      {/* Track horizontal */}
      <div
        className="categories-container"
        ref={trackRef}
        role="list"
        aria-label="Catégories de projets"
      >
        {categories.map((c, i) => (
          <article
            role="listitem"
            key={c.name}
            className="category-card"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <button
              className="card-link"
              onClick={() => handleNav(c.path)}
              onMouseEnter={() => preload(c.image)}
              onFocus={() => preload(c.image)}
              onKeyDown={(e) => onKeyCard(e, c.path)}
              aria-label={`Ouvrir la galerie ${c.name}`}
            >
              {/* <picture> optionnel si tu ajoutes des .webp */}
              {/* <source type="image/webp" srcSet={c.image.replace(/\.(jpg|png|jpeg)$/i, ".webp")} /> */}
              <img
                src={c.image}
                alt={c.name}
                className="category-image"
                loading="lazy"
                decoding="async"
              />
              <div className="category-overlay">
                <span className="category-name">{c.name}</span>
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="scroll-progress" ref={progressRef} aria-hidden="true">
        <div className="bar" />
      </div>
    </section>
  );
};

export default Projects;

