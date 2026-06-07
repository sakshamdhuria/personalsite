import coastPhoto from "../assets/life/norcal-2025/coast.webp";
import roadPhoto from "../assets/life/norcal-2025/road.webp";
import dinoPhoto from "../assets/life/norcal-2025/dinosaur.webp";
import redwoodsPhoto from "../assets/life/norcal-2025/redwoods.webp";
import capitolNightPhoto from "../assets/favorites/capitol-night.webp";
import jointTreePhoto from "../assets/favorites/joint-tree.webp";
import lakeCivilTwilightPhoto from "../assets/favorites/lake-civil-twilight.webp";
import lakeSunsetPhoto from "../assets/favorites/lake-sunset.webp";
import cityWaterfrontPhoto from "../assets/favorites/city-waterfront.webp";
import snowMountainPhoto from "../assets/favorites/snow-mountain.webp";

export const lifeEntries = [
  {
    date: "August 2025",
    title: "NorCal Road Trip",
    description:
      "Drove 1,650 miles over 7 days with my 2 best friends through Mendocino, Napa Valley, the Redwoods, the Oregon Coast, Crater Lake, and Mount Shasta.",
    photos: [
      { src: coastPhoto, alt: "Oregon coast stop from the NorCal trip" },
      { src: roadPhoto, alt: "Road trip stop from the NorCal trip" },
      { src: dinoPhoto, alt: "Roadside dinosaur stop from the NorCal trip" },
      { src: redwoodsPhoto, alt: "Redwoods stop from the NorCal trip" },
    ],
  },
];

export const favoritePhotos = [
  {
    src: lakeCivilTwilightPhoto,
    alt: "Civil twilight over a calm lake",
  },
  {
    src: lakeSunsetPhoto,
    alt: "Orange sunset over a lake with a sailboat silhouette",
  },
  {
    src: jointTreePhoto,
    alt: "Two wind-shaped trees on a grassy hillside",
  },
  {
    src: cityWaterfrontPhoto,
    alt: "City skyline and waterfront on a clear day",
  },
  {
    src: capitolNightPhoto,
    alt: "Illuminated capitol dome at night",
  },
  {
    src: snowMountainPhoto,
    alt: "Snowy mountain peaks above a cloud layer",
  },
];
