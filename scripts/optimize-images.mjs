import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

/**
 * Add new site images here. Drop originals anywhere, point `src` at them,
 * and set a stable `dest` under src/assets/.
 */
const jobs = [
  {
    src: "deskBG.png",
    dest: "src/assets/ui/desk-dark.webp",
    maxWidth: 1536,
    quality: 82,
  },
  {
    src: "deskLBG.png",
    dest: "src/assets/ui/desk-light.webp",
    maxWidth: 1536,
    quality: 82,
  },
  {
    src: "src/assets/roadTrip/oregon-coast.jpg",
    dest: "src/assets/life/norcal-2025/coast.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "randomLifeRoadTrip/IMG_9310_Original.jpg",
    dest: "src/assets/life/norcal-2025/road.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/roadTrip/dinosaur-stop.jpg",
    dest: "src/assets/life/norcal-2025/dinosaur.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "randomLifeRoadTrip/IMG_9409_Original.jpg",
    dest: "src/assets/life/norcal-2025/redwoods.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/favoritePhotos/capitol-night.jpg",
    dest: "src/assets/favorites/capitol-night.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/favoritePhotos/joint-tree.jpg",
    dest: "src/assets/favorites/joint-tree.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/favoritePhotos/lake-civil-twilight.jpg",
    dest: "src/assets/favorites/lake-civil-twilight.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/favoritePhotos/lake-sunset.jpg",
    dest: "src/assets/favorites/lake-sunset.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/favoritePhotos/img-6777.jpg",
    dest: "src/assets/favorites/city-waterfront.webp",
    maxWidth: 1800,
    quality: 82,
  },
  {
    src: "src/assets/favoritePhotos/snow-mountain.jpg",
    dest: "src/assets/favorites/snow-mountain.webp",
    maxWidth: 1800,
    quality: 82,
  },
];

async function optimizeImage({ src, dest, maxWidth, quality }) {
  const inputPath = path.join(root, src);
  const outputPath = path.join(root, dest);

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  let pipeline = image.rotate();

  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline
    .webp({ quality, effort: 6 })
    .toFile(outputPath);

  const inputStat = await fs.stat(inputPath);
  const outputStat = await fs.stat(outputPath);
  const savings = ((1 - outputStat.size / inputStat.size) * 100).toFixed(0);

  console.log(
    `${dest}: ${formatBytes(inputStat.size)} -> ${formatBytes(outputStat.size)} (${savings}% smaller)`,
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

for (const job of jobs) {
  await optimizeImage(job);
}

console.log("\nDone. Optimized images are in src/assets/.");
