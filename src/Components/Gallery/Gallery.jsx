import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buildSrcSet, defaultSrc, onImgError } from "../../utils/img.js";
import "./gallery.scss";

const galleryData = {
  concerts: [
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/AUPINARD_26-10-2024.webp", title: "AUPINARD — 26/10/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/BUSHI_14-11-2022-600.webp", title: "BUSHI — 14/11/2022" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/JÄDE1_29-11-2024.webp", title: "JÄDE — 29/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/JÄDE2_29-11-2024.webp", title: "JÄDE — 29/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/LUIDJI_X_TUERIE1_13-08-2024.webp", title: "LUIDJI x TUERIE — 13/08/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/LUIDJI_X_TUERIE2_13-08-2024.webp", title: "LUIDJI x TUERIE — 13/08/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/LUIDJI_X_TUERIE3_13-08-2024.webp", title: "LUIDJI x TUERIE — 13/08/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/MOJIXSBOY1_27-04-2024.webp", title: "MOJIXSBOY — 27/04/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/MOJIXSBOY2_27_04_2024.webp", title: "MOJIXSBOY — 27/04/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/MORPHÉE1_26-10-2024.webp", title: "MORPHÉE — 26/10/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/MORPHÉE2_26_10_2024.webp", title: "MORPHÉE — 26/10/2024" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/SOFIANE_PAMART_20_01_2023.webp", title: "SOFIANE PAMART — 20/01/2023" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/SOFIANE_PAMART_20012023.jpg", title: "SOFIANE PAMART — 20/01/2023" },
    { src: "/SITE INTERNET/PHOTOS/CONCERTS/STEPHAN_EISHER_16_11_2024.webp", title: "STEPHAN EISHER — 16/11/2024" },
  ],

  covers: [
    { src: "/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_1.webp", title: "CARAMBARZ — 26/06/2024" },
    { src: "/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_2.webp", title: "CARAMBARZ — 26/06/2024" },
    { src: "/SITE INTERNET/PHOTOS/COVERS/DROLENTLELIN_27102023/DROLENTLELIN_1.webp", title: "DROLENTLELIN — 27/10/2023" },
    { src: "/SITE INTERNET/PHOTOS/COVERS/DROLENTLELIN_27102023/DROLENTLELIN_2.webp", title: "DROLENTLELIN — 27/10/2023" },
  ],

  evenements: [
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/11zon_GARE_CROISETTE_X_LA_HAINE1_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/11zon_GARE_CROISETTE_X_LA_HAINE6_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME1 30-05-2025.webp", title: "CAVIGAL NICE CYCLISME — 30/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME2 30-05-2025.webp", title: "CAVIGAL NICE CYCLISME — 30/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME3 30-05-2025.webp", title: "CAVIGAL NICE CYCLISME — 30/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME4 30-05-2025.webp", title: "CAVIGAL NICE CYCLISME — 30/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME5 30-05-2025.webp", title: "CAVIGAL NICE CYCLISME — 30/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE2_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE3_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE4_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE5_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE7_29_01_2025.webp", title: "GARE CROISETTE x LA HAINE — 29/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS1_08112024.webp", title: "HÔTEL MARTINEZ — 08/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS2_08112024.webp", title: "HÔTEL MARTINEZ — 08/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS3_08112024.webp", title: "HÔTEL MARTINEZ — 08/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS4_08112024.webp", title: "HÔTEL MARTINEZ — 08/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS5_08112024.webp", title: "HÔTEL MARTINEZ — 08/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS6_08112024.webp", title: "HÔTEL MARTINEZ — 08/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/KICKÇA1_17032024.webp", title: "KICKÇA — 17/03/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/KICKÇA2_17032024.webp", title: "KICKÇA — 17/03/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/KICKÇA3_17032024.webp", title: "KICKÇA — 17/03/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/KICKÇA4_17032024.webp", title: "KICKÇA — 17/03/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/MARIAGE1 26042025.webp", title: "MARIAGE — 26/04/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/MARIAGE2 26042025.webp", title: "MARIAGE — 26/04/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/MARIAGE3 26042025.webp", title: "MARIAGE — 26/04/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/MARIAGE4 26042025.webp", title: "MARIAGE — 26/04/2025" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL1_16112024.webp", title: "OVNI FESTIVAL — 16/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL2_16112024.webp", title: "OVNI FESTIVAL — 16/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL3_16112024.webp", title: "OVNI FESTIVAL — 16/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL4_16112024.webp", title: "OVNI FESTIVAL — 16/11/2024" },
    { src: "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL5_16112024.webp", title: "OVNI FESTIVAL — 16/11/2024" },
  ],

  shootings: [
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS1 17012025.webp", title: "BIMBOYAS — 17/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS2 17012025.webp", title: "BIMBOYAS — 17/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS3 17012025.webp", title: "BIMBOYAS — 17/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/EMMA1_07-01-2025.webp", title: "EMMA — 07/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/EMMA2_07012025.webp", title: "EMMA — 07/01/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KID_14102023.webp", title: "LE KID — 14/10/2023" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KIN1_09022025.webp", title: "LE KIIN — 09/02/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KIN2_09022025.webp", title: "LE KIIN — 09/02/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KIN3_09022025.webp", title: "LE KIIN — 09/02/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/LUCIE_03012024.webp", title: "LUCIE — 03/01/2024" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/OTAMA1_27102023.webp", title: "OTAMA — 27/10/2023" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/OTAMA2_27102023.webp", title: "OTAMA — 27/10/2023" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/PAGE 1 MAGAZINE WOMAN 2.webp", title: "MAGAZINE WOMAN — 28/10/2024" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/PAGE 2 MAGAZINE WOMAN 2.webp", title: "MAGAZINE WOMAN — 28/10/2024" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/PAGE 3 MAGAZINE WOMAN 2.webp", title: "MAGAZINE WOMAN — 28/10/2024" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO1 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO2 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO3 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO4 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO5 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO6 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO7 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
    { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO8 16052025.webp", title: "ROW STUDIO — 16/05/2025" },
  ],
};

