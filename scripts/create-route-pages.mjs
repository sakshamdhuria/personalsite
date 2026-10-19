import { mkdir, readFile, writeFile } from "node:fs/promises";

// Keep direct links working while asking search engines not to index this unlisted page.
await mkdir("dist/media", { recursive: true });
const html = await readFile("dist/index.html", "utf8");
await writeFile("dist/media/index.html", html.replace("</head>", '<meta name="robots" content="noindex, nofollow" /></head>'));
