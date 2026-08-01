import { readFileSync } from "node:fs";

const xml = readFileSync(
  new URL("../public/translations.xml", import.meta.url),
  "utf8"
);

const entryRe = /<text\s+([^>]+?)\/>/gs;
const seen = new Set();
let errors = 0;

for (const match of xml.matchAll(entryRe)) {
  const attrRe = /(\w+)="([^"]*)"/g;
  const attrs = {};
  let a;
  while ((a = attrRe.exec(match[1])) !== null) {
    attrs[a[1]] = a[2];
  }

  const { name, langEn, langDe } = attrs;

  if (!name || !langEn || !langDe) {
    console.error(`Incomplete entry: ${name ?? match[1]}`);
    errors++;
    continue;
  }

  if (seen.has(name)) {
    console.error(`Duplicate key: ${name}`);
    errors++;
  }
  seen.add(name);

  for (const [lang, value] of [
    ["langEn", langEn],
    ["langDe", langDe],
  ]) {
    if (/[—–]/.test(value)) {
      console.error(`Gedankenstrich gefunden in ${name} (${lang})`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`FAILED: ${errors} problem(s) found`);
  process.exit(1);
}

console.log(`OK: ${seen.size} keys complete, no dashes`);