// les bannières//
const categoryBackgrounds = {
  concerts: "/SITE INTERNET/PHOTOS/BANNIÈRES/Bannière_Concerts_1.webp",
  covers: "/SITE INTERNET/PHOTOS/BANNIÈRES/BANNIÈRE_COVERS.webp",
  evenements: "/SITE INTERNET/PHOTOS/BANNIÈRES/Bannière_Événements.webp",
  shootings: "/SITE INTERNET/PHOTOS/BANNIÈRES/Bannière_Shootings.webp",
};

const labelMap = {
  concerts: "Concerts",
  covers: "Covers",
  evenements: "Événements",
  shootings: "Shootings",
};

const Gallery = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const images = useMemo(() => galleryData[category] || [], [category]);
  const backgroundImage = categoryBackgrounds[category] || images[0]?.src || "";

  const [selectedIndex, setSelectedIndex] = useState(null);
  const startXRef = useRef(null);

  useEffect(() => {
    // lock/unlock scroll du body quand la lightbox est ouverte
    if (selectedIndex != null) {
      document.body.classList.add("body-lock");
    } else {
      document.body.classList.remove("body-lock");
    }
    return () => document.body.classList.remove("body-lock");
  }, [selectedIndex]);

  // précharger voisine (on précharge la version "default" optimisée)
  useEffect(() => {
    if (selectedIndex == null) return;
    const preload = (idx) => {
      const i = images[idx];
      if (!i) return;
      const img = new Image();
      img.src = defaultSrc(i.src);
    };
    preload(selectedIndex + 1);
    preload(selectedIndex - 1);
  }, [selectedIndex, images]);

  // clavier (Esc, ←, →)
  useEffect(() => {
    if (selectedIndex == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") setSelectedIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1));
      if (e.key === "ArrowLeft") setSelectedIndex((i) => Math.max(0, (i ?? 0) - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, images.length]);

  // swipe mobile
  const onTouchStart = (e) => (startXRef.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (startXRef.current == null) return;
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(dx) > 40) {
      setSelectedIndex((i) => {
        if (i == null) return i;
        return dx < 0 ? Math.min(images.length - 1, i + 1) : Math.max(0, i - 1);
      });
    }
    startXRef.current = null;
  };

  const openAt = (i) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);
  const next = () => setSelectedIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1));
  const prev = () => setSelectedIndex((i) => Math.max(0, (i ?? 0) - 1));

  return (
    <div className="gallery-wrapper">
      {/* HEADER */}
      <header className="gallery-header">
        <div
          className="overlay"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(10,10,10,0.98)), url("${backgroundImage}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <nav className="breadcrumb" aria-label="Fil d’ariane">
          <button className="crumb" onClick={() => navigate(-1)}>← Retour</button>
          <span className="sep">/</span>
          <span className="current">{labelMap[category] || "Galerie"}</span>
        </nav>
        <h2 className="gallery-title">{(labelMap[category] || "GALERIE").toUpperCase()}</h2>
      </header>

      {/* GRID */}
      <main className="gallery-container">
        <div className="image-grid" role="list" aria-label={`Images ${labelMap[category] || ""}`}>
          {images.map((image, index) => (
            <figure
              role="listitem"
              key={image.src + index}
              className="image-item"
            >
              <button
                className="image-button"
                onClick={() => openAt(index)}
                aria-label={`Ouvrir l’image : ${image.title || "Sans titre"}`}
              >
               
                <img
  src={defaultSrc(image.src)}
  srcSet={buildSrcSet(image.src)}
  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 600px"
  alt={image.title || "Image de la galerie"}
  className="gallery-image"
  loading="lazy"
  decoding="async"
  width="600"
  height="400"
  onError={(e) => onImgError(e, image.src)}
/>

                <div className="image-skeleton" aria-hidden="true" />
                {image.title?.trim() && (
                  <figcaption className="image-overlay">
                    <span className="image-text">{image.title}</span>
                  </figcaption>
                )}
              </button>
            </figure>
          ))}
        </div>
      </main>

      {/* LIGHTBOX */}
      {selectedIndex != null && images[selectedIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={images[selectedIndex].title || "Agrandissement"}
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Fermer">×</button>
            <button className="lightbox-prev" onClick={prev} aria-label="Précédent">‹</button>
            <button className="lightbox-next" onClick={next} aria-label="Suivant">›</button>

            {/* Lightbox avec les variantes (le navigateur prendra -2000.webp si dispo) */}
            <img
  src={defaultSrc(images[selectedIndex].src)}
  srcSet={buildSrcSet(images[selectedIndex].src)}
  sizes="100vw"
  alt={images[selectedIndex].title || "Image en grand"}
  className="lightbox-image"
  loading="eager"
  decoding="async"
  onError={(e) => onImgError(e, images[selectedIndex].src)}
/>

            {images[selectedIndex].title?.trim() && (
              <p className="lightbox-caption">{images[selectedIndex].title}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;