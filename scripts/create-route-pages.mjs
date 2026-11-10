import { mkdir, readFile, writeFile } from "node:fs/promises";

// Keep direct links working while asking search engines not to index this unlisted page.
const html = await readFile("dist/index.html", "utf8");
const unlistedHtml = html.replace("</head>", '<meta name="robots" content="noindex, nofollow" /></head>');
for (const route of ["media", "media/stats"]) {
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, unlistedHtml);
}
