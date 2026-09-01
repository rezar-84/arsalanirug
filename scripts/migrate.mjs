/**
 * One-off migration: old Drupal 7/Ubercart dump -> Astro content collection.
 *
 * Reads the SQL dump + files dir from ~/Documents/arsalani-rug, extracts the
 * real rug products (junk/demo nodes excluded), copies + re-encodes their
 * photos into src/assets/rugs/<slug>/, and emits en/fa markdown entries.
 *
 * Usage:
 *   node scripts/migrate.mjs --dry-run   # print kept/excluded products, write nothing
 *   node scripts/migrate.mjs             # full run
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SRC = "/home/rubuntu/Documents/arsalani-rug";
const DUMP = join(SRC, "arsalani_sitedb_2026-09-01_14-09-29.sql");
const FILES = join(SRC, "files");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.argv.includes("--dry-run");

const sql = readFileSync(DUMP, "utf8");

/* ---------------- SQL parsing ---------------- */

function tableColumns(table) {
  const m = sql.match(new RegExp("CREATE TABLE `" + table + "` \\(([\\s\\S]*?)\\n\\)"));
  if (!m) throw new Error(`no CREATE TABLE for ${table}`);
  return [...m[1].matchAll(/^\s*`([^`]+)`/gm)].map((x) => x[1]);
}

// Scan the single INSERT statement for `table` and yield row objects.
function tableRows(table) {
  const cols = tableColumns(table);
  const header = "INSERT INTO `" + table + "` VALUES";
  const start = sql.indexOf(header);
  if (start === -1) return [];
  let i = start + header.length;
  const rows = [];
  let depth = 0, inStr = false, cur = "", tuple = [];
  for (; i < sql.length; i++) {
    const c = sql[i];
    if (inStr) {
      if (c === "\\") { cur += sql[++i]; continue; } // keep escaped char raw
      if (c === "'") { inStr = false; continue; }
      cur += c;
      continue;
    }
    if (c === "'") { inStr = true; cur = cur === null ? "" : cur; continue; }
    if (c === "(") { depth++; if (depth === 1) { tuple = []; cur = ""; } continue; }
    if (c === ")" && depth === 1) {
      tuple.push(cur); cur = ""; depth = 0;
      rows.push(Object.fromEntries(cols.map((k, j) => [k, tuple[j]])));
      continue;
    }
    if (depth === 1 && c === ",") { tuple.push(cur); cur = ""; continue; }
    if (depth === 1) { cur += c; continue; }
    if (c === ";") break; // end of statement
  }
  // unescape mysql escapes in strings
  return rows.map((r) =>
    Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typeof v === "string" ? v.replace(/\\n/g, "\n").replace(/\\r/g, "") : v]))
  );
}

// field_data_* helper: entity_id -> [field values, ordered by delta]
function fieldMap(table, valueCol) {
  const map = new Map();
  for (const r of tableRows(table)) {
    if (r.entity_type !== "node" || r.deleted !== "0") continue;
    const nid = r.entity_id;
    if (!map.has(nid)) map.set(nid, []);
    map.get(nid)[Number(r.delta)] = r[valueCol];
  }
  return map;
}

/* ---------------- Load source data ---------------- */

const nodes = tableRows("node");
const products = new Map(tableRows("uc_products").map((r) => [r.nid, r]));
const terms = new Map(tableRows("taxonomy_term_data").map((r) => [r.tid, r.name]));
const files = new Map(tableRows("file_managed").map((r) => [r.fid, r.uri]));

const catsByNid = fieldMap("field_data_field_categories", "field_categories_tid");
const matsByNid = fieldMap("field_data_field_materials", "field_materials_tid");
const imgsByNid = fieldMap("field_data_uc_product_image", "uc_product_image_fid");

const colorCols = {
  field: "field_data_field_color_field",
  medallion: "field_data_field_color_medalion",
  mainBorder: "field_data_field_color_main_border",
  smallBorders: "field_data_field_color_small_borders",
};
const colorsByNid = {};
for (const [key, table] of Object.entries(colorCols)) {
  const valueCol = tableColumns(table).find((c) => /_(rgb|value)$/.test(c));
  colorsByNid[key] = fieldMap(table, valueCol);
}

const bodyByNid = fieldMap("field_data_body", "body_value");

/* ---------------- Product selection + normalization ---------------- */

const JUNK = new Set(["asfsdcf", "adxasxd", "hh", "bb", "aa", "acer iconia", "acer-iconia"]);

const CATEGORY_MAP = {
  "selected & available rugs": "selected-available",
  "boutique rugs": "boutique",
  "patch work": "patchwork",
  oushak: "oushak",
  "moshk abad": "moshk-abad",
  "new moshk abad": "new-moshk-abad",
};
const MATERIAL_MAP = { "full silk": "full-silk", wool: "wool", "silk touch": "silk-touch" };
const ORIGINS = ["Qom", "Kashan", "Malayer", "Shiraz", "Oushak", "Moshk Abad", "Isfahan", "Tabriz", "Nain"];

const slugify = (s) =>
  s.toLowerCase()
    .replace(/arsalani/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const kept = [], excluded = [], usedSlugs = new Set();
for (const n of nodes) {
  if (n.type !== "product") continue;
  const title = n.title.trim();
  const p = products.get(n.nid);
  if (JUNK.has(title.toLowerCase()) || !p) {
    excluded.push(title || `(nid ${n.nid})`);
    continue;
  }
  const toCm = (v) => {
    let x = Number(v);
    if (p.length_units === "in") x *= 2.54;
    return Math.round(x);
  };
  const catNames = (catsByNid.get(n.nid) ?? []).map((tid) => terms.get(tid) ?? "");
  const category =
    catNames.map((c) => CATEGORY_MAP[c.toLowerCase().trim()]).find(Boolean) ?? "selected-available";
  const matName = (matsByNid.get(n.nid) ?? []).map((tid) => terms.get(tid) ?? "")[0];
  const material = matName ? MATERIAL_MAP[matName.toLowerCase().trim()] : undefined;
  const origin = ORIGINS.find((o) => title.toLowerCase().includes(o.toLowerCase()));
  const colors = {};
  for (const key of Object.keys(colorCols)) {
    const v = (colorsByNid[key].get(n.nid) ?? [])[0];
    if (v) colors[key] = v.startsWith("#") ? v : `#${v}`;
  }
  const imgPaths = (imgsByNid.get(n.nid) ?? [])
    .map((fid) => files.get(fid))
    .filter(Boolean)
    .map((uri) => join(FILES, uri.replace("public://", "")))
    .filter((f) => existsSync(f));

  // Clean display title: "Arsalani- Qom Golfarang" -> "Qom Golfarang"
  const displayTitle = title.replace(/^\s*arsalani\s*-\s*/i, "").replace(/\s+/g, " ").trim();

  // Several rugs share a title (e.g. seven "Qom Silk Zarcharak"); disambiguate
  // repeat slugs with the SKU.
  let slug = slugify(title) || `rug-${n.nid}`;
  if (usedSlugs.has(slug)) slug = `${slug}-${slugify(p.model)}`;
  usedSlugs.add(slug);

  kept.push({
    nid: n.nid,
    slug,
    title: displayTitle,
    sku: p.model,
    lengthCm: toCm(p.length),
    widthCm: toCm(p.width),
    category,
    material,
    origin,
    colors,
    images: imgPaths,
    created: Number(n.created),
  });
}

