import aoc2025Image from "../../aoc2025.png";

export const projectEntries = [
  {
    name: "RoboCuber",
    description:
      "A Rubik's cube solving robot I built with Arduino, a webcam reads the cube, a Kociemba solver figures out the moves, and servos twist it into place. Mostly a fun hardware project from a few years back revived by combining with an algorithm imeplementation.",
    links: [
      {
        label: "Demo video",
        href: "https://youtu.be/o328AWIkfyE",
      },
    ],
    accent: "is-robocuber",
  },
  {
    name: "Advent of Code 2025",
    description:
      "A 12-day run of holiday programming puzzles that leaned into parsing, grid simulations, graph search, connectivity with union-find/Kruskal-style ideas, dynamic programming, and optimization/linear constraints. I liked how the silly ASCII story hid real algorithm practice in bite-sized problems.",
    image: {
      src: aoc2025Image,
      alt: "Advent of Code 2025 ASCII puzzle map",
    },
    links: [],
    accent: "is-aoc",
  },
  {
    name: "statsCap",
    description:
      "I don't really watch NBA games, I just like the numbers. statsCap pulls box scores from recent game days and ranks who actually had the best night statistically. It's offline right now because the API broke somewhere along the way, but I might come back and fix it.",
    links: [
      {
        label: "stats-cap.vercel.app",
        href: "https://stats-cap.vercel.app/",
      },
    ],
    accent: "is-statscap",
  },
];
