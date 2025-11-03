import React, { useState, useCallback, useEffect } from "react";
import "./gallery.scss";
import { buildSrcSet, defaultSrc, onImgError } from "../../utils/img.js";

const allImages = [
  // CONCERTS
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
  { src: "/SITE INTERNET/PHOTOS/CONCERTS/STEPHAN_EISHER_16_11_2024.webp", title: "STEPHAN EISHER — 16/11/2024" },

  // SHOOTINGS
  { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS1 17012025.webp", title: "BIMBOYAS — 17/01/2025" },
  { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS2 17012025.webp", title: "BIMBOYAS — 17/01/2025" },
  { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS3 17012025.webp", title: "BIMBOYAS — 17/01/2025" },
  { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/EMMA1_07012025-600.webp", title: "EMMA — 07/01/2025" },
  { src: "/SITE INTERNET/PHOTOS/SHOOTINGS/EMMA2_07012025-600.webp", title: "EMMA — 07/01/2025" },
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

  // COVERS
  { src: "/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_1.webp", title: "CARAMBARZ — 26/06/2024" },
  { src: "/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_2.webp", title: "CARAMBARZ — 26/06/2024" },
  { src: "/SITE INTERNET/PHOTOS/COVERS/DROLENTLELIN_27102023/DROLENTLELIN_1.webp", title: "DROLENTLELIN — 27/10/2023" },
  { src: "/SITE INTERNET/PHOTOS/COVERS/DROLENTLELIN_27102023/DROLENTLELIN_2.webp", title: "DROLENTLELIN — 27/10/2023" },

  // ÉVÈNEMENTS
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
];


const GalleryAll = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const images = allImages;

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(() => {
    if (selectedIndex == null) return;
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);
  const next = useCallback(() => {
    if (selectedIndex == null) return;
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [selectedIndex, images.length]);

  // lock scroll quand lightbox ouverte
  useEffect(() => {
    if (selectedIndex != null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [selectedIndex]);

  // clavier: ESC / flèches
  useEffect(() => {
    if (selectedIndex == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, close, prev, next]);

  // swipe mobile
  const [touchStartX, setTouchStartX] = useState(null);
  const onTouchStart = (e) => setTouchStartX(e.changedTouches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
    setTouchStartX(null);
  };

  // précharger voisines de la lightbox (version "default")
  useEffect(() => {
    if (selectedIndex == null) return;
    const preload = (idx) => {
      const it = images[(idx + images.length) % images.length];
      if (!it) return;
      const img = new Image();
      img.src = defaultSrc(it.src);
    };
    preload(selectedIndex + 1);
    preload(selectedIndex - 1);
  }, [selectedIndex, images]);

  return (
    <div className="gallery-wrapper">
      <div className="gallery-header">
        <div
          className="overlay"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgb(10,10,10) 100%), url("/SITE INTERNET/PHOTOS/BANNIÈRES/BANNIÈRE_GALLERIE.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <h2 className="gallery-title">MON UNIVERS</h2>
      </div>

      <div className="gallery-container">
        <div className="image-grid">
          {images.map((img, index) => (
            <div key={index} className="image-item">
              <img
  src={defaultSrc(img.src)}
  srcSet={buildSrcSet(img.src)}
  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 600px"
  alt={img.title || `Photo ${index}`}
  className="gallery-image"
  loading="lazy"
  decoding="async"
  width="600"
  height="400"
  onClick={() => setSelectedIndex(index)}
  onError={(e) => onImgError(e, img.src)}
/>

              <div className="image-overlay">
                <span className="image-text">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default GalleryAll;