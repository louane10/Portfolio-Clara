import "./contact.scss";
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "lkg4cla@gmail.com"; 
const SUBJECT = "Projet photo/vidéo";
const BODY_PLACEHOLDER = "Bonjour Clara,%0D%0A%0D%0AJe souhaite vous parler d’un projet…";

const openGmail = () => {
  const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    CONTACT_EMAIL
  )}&su=${encodeURIComponent(SUBJECT)}&body=${BODY_PLACEHOLDER}`;
  window.open(url, "_blank", "noopener");
};
const openOutlookWeb = () => {
  const url = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
    CONTACT_EMAIL
  )}&subject=${encodeURIComponent(SUBJECT)}&body=${BODY_PLACEHOLDER}`;
  window.open(url, "_blank", "noopener");
};
const copyEmail = async (setToast) => {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL);
    setToast("Adresse copiée !");
    setTimeout(() => setToast(""), 1800);
  } catch {
    prompt("Copiez l’adresse email :", CONTACT_EMAIL);
  }
};

const Contact = () => {
  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
   const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        { reduce: "(prefers-reduced-motion: reduce)" },
        ({ conditions }) => {
          const { reduce } = conditions;

          gsap.fromTo(
            leftRef.current,
            { autoAlpha: 0, x: -40 },
            {
              autoAlpha: 1,
              x: 0,
              duration: reduce ? 0 : 1,
              ease: "power3.out",
              scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
            }
          );

          gsap.fromTo(
            rightRef.current,
            { autoAlpha: 0, x: 40 },
            {
              autoAlpha: 1,
              x: 0,
              duration: reduce ? 0 : 1,
              ease: "power3.out",
              scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
            }
          );
        }
      );
      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // submit emailjs
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // honeypot anti-bot
    if (form.elements["company"].value) return;

    // validations simples côté client
    if (!form.from_name.value || !form.reply_to.value || !form.message.value) {
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // envoi basé sur les "name" des champs
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        { publicKey: PUBLIC_KEY }
      );

      // succès
      setStatus("ok");
      form.reset();
      // petit feedback toast
      setToast("Message envoyé ✓");
      setTimeout(() => {
        setToast("");
        setStatus("idle");
      }, 2500);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setToast("Échec de l’envoi. Réessaye.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <section id="Contact" className="contact" ref={rootRef} aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="formContainer">
        <div className="left" ref={leftRef}>
          <div className="video-frame">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/SITE INTERNET/VIDÉO/poster.jpg"
            >
              <source src="/SITE INTERNET/VIDÉO/VIDÉO CONCOURS ROW STUDIO & REXALINE.mov" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="right" ref={rightRef}>
          <h2 id="contact-title">Me contacter</h2>
          <p className="lede">
            Parlez-moi de votre projet — je réponds vite avec une proposition claire.
          </p>

          <form className="contact-form" onSubmit={onSubmit} ref={formRef}>
            {/* honeypot anti-bot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hp"
              aria-hidden="true"
            />

            <label className="field">
              <span>Nom & prénom*</span>
              <input type="text" name="from_name" placeholder="Lucie Dupont" required />
            </label>

            <label className="field">
              <span>Email*</span>
              <input type="email" name="reply_to" placeholder="vous@exemple.com" required />
            </label>

            <label className="field">
              <span>Dites-moi tout*</span>
              <textarea
                name="message"
                rows={7}
                placeholder="Contexte, objectifs, ambiance, lieux, dates…"
                required
              />
            </label>

            <div className="actions">
              <button
                className={`btn ${status}`}
                type="submit"
                disabled={status === "sending"}
              >
                {status === "idle" && "Envoyer"}
                {status === "sending" && "Envoi…"}
                {status === "ok" && "Envoyé ✓"}
                {status === "error" && "Vérifier les champs"}
              </button>

              <div className="alt-contacts">
                <button
                  type="button"
                  className="btn ghost"
                  onClick={openGmail}
                >
                 ou Gmail
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={openOutlookWeb}
                >
                 ou Outlook
                </button>
                <button
                  type="button"
                  className="btn text"
                  onClick={() => copyEmail(setToast)}
                >
                  Copier l’adresse
                </button>
              </div>
            </div>

            <small className="privacy">
              *Champs requis. Vos informations restent confidentielles.
            </small>
          </form>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </section>
  );
};

export default Contact;
