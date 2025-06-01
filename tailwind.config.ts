import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Nova paleta de cores ZapControl
        night: {
          DEFAULT: "#0d0a0b",
          50: "#f7f6f7",
          100: "#efedef",
          200: "#dfdcdf",
          300: "#cfc9cf",
          400: "#9f959f",
          500: "#6f616f",
          600: "#5f515f",
          700: "#4f414f",
          800: "#3f313f",
          900: "#2f212f",
        },
        charcoal: {
          DEFAULT: "#454955",
          50: "#f6f7f8",
          100: "#edeef1",
          200: "#d2d5dc",
          300: "#b7bcc7",
          400: "#818a9d",
          500: "#4b5873",
          600: "#434e68",
          700: "#394156",
          800: "#2e3445",
          900: "#252a38",
        },
        magnolia: {
          DEFAULT: "#f3eff5",
          50: "#fdfcfe",
          100: "#fbf9fc",
          200: "#f7f1f9",
          300: "#f3e9f6",
          400: "#ebd9f0",
          500: "#e3c9ea",
          600: "#ccb5d3",
          700: "#aa97b0",
          800: "#88798d",
          900: "#6f6374",
        },
        "apple-green": {
          DEFAULT: "#72b01d",
          50: "#f4f9e8",
          100: "#e9f3d1",
          200: "#d3e7a3",
          300: "#bddb75",
          400: "#a7cf47",
          500: "#72b01d",
          600: "#5b8d17",
          700: "#446a11",
          800: "#2d470b",
          900: "#162405",
        },
        "office-green": {
          DEFAULT: "#3f7d20",
          50: "#f0f6ec",
          100: "#e1edd9",
          200: "#c3dbb3",
          300: "#a5c98d",
          400: "#87b767",
          500: "#3f7d20",
          600: "#32641a",
          700: "#254b13",
          800: "#18320d",
          900: "#0c1906",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
