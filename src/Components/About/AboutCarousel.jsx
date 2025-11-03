import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "./AboutCarousel.scss";

const images = [

 "/SITE INTERNET/PHOTOS/SHOOTINGS/EMMA1_07-01-2025.webp",
 "/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KID_14102023.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KIN1_09022025.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/LE_KIN2_09022025.webp",
 "/SITE INTERNET/PHOTOS/SHOOTINGS/LUCIE_03012024.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/OTAMA1_27102023.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/PAGE 1 MAGAZINE WOMAN 2.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/PAGE 2 MAGAZINE WOMAN 2.webp",
  "/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO1 16052025.webp",
  "/SITE INTERNET/PHOTOS/CONCERTS/AUPINARD_26-10-2024.webp",
"/SITE INTERNET/PHOTOS/CONCERTS/BUSHI_14-11-2022.webp",
"/SITE INTERNET/PHOTOS/CONCERTS/JÄDE1_29-11-2024.webp",
 "/SITE INTERNET/PHOTOS/CONCERTS/LUIDJI_X_TUERIE1_13-08-2024.webp",
"/SITE INTERNET/PHOTOS/CONCERTS/LUIDJI_X_TUERIE2_13-08-2024.webp",
"/SITE INTERNET/PHOTOS/CONCERTS/MOJIXSBOY1_27-04-2024.webp",
"/SITE INTERNET/PHOTOS/CONCERTS/MORPHÉE1_26-10-2024.webp",
 "/SITE INTERNET/PHOTOS/CONCERTS/SOFIANE_PAMART_20_01_2023.webp",
"/SITE INTERNET/PHOTOS/CONCERTS/STEPHAN_EISHER_16_11_2024.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS1 17012025.webp",
 "/SITE INTERNET/PHOTOS/SHOOTINGS/BIMBOYAS2 17012025.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO4 16052025.webp",
"/SITE INTERNET/PHOTOS/SHOOTINGS/ROW STUDIO8 16052025.webp",
"/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_1.webp",
"/SITE INTERNET/PHOTOS/COVERS/CARAMBARZ_TAPE_26062024/CARAMBARZ_TAPE_2.webp",
 "/SITE INTERNET/PHOTOS/COVERS/DROLENTLELIN_27102023/DROLENTLELIN_2.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/11zon_GARE_CROISETTE_X_LA_HAINE1_29_01_2025.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME1 30-05-2025.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/COURSE AVEC LE CAVIGAL NICE CYCLISME4 30-05-2025.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE2_29_01_2025.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/GARE_CROISETTE_X_LA_HAINE4_29_01_2025.webp",
 "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS1_08112024.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/HÔTEL_MARTINEZ_THE_MYSTERIES_OF_THE_DEPTHS3_08112024.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/KICKÇA1_17032024.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/KICKÇA3_17032024.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/MARIAGE1 26042025.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/MARIAGE3 26042025.webp", 
 "/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL1_16112024.webp",
"/SITE INTERNET/PHOTOS/ÉVÈNEMENTS/OVNI_FESTIVAL4_16112024.webp",
];

const AboutCarousel = () => {
  const [selectedSrc, setSelectedSrc] = useState(null);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  useEffect(() => {
    document.body.style.overflow = selectedSrc ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedSrc]);

  useEffect(() => {
    if (!selectedSrc) return;
    const onKey = (e) => e.key === "Escape" && setSelectedSrc(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedSrc]);

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Autoplay, EffectCoverflow, Keyboard]}
        effect="coverflow"
        keyboard={{ enabled: true }}
        grabCursor
        centeredSlides
        loop
        slidesPerView={1.15}
        breakpoints={{ 560: { slidesPerView: 2 }, 900: { slidesPerView: 3 } }}
        autoplay={reduceMotion ? false : { delay: 3000, disableOnInteraction: false }}
        navigation
        aria-label="Aperçu des projets"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src + i}>
            <button
              className="slide-btn"
              onClick={() => setSelectedSrc(src)}
              aria-label={`Ouvrir l’image ${i + 1}`}
            >
              <img
                src={src}
                className="carousel-image"
                alt={`Photo ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedSrc && (
        <div className="ac-lightbox" onClick={() => setSelectedSrc(null)} role="dialog" aria-modal="true">
          <div className="ac-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="ac-close" onClick={() => setSelectedSrc(null)} aria-label="Fermer">×</button>
            <img src={selectedSrc} alt="Aperçu grand format" className="ac-image" loading="eager" decoding="async" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutCarousel;
