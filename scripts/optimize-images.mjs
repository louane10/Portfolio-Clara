// scripts/optimize-images.mjs
// Génère -600.webp, -1200.webp, -2000.webp (+ -1280.webp par défaut) pour chaque image
// dans public/SITE INTERNET/PHOTOS/**

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join("public", "SITE INTERNET", "PHOTOS");
// Extensions prises en compte (insensibles à la casse)
const exts = [".webp", ".jpg", ".jpeg", ".png"];
const targets = [600, 1200, 2000];
const quality = 78;

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else {
      const ext = path.extname(e.name).toLowerCase();
      if (exts.includes(ext)) out.push(p);
    }
  }
  return out;
}

function outName(file, w) {
  const ext = path.extname(file);
  const base = file.slice(0, -ext.length);
  return `${base}-${w}.webp`;
}

async function ensureWebpDefault(file, meta, buf) {
  // Si l’original > 1280px → on crée -1280.webp
  if ((meta.width || 0) > 1280) {
    const out = outName(file, 1280);
    await sharp(buf).resize({ width: 1280 }).webp({ quality }).toFile(out);
    return out;
  }
  // Sinon : on convertit l’original en .webp pour servir comme "default"
  const ext = path.extname(file);
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  if (out !== file) {
    await sharp(buf).webp({ quality }).toFile(out);
    return out;
  }
  // Si c’est déjà un .webp et pas large : on garde l’original
  return file;
}

async function run() {
  const rootAbs = path.resolve(ROOT);
  console.log("▶ Optimisation d’images dans:", rootAbs);

  let files;
  try {
    files = await walk(rootAbs);
  } catch (e) {
    console.error("❌ Dossier introuvable:", rootAbs);
    console.error("Vérifie que tes images sont bien dans public/SITE INTERNET/PHOTOS/");
    process.exit(1);
  }

  console.log(`→ ${files.length} fichiers trouvés`);
  let done = 0;

  for (const file of files) {
    try {
      const buf = await fs.readFile(file);
      const img = sharp(buf, { unlimited: true });
      const meta = await img.metadata();
      const w = meta.width || 0;

      // Variantes (pas d'upscale)
      for (const tw of targets) {
        if (w <= tw * 0.98) continue;
        const out = outName(file, tw);
        await sharp(buf).resize({ width: tw }).webp({ quality }).toFile(out);
      }

      // "default" (-1280.webp si possible, sinon conversion .webp)
      await ensureWebpDefault(file, meta, buf);

      done++;
      if (done % 20 === 0) process.stdout.write(`… ${done}/${files.length}\n`);
    } catch (err) {
      console.warn("\n! Erreur sur", file, "→", err.message);
    }
  }

  console.log(`\n✓ Terminé : ${done} fichiers traités.`);
  console.log("Tu peux maintenant utiliser `defaultSrc()` + `buildSrcSet()` comme on a vu.");
}

run().catch((e) => {
  console.error("❌ Erreur critique:", e);
  process.exit(1);
});
