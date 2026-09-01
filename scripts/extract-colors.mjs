/**
 * Extract the dominant colors of each rug's first photo into a `palette:`
 * frontmatter array (en + fa entries share it). Re-runnable; replaces any
 * existing palette block.
 *
 * Method: downscale to 64px, k-means (k=6) over RGB with near-white/near-black
 * pixels dropped (studio background / shadows), keep the 5 largest clusters.
 *
 * Usage: node scripts/extract-colors.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

async function dominantColors(file, k = 6, keep = 5) {
  const { data, info } = await sharp(file)
    .resize(64, 64, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (min > 225) continue; // studio-white background
    if (max < 18) continue; // hard shadow
    px.push([r, g, b]);
  }
  if (px.length < k) return [];

  // k-means, seeded evenly through the (implicitly shuffled-enough) pixel list
  let centers = Array.from({ length: k }, (_, i) => px[Math.floor((i * px.length) / k)]);
  let assign = new Array(px.length).fill(0);
  for (let iter = 0; iter < 12; iter++) {
    for (let i = 0; i < px.length; i++) {
      let best = 0, bd = Infinity;
      for (let c = 0; c < k; c++) {
        const d =
          (px[i][0] - centers[c][0]) ** 2 +
          (px[i][1] - centers[c][1]) ** 2 +
          (px[i][2] - centers[c][2]) ** 2;
        if (d < bd) { bd = d; best = c; }
      }
      assign[i] = best;
    }
    const sums = Array.from({ length: k }, () => [0, 0, 0, 0]);
    for (let i = 0; i < px.length; i++) {
      const s = sums[assign[i]];
      s[0] += px[i][0]; s[1] += px[i][1]; s[2] += px[i][2]; s[3]++;
    }
    centers = sums.map((s, c) => (s[3] ? [s[0] / s[3], s[1] / s[3], s[2] / s[3]] : centers[c]));
  }

  const counts = new Array(k).fill(0);
  for (const a of assign) counts[a]++;
  const hex = (v) => Math.round(v).toString(16).padStart(2, "0");
  return centers
    .map((c, i) => ({ color: `#${hex(c[0])}${hex(c[1])}${hex(c[2])}`, n: counts[i] }))
    .filter((c) => c.n > px.length * 0.02)
    .sort((a, b) => b.n - a.n)
    .slice(0, keep)
    .map((c) => c.color);
}

function setPalette(file, palette) {
  let text = readFileSync(file, "utf8");
  text = text.replace(/^palette:\n(?: {2}- .*\n)*/m, ""); // drop existing block
  const block = "palette:\n" + palette.map((c) => `  - "${c}"`).join("\n") + "\n";
  text = text.replace(/^images:/m, block + "images:");
  writeFileSync(file, text);
}

for (const f of readdirSync(join(ROOT, "src/content/rugs/en"))) {
  const enFile = join(ROOT, "src/content/rugs/en", f);
  const img = readFileSync(enFile, "utf8").match(/^ {2}- "\.\.\/\.\.\/\.\.\/(assets\/[^"]+)"/m);
  if (!img) { console.log(`skip ${f}: no image path`); continue; }
  const palette = await dominantColors(join(ROOT, "src", img[1]));
  if (!palette.length) { console.log(`skip ${f}: no colors found`); continue; }
  setPalette(enFile, palette);
  setPalette(join(ROOT, "src/content/rugs/fa", f), palette);
  console.log(f.replace(/\.md$/, ""), palette.join(" "));
}
