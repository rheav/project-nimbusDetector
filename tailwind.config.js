/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "geist-var": ["GeistVariable", "sans-serif"],
        "geist-mono-var": ["GeistMonoVariable", "monospace"],
      },

      colors: {
        // Neutral palette
        transparent: "transparent",
        snow: "#ffffff",
        fog: "#fafafa",
        ash: "#f5f5f5",
        cloud: "#cfd1d2",
        slate: "#b7babc",
        stone: "#a0a3a6",
        pebble: "#8a8d90",
        smoke: "#5e6163",
        graphite: "#343537",
        ink: "#0a0a0a",

        // Blueish palette
        sky: "#deeffe",
        frost: "#7abcff",
        ocean: "#006bc8",
        sapphire: "#004e93",
        deepSea: "#003e74",
        navy: "#002c53",
        midnight: "#000e19",

        // Greenish palette
        mint: "#defef2",
        lime: "#7af7c7",
        emerald: "#00c87b",
        jade: "#00935b",
        forest: "#007447",
        pine: "#005333",
        seaweed: "#001910",

        // Yellowish palette
        cream: "#fef2de",
        sandy: "#f7c77a",
        mustard: "#c87b00",
        gold: "#935b00",
        bronze: "#744700",
        umber: "#533300",
        charcoal: "#191000",

        // Reddish palette
        blush: "#fedede",
        rose: "#f77a7c",
        cherry: "#c80003",
        ruby: "#930002",
        garnet: "#740002",
        wine: "#530001",
        ebony: "#190000",
      },
      animation: {
        pulseLiveGRN: "pulseLiveGRN 1.5s infinite",
        pulseLiveYLW: "pulseLiveYLW 1.5s infinite",
      },
      keyframes: {
        pulseLiveGRN: {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 222, 128,0.5)" },
          "70%": { boxShadow: "0 0 0 10px rgba(74, 222, 128,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(74, 222, 128,0)" },
        },
        pulseLiveYLW: {
          "0%": { boxShadow: "0 0 0 0 rgba(255, 225, 100,0.8)" },
          "70%": { boxShadow: "0 0 0 10px rgba(74, 222, 128,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(74, 222, 128,0)" },
        },
      },
    },
  },
  plugins: [],
};
