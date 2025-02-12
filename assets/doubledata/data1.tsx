type DrillData = {
  drills: string[];
  notes: string[];
};

type WeekData = {
  [key: string]: {
    [key: string]: DrillData;
  };
};

export const doubleData: any = {
  "The Hot Dog": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Over-Head middle/crosscourt/insideout x15 each",
        "Backhand overhead x15",
        "Topspin Forehand/Backhand lob x20",
        "Slice Forehand/Backhand lob x20",
      ],
      notes: ["Drill these until you have confidence and consistency"],
    },
  },
  "The SABR": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Drive Forehand volley from service line x20",
        "Drive backhand volley from service line x20",
        "Cross court FH/BH approach shot + aggressive FH volleys x20",
        "Cross court FH/BH approach shot + aggressive BH volleys x20",
      ],
      notes: [
        "Drive FH/BH are great for balls that not quiet high enough to overhead",
      ],
    },
  },
  "The Fake Overhead": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Forehand cross court return x20 - focus on depth",
        "Forehand cross court return x20 - low and short to opponent's feet",
        "Backhand cross court return x20 - focus on depth",
        "Forehand cross court return x20 - low and short to opponent's feet",
      ],
      notes: [
        "Drill them on both Deuce and Ad side, coach can feed from service line",
      ],
    },
  },
  "Practice Sets": {
    "Warm Up": {
      drills: ["Mini Tennis", "Baseline middle", "Serve warm up each side"],
      notes: [
        "Warm up with good rhythm, height and consistency, adjust to each opponent's ball.",
      ],
    },
    "Main Drills": {
      drills: [
        "Play practice sets or practice tie breakers",
        "Implement shots in the previous practices",
        "Take time in between points to adjust and take things into consideration",
      ],
      notes: [
        "Make high percentage first serve and communicate with your partner",
      ],
    },
  },
  "Net Play Essentials 3": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Forehand/Backhand drop shot cross court x20",
        "Forehand/Backhand down the line volley x20",
        "Forehand/Backhand slice approach shot cross court x20",
        "Forehand/Backhand slice approach shot down the line x20",
      ],
      notes: ["Drill these until you have confidence and consistency"],
    },
  },
  "Serve Essential": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Serve T on Deuce x20",
        "Serve T on Ad x20",
        "Serve T on Deuce + Volley put-away x20",
        "Serve T on Ad + Volley put-away x20",
      ],
      notes: ["Drill these and play points implementing them"],
    },
  },
  "Serving Essential 2": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Serve Outwide on Deuce x20",
        "Serve Outwide on Ad x20",
        "Serve Outwide on Deuce + Volley put-away x20",
        "Serve Outwide on Ad + Volley put-away x20",
      ],
      notes: ["Drill these and play points implementing them"],
    },
  },
  "Serving Formation": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "I-Formation on Ad Side x15",
        "I-Formation on Deuce Side x15",
        "Australian formation on Ad Side x15",
        "Australian formation on Deuce Side x15",
      ],
      notes: ["Research these formations and apply them"],
    },
  },
  "Planned Switch": {
    "Warm Up": {
      drills: [
        "Mini Tennis - 30 balls in a row",
        "Baseline cross court - 20 Ball in a row",
        "Serve warm up each side x10",
      ],
      notes: [
        "Adjust to court conditions, ball bounce, and overall environment.",
      ],
    },
    "Main Drills": {
      drills: [
        "Baseliner topspin lob and volleyer switch to poach x15",
        "Baseline heavy deep topsin and volleyer switch to poach x15",
        "Server and Volleyer switch side after serve x15",
        "Server and Volleyer switch side after serve x15 - I-formation",
      ],
      notes: [
        "Planned switch is switch between volleyer and baseliner that you planned ahead",
      ],
    },
  },
  "Returning Patterns 3": {
    "Warm Up": {
      drills: [
        "Mini Tennis",
        "Baseline cross court",
        "Serve warm up each side x10",
      ],
      notes: [
        "Note: Warm up with good rhythm, height and consistency, adjust to each opponent's ball.",
      ],
    },
    "Main Drills": {
      drills: [
        "Forehand slice lob down the line x15",
        "Backhand slice lob down the line x15",
        "Forehand slice lob down the line Ad side x15",
        "Forehand slice lob down the line Deuce side x15",
      ],
      notes: [
        "Lob return is heavily used by professionals. It's amazing to not giving your opponent a free point on returning ",
      ],
    },
  },
};
