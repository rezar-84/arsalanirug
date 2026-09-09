import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const DIST_DIR = resolve("./dist");

let totalPages = 0;
let errors = [];
let warnings = [];

async function getHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getHtmlFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

async function fileExists(path) {
  try {
    const s = await stat(path);
    return s.isFile();
  } catch {
    return false;
  }
}

async function audit() {
  console.log("Auditing generated site in ./dist...");
  const htmlFiles = await getHtmlFiles(DIST_DIR);
  totalPages = htmlFiles.length;

  for (const filePath of htmlFiles) {
    const relPath = filePath.replace(DIST_DIR, "");
    const content = await readFile(filePath, "utf-8");

    // 1. DOCTYPE check
    if (!content.toLowerCase().startsWith("<!doctype html")) {
      errors.push(`${relPath}: Missing <!DOCTYPE html>`);
    }

    const isRedirect = content.includes('http-equiv="refresh"');
    if (isRedirect) {
      continue; // Static redirect stubs do not contain full HTML layouts
    }

    // 2. html[lang] and html[dir]
    const htmlTagMatch = content.match(/<html([^>]+)>/i);
    if (!htmlTagMatch) {
      errors.push(`${relPath}: Missing <html> tag`);
    } else {
      const attrs = htmlTagMatch[1];
      if (!attrs.includes("lang=")) {
        errors.push(`${relPath}: <html> tag missing lang attribute`);
      }
      if (relPath.startsWith("/fa/") || relPath.startsWith("/ar/")) {
        if (!attrs.includes('dir="rtl"')) {
          errors.push(`${relPath}: RTL locale missing dir="rtl" on <html>`);
        }
      }
    }

    // 3. title check
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      errors.push(`${relPath}: Missing or empty <title>`);
    }

    // 4. meta viewport check
    if (!content.includes('name="viewport"')) {
      errors.push(`${relPath}: Missing <meta name="viewport">`);
    }

    // 5. Accessibility: images must have alt attributes (including empty alt="" for decorative)
    const imgMatches = content.matchAll(/<img([^>]+)>/gi);
    for (const match of imgMatches) {
      const imgAttrs = match[1];
      const hasAlt = /\balt\b/i.test(imgAttrs);
      if (!hasAlt) {
        errors.push(`${relPath}: <img> missing alt attribute: ${match[0].slice(0, 80)}...`);
      }
    }

    // 6. Accessibility: buttons must not be empty or must have aria-label
    const btnMatches = content.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/gi);
    for (const match of btnMatches) {
      const btnAttrs = match[1];
      const btnInner = match[2].replace(/<[^>]+>/g, "").trim();
      const hasAriaLabel = /aria-label=["'][^"']+["']/i.test(btnAttrs);
      if (!btnInner && !hasAriaLabel) {
        warnings.push(`${relPath}: <button> has no visible text or aria-label`);
      }
    }

    // 7. Internal link integrity check (e2e navigation)
    const linkMatches = content.matchAll(/<a\s+[^>]*href=["']([^"'#]+)["'][^>]*>/gi);
    for (const match of linkMatches) {
      const href = match[1];
      // Check only internal root-relative links
      if (href.startsWith("/") && !href.startsWith("//")) {
        const cleanHref = href.split("?")[0].split("#")[0];
        // Possible target paths
        const targetHtml = join(DIST_DIR, cleanHref, "index.html");
        const directHtml = join(DIST_DIR, `${cleanHref}.html`);
        const exactFile = join(DIST_DIR, cleanHref);

        const exists =
          (await fileExists(targetHtml)) ||
          (await fileExists(directHtml)) ||
          (await fileExists(exactFile));

        if (!exists) {
          errors.push(`${relPath}: Broken internal link to "${href}"`);
        }
      }
    }
  }

  console.log(`Audited ${totalPages} pages.`);
  if (warnings.length > 0) {
    console.log(`Warnings (${warnings.length}):`);
    warnings.slice(0, 10).forEach((w) => console.log(` - ${w}`));
    if (warnings.length > 10) console.log(` ... and ${warnings.length - 10} more warnings.`);
  }

  if (errors.length > 0) {
    console.error(`FAILED with ${errors.length} error(s):`);
    errors.slice(0, 20).forEach((e) => console.error(` ✕ ${e}`));
    if (errors.length > 20) console.error(` ... and ${errors.length - 20} more errors.`);
    process.exit(1);
  }

  console.log("All accessibility and link integrity checks passed cleanly (0 errors)!");
}

audit().catch((err) => {
  console.error("Audit failed with uncaught exception:", err);
  process.exit(1);
});
