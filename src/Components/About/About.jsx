import "./about.scss";
import React, { useLayoutEffect, useRef, Suspense, lazy } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Lazy pour ne pas charger le carrousel si non visible / mobile
const AboutCarousel = lazy(() =>
  import("./AboutCarousel").then((m) => ({ default: m.default ?? m.AboutCarousel }))
);

const About = () => {
  const rootRef = useRef(null);
  const avatarRef = useRef(null);
  const textRef = useRef(null);
  const chipsRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respecte prefers-reduced-motion
      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 1025px)",
        },
        (ctx) => {
          const { reduce, desktop } = ctx.conditions;

          // Flottement avatar uniquement si pas de reduced motion
          if (!reduce) {
            gsap.to(avatarRef.current, {
              y: 10,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              duration: 2.2,
            });
          }

          // Entrées au scroll
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.9 },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 70%",
            },
          });

          tl.from(avatarRef.current, { autoAlpha: 0, y: 30 })
            .from(textRef.current, { autoAlpha: 0, y: 20 }, "-=0.4")
            .from(chipsRef.current?.children || [], { y: 16, autoAlpha: 0, stagger: 0.08 }, "-=0.3")
            .from(ctaRef.current, { autoAlpha: 0, y: 14 }, "-=0.2");

          // Parallax léger sur desktop
          if (desktop && !reduce) {
            gsap.to(".about-bg-glow", {
              yPercent: -10,
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

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="APropos" ref={rootRef} aria-labelledby="about-title">
      {/* décor soft */}
      <div className="about-bg-glow" aria-hidden="true" />
      <div className="about-content container">
        <div className="avatar-container">
          <img
            ref={avatarRef}
            src="/SITE INTERNET/LOGO/perso-clara-png.png"
            alt="Portrait de Clara, photographe & vidéaste"
            className="avatar"
            width="320"
            height="320"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="text-container" ref={textRef}>
          <h2 id="about-title" className="heading">
            Bienvenue, je suis <span className="accent">Clara</span>.
          </h2>

          <p className="lede">
            De la création de clips aux shootings privés, je transforme vos idées en images
— photo, vidéo, concert, événementiel et corporate.
          </p>

          {/* “proof chips” rapides */}
          <ul className="chips" ref={chipsRef} aria-label="Repères rapides">
            <li className="chip">+50 prestations</li>
            <li className="chip">Photographie • Vidéo</li>
            <li className="chip">Basée PACA, mobile</li>
          </ul>

          {/* CTA */}
          <div className="cta" ref={ctaRef}>
            <Link
          to="/univers"
          className="btn primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir mon travail
        </Link>
            <a className="btn ghost" href="#Contact" aria-describedby="contact-note">Me contacter</a>
            <span id="contact-note" className="sr-only"></span>
          </div>
        </div>
      </div>

      {/* carrousel en bas, masqué sur mobile via CSS, lazy */}
      <div className="carousel-wrapper">
        <Suspense fallback={<div className="carousel-skeleton" aria-hidden="true" />}>
          <AboutCarousel />
        </Suspense>
      </div>
    </section>
  );
};

export default About;