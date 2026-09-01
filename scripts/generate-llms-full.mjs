/**
 * Generates public/llms-full.txt — the llms.txt companion with the complete
 * catalog — from the EN content collection. Runs before every build (see
 * package.json) so it never drifts from the published rugs.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(ROOT, "src/content/rugs/en");

const fm = (text, key) => text.match(new RegExp(`^${key}: "?([^"\\n]*)"?$`, "m"))?.[1];

const rugs = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const t = readFileSync(join(dir, f), "utf8");
    if (/^draft: true$/m.test(t)) return null;
    return {
      slug: f.replace(/\.md$/, ""),
      title: fm(t, "title"),
      sku: fm(t, "sku"),
      lengthCm: fm(t, "lengthCm"),
      widthCm: fm(t, "widthCm"),
      category: fm(t, "category"),
      material: fm(t, "material"),
      origin: fm(t, "origin"),
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.slug.localeCompare(b.slug));

const line = (r) =>
  `- [${r.title}](https://arsalanirug.com/content/${r.slug}) — ref ${r.sku}, ` +
  `${r.lengthCm} × ${r.widthCm} cm, ${r.category}` +
  (r.material ? `, ${r.material}` : "") +
  (r.origin ? `, origin ${r.origin}` : "") +
  `. Price on request.`;

const out = `# Arsalani Rug — full catalog

> Companion to https://arsalanirug.com/llms.txt. Arsalani Luxury and Modern Rugs:
> hand-knotted Persian rugs, a family craft since 1866 (founder Gholamhossein
> Arsalani, b. Kashan 1866; workshops rooted in Qom). Catalog-and-inquiry only —
> no online checkout; every price is on request via WhatsApp, phone, or
> info@arsalanirug.com. Dimensions are woven sizes in centimetres.

## Rugs (${rugs.length})

${rugs.map(line).join("\n")}

## Reference pages

- History of the Persian rug: https://arsalanirug.com/history
- Guide to designs, regions, quality, and terms: https://arsalanirug.com/guide
- The Arsalani family story: https://arsalanirug.com/about
- Contact and locations (Tehran, Qom, Izmir, Los Angeles): https://arsalanirug.com/contact
`;

writeFileSync(join(ROOT, "public/llms-full.txt"), out);
console.log(`llms-full.txt: ${rugs.length} rugs`);
