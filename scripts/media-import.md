The media page reads `src/data/media.json`. Each title keeps its category, latest log date, and optional genre tags and drama types.

To import watched titles, prepare a UTF-8 TSV file with one title per line, no header, and four columns: date (YYYY-MM-DD), category, canonical title, and optional comma-separated genres. Use the existing title spelling for repeat watches and reuse existing genre labels when possible. Look up or curate genre metadata before importing; the parser does not query a metadata service.

Run `node scripts/import-media.mjs /path/to/rows.tsv` to preview the number of changes. Add `--write` to apply them. The importer preserves existing IDs, keeps the latest log date, and matches titles by category and normalized spelling. Run `node scripts/import-media.mjs --check` and `npm run build` before publishing.
