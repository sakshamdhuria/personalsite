import { readFile, writeFile } from "node:fs/promises";

const collection = new URL("../src/data/media.json", import.meta.url);
const categories = ["Movies", "Anime", "TV Shows", "Dramas"];
const titleKey = (title) => title.normalize("NFKC").toLowerCase().replace(/[’']/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const key = (row) => row.category + ":" + titleKey(row.title);
const validDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date)) && new Date(date).toISOString().startsWith(date);

export function parseMediaRows(input) {
  return input.split(/\r?\n/).flatMap((line, i) => {
    if (!line.trim() || line.startsWith("#")) return [];
    const [date, category, title, genreText, ...extra] = line.split("\t").map((part) => part.trim());
    if (!validDate(date) || !categories.includes(category) || !titleKey(title ?? "") || extra.length) {
      throw new Error("Invalid media row at line " + (i + 1));
    }
    return [{ date, category, title, genres: [...new Set((genreText ?? "").split(",").map((value) => value.trim()).filter(Boolean))] }];
  });
}

const args = process.argv.slice(2);
if (args.length) {
  const entries = JSON.parse(await readFile(collection, "utf8"));
  const index = new Map(entries.map((entry) => [key(entry), entry]));
  if (index.size !== entries.length || new Set(entries.map((entry) => entry.id)).size !== entries.length || entries.some((entry) => !validDate(entry.date))) throw new Error("Existing collection contains duplicate entries or invalid dates.");
  if (args[0] !== "--check") {
    const rows = parseMediaRows(await readFile(args[0], "utf8"));
    let nextId = Math.max(0, ...entries.map(({id}) => Number(id.match(/^media-(\d+)$/)?.[1] ?? 0)));
    let changes = 0;
    for (const row of rows) {
      const existing = index.get(key(row));
      if (existing) {
        const before = JSON.stringify(existing);
        if (row.date > existing.date) existing.date = row.date;
        if (row.genres.length) existing.genres = row.genres;
        if (before !== JSON.stringify(existing)) changes++;
      } else {
        const entry = { id: "media-" + ++nextId, ...row };
        entries.push(entry);
        index.set(key(entry), entry);
        changes++;
      }
    }
    if (changes && args.includes("--write")) await writeFile(collection, JSON.stringify(entries, null, 2) + "\n");
    console.log(changes + " changes" + (args.includes("--write") ? " applied." : " (dry run; pass --write to apply)."));
  }
  console.log(entries.length + " titles validated.");
} else {
  console.log("Usage: node scripts/import-media.mjs <rows.tsv> [--write] | --check");
}
