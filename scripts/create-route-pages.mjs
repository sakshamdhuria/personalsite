import { mkdir, copyFile } from "node:fs/promises";

// Give GitHub Pages a real entry point for direct links to the media page.
await mkdir("dist/media", { recursive: true });
await copyFile("dist/index.html", "dist/media/index.html");