console.log(`Kept ${kept.length} products:`);
for (const r of kept)
  console.log(
    `  ${r.slug}  [${r.sku}] ${r.lengthCm}x${r.widthCm}cm cat=${r.category} mat=${r.material ?? "-"} imgs=${r.images.length}${r.images.length === 0 ? "  ⚠ NO IMAGES" : ""}`
  );
console.log(`Excluded ${excluded.length}: ${excluded.join(", ")}`);

if (DRY) process.exit(0);

/* ---------------- Emit assets + content ---------------- */

async function encodeTo(srcFile, destFile) {
  mkdirSync(dirname(destFile), { recursive: true });
  await sharp(srcFile)
    .rotate() // respect EXIF orientation from phone shots
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destFile);
}

const fmEscape = (s) => `"${String(s).replace(/"/g, '\\"')}"`;

for (const r of kept) {
  const rel = [];
  for (let i = 0; i < r.images.length; i++) {
    const dest = join(ROOT, "src/assets/rugs", r.slug, `${String(i + 1).padStart(2, "0")}.jpg`);
    await encodeTo(r.images[i], dest);
    rel.push(`../../../assets/rugs/${r.slug}/${basename(dest)}`);
  }
  if (rel.length === 0) {
    console.warn(`  ⚠ ${r.slug}: no images — skipping content entry (schema requires images)`);
    continue;
  }
  const fm = [
    "---",
    `title: ${fmEscape(r.title)}`,
    `sku: ${fmEscape(r.sku)}`,
    `lengthCm: ${r.lengthCm}`,
    `widthCm: ${r.widthCm}`,
    `category: ${r.category}`,
    ...(r.material ? [`material: ${r.material}`] : []),
    ...(r.origin ? [`origin: ${fmEscape(r.origin)}`] : []),
    ...(Object.keys(r.colors).length
      ? ["colors:", ...Object.entries(r.colors).map(([k, v]) => `  ${k}: ${fmEscape(v)}`)]
      : []),
    "images:",
    ...rel.map((p) => `  - ${fmEscape(p)}`),
    "featured: false",
    "draft: false",
    "---",
    "",
  ];
  writeFileSync(
    join(ROOT, "src/content/rugs/en", `${r.slug}.md`),
    fm.join("\n") + "<!-- TODO: replace with reviewed copy -->\n"
  );
  const fmFa = fm.map((l) => (l === "draft: false" ? "draft: true" : l));
  writeFileSync(
    join(ROOT, "src/content/rugs/fa", `${r.slug}.md`),
    fmFa.join("\n") + "<!-- TODO: Persian title + description -->\n"
  );
}

// About-us source copy (node 78) for the Heritage page.
const about = (bodyByNid.get("78") ?? [])[0];
if (about) {
  mkdirSync(join(ROOT, "docs"), { recursive: true });
  writeFileSync(
    join(ROOT, "docs/source-copy.md"),
    `# Source copy from old Drupal site\n\n## About us (node 78)\n\n${about}\n`
  );
}

// Branding assets.
for (const f of ["logo.png"]) {
  const src = join(FILES, f);
  if (existsSync(src)) copyFileSync(src, join(ROOT, "public", f));
}

console.log("Done.");
