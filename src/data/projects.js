import aoc2025Image from "../../aoc2025.png";

export const projectEntries = [
  {
    slug: "robocuber",
    name: "RoboCuber",
    description:
      "A Rubik's cube solving robot I built with Arduino, a webcam, a Kociemba-style solver, and servos that physically twist the cube into place.",
    content: [
      "RoboCuber started as a hardware project, but the part that made it interesting was the solver behind it. The big background idea is God's number: for a standard 3x3 cube, every legal position can be solved in 20 moves or fewer if you are allowed to pick the best possible route.",
      "That sounds almost impossible when you remember how large the cube state space is. The full cube has over 43 quintillion legal positions, and even if you describe the search more narrowly you are still thinking in the quintillions. The trick is not to search everything. A Kociemba-style two-phase solver first pushes the cube into a restricted subgroup, then solves from there.",
      "The pruning tree is the key optimization. Before solving, the program builds pruning tables: compact lookup tables that say, for a compressed version of the cube state, at least how many moves are still needed. That precomputation is the slow 'training' step and can take a while depending on the table size and machine, but it only has to be done once.",
      "After that, the live solve is much faster. Instead of exploring every branch, the solver checks the pruning table and immediately throws away branches that cannot beat the current best path. So the search goes from a ridiculous quintillion-scale space to a small, guided tree that can usually find a good near-optimal solution in seconds or less; the robot's physical turning is often the slower part.",
    ],
    links: [
      {
        label: "Demo video",
        href: "https://youtu.be/o328AWIkfyE",
      },
    ],
    blogLinks: [
      {
        label: "Demo video",
        href: "https://youtu.be/o328AWIkfyE",
      },
    ],
    accent: "is-robocuber",
  },
  {
    slug: "advent-of-code-2025",
    name: "Advent of Code 2025",
    description:
      "A 12-day run of holiday programming puzzles with a lot of parsing, grids, graph search, connectivity, dynamic programming, and optimization hiding under the ASCII story.",
    content: [
      {
        textBefore: "",
        link: {
          label: "Advent of Code 2025",
          href: "https://adventofcode.com/2025",
        },
        textAfter:
          " was only 12 days, which sounded manageable until it became part of my night routine. I kept telling myself I would just look at the puzzle for a little bit, and then suddenly it was 2am during finals week and I was still trying one more idea.",
      },
      "The problems were fun because they rarely felt like textbook questions at first. A lot of them started as weird parsing or simulation tasks, which was extra annoying in C++ but also made me learn a bunch of random string handling and stringstream stuff I had mostly avoided before. Then the puzzle would slowly turn into grids, graph traversal, path counting, connectivity, dynamic programming, coordinate tricks, or some kind of optimization problem.",
      {
        textBefore: "The coolest one for me was ",
        link: {
          label: "Day 10, Factory",
          href: "https://adventofcode.com/2025/day/10",
        },
        textAfter:
          ". The setup was basically a bunch of machines with joltage targets and buttons that increment different subsets of those joltages. At first it feels like you should brute force button presses or do a clever search, but the numbers get big enough that this falls apart pretty quickly.",
      },
      "The clean way to see it is as integer linear programming: each button gets a variable for how many times you press it, the constraints say every joltage has to end at the target value, and the objective is to minimize the total number of presses. I remember looking around for online solvers and libraries I could import, including Google's optimization tooling if I remember correctly, because the hard part became modeling the problem cleanly and letting the solver do the search.",
      "That one was just a really cool problem. More broadly, I liked seeing random math topics show up across the event in situations that felt almost practical, even though the scenarios were obviously fake little Advent of Code worlds. It made the math feel useful in a playful context.",
      "I shared some of my solutions in the repo linked below. Overall, finishing all 24 puzzles was pretty cool and landed me around the top 2.5% of people attempting Advent of Code that year.",
    ],
    image: {
      src: aoc2025Image,
      alt: "Advent of Code 2025 ASCII puzzle map",
    },
    links: [],
    blogLinks: [
      {
        label: "Solutions repo",
        href: "https://github.com/sakshamdhuria/adventofcode/tree/main/2025",
      },
    ],
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
