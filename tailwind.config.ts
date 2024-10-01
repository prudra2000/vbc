import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paragraph: {
          primary: "#c2c8d1",
          secondary: "#8a919c",
        },
        accentMain: {
          primary: "#F8CC38",
          secondary: "#F8CC38",
        },
        dark: {
          primary: "#111827",
          secondary: "#1F2937",
        },
        gray: {
          light: "#F3F4F6",
          dark: "#4B5563",
        },
        light: {
          primary: "#f1f2f7",
          secondary: "#D1D5DB",
        },
        warning: {
          primary: "#EAB308",
          secondary: "#FDE047",
          hover: "#FACC15",
        },
        success: {
          primary: "#22C55E",
          secondary: "#86EFAC",
          hover: "#4ADE80",
        },
        info: {
          primary: "#3B82F6",
          secondary: "#93C5FD",
          hover: "#60A5FA",
        },
        error: {
          primary: "#EF4444",
          secondary: "#FCA5A5",
          hover: "#F87171",
        },
        link: {
          primary: "#1D4ED8",
        },
        darkBG: "#030711",
        lightBG: "#FFFFFF",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
