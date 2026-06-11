import aoc2025Image from "../../aoc2025.png";

export const projectEntries = [
  {
    slug: "robocuber",
    name: "RoboCuber",
    description:
      "A Rubik's cube solving robot I built with Arduino, a webcam, a Kociemba-style solver, and servos that physically twist the cube into place.",
    content: [
      {
        textBefore: "RoboCuber started as a random summer project after I watched an ",
        link: {
          label: "MIT robot",
          href: "https://www.youtube.com/shorts/VW7GYxWKV58",
        },
        textAfter:
          " solve a Rubik's cube in 0.38 seconds. I obviously was not about to build something at that level, but it made me want to see if I could build a rough version that at least moved a real cube on its own.",
      },
      "The first version was very homemade: popsicle sticks, an Arduino, and a few servo motors trying their best to turn the cube. Around then I also made a small piece of software that could scramble the cube and follow a list of moves, but it was not really a solver yet. It was more like the robot could obey instructions, but it could not figure them out.",
      {
        textBefore:
          "A couple years later, during winter break back home from college, I came back to the project and spent something like 60 hours just researching Rubik's cube solving. That was when I learned about ",
        link: {
          label: "God's number",
          href: "https://www.cube20.org/",
        },
        textAfter:
          ": every legal 3x3 cube position can be solved in 20 moves or fewer if you choose the best possible path.",
      },
      "That fact is wild once you think about the size of the search space. A standard cube has over 43 quintillion legal positions. If you checked one billion states every second, that would still take well over a thousand years to scan through. So the impressive part is not just solving the cube, it is cutting the search down enough that solving becomes practical.",
      {
        textBefore:
          "I ended up implementing a Kociemba-style solver in C. The rough idea is that instead of trying to solve the cube in one huge search, ",
        link: {
          label: "Kociemba's algorithm",
          href: "https://kociemba.org/math/pruning.htm",
        },
        textAfter:
          " splits it into two phases. Phase one gets the cube into a restricted group where the orientations and slice pieces are cleaned up. Phase two solves from inside that smaller world using a more limited move set.",
      },
      "A lot of my time went into building the pruning table lookup logic itself. The table is basically the solver's memory: given a compressed cube state, it can quickly estimate how many moves away that state is from the target group or solved state. Instead of thinking about all 43 quintillion cube states, Kociemba's phase-two search works inside a group of about 19.5 billion states, which is roughly 2.2 billion times smaller.",
      "Even that is still huge, so the pruning-table representation gets compressed further. One common trick is to ignore enough detail to get the table down to about 1.6 billion representative states, which is around 26.6 billion times smaller than the full cube space while still giving useful lower-bound estimates.",
      "Once that worked, the annoying part was generating those values in the first place. I remember trying to speed up the pre-calculation step with more GPU or HPC-style thinking, because the lookup is fast once the table exists, but filling the table is where you really feel the size of the cube state space.",
      "The pruning tables are what make the search usable. Before solving, the program precomputes tables that give lower bounds for how far certain compressed cube states are from the goal. Then during the actual solve, if a branch cannot possibly beat the current best solution, the solver cuts it off immediately. The precomputation takes time, but once those tables exist, finding a good solution is fast enough that the robot's physical turning becomes the slow part.",
      "I also have a short demo video linked below if you want to see the robot actually turning the cube instead of just reading about the solver.",
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
    featuredVideo: {
      title: "RoboCuber demo video",
      embedUrl: "https://www.youtube-nocookie.com/embed/o328AWIkfyE",
      href: "https://youtu.be/o328AWIkfyE",
    },
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
