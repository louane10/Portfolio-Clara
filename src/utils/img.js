// src/utils/img.js

// 👉 1) par défaut on sert simplement la version .webp SANS suffixe -1280
// (ainsi, même les petites images existent à coup sûr)
export function defaultSrc(src) {
  return src.replace(/\.(webp|png|jpe?g)$/i, ".webp");
}

// 👉 2) on propose des variantes "width" pour les grandes images.
// si certaines variantes n'existent pas, on mettra un fallback via onError (voir plus bas)
export function buildSrcSet(src) {
  const base = src.replace(/\.(webp|png|jpe?g)$/i, "");
  return [
    `${base}-600.webp 600w`,
    `${base}-1200.webp 1200w`,
    `${base}-2000.webp 2000w`,
  ].join(", ");
}

// 👉 3) fallback si le navigateur choisit une variante qui n'existe pas (404)
// on retire srcset et on force la source de base .webp
export function onImgError(e, originalSrc) {
  const img = e.currentTarget;
  if (img.dataset.fallback === "1") return; // éviter boucle
  img.dataset.fallback = "1";
  img.removeAttribute("srcset");
  img.removeAttribute("sizes");
  img.src = originalSrc.replace(/\.(webp|png|jpe?g)$/i, ".webp");
}
