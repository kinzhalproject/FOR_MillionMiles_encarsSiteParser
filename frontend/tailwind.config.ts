import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a",
        card: "#141414",
        gold: {
          DEFAULT: "#c9a84c",
          light: "#d4b55a",
          dark: "#b8963e",
        },
        muted: "#888888",
        divider: "#222222",
      },
      fontFamily: {
        heading: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
