import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  page: {
    logo: {
      src: { 
        light: "/logo-light.svg", 
        dark: "/logo-dark.svg" 
      },
      alt: "Cloud Slicer",
      width: '50px',
    },
    banner: {
      message: "Welcome to our beta documentation!",
      color: "note", // "note" | "tip" | "info" | "caution" | "danger" or custom
      dismissible: true
    }
  },
  topNavigation: [
    { id: "docs", label: "Documentation" },
    { id: "api", label: "API Reference" },
  ],
  sidebar: {
    docs: [
      {
        type: "category",
        label: "Overview",
        items: ["docs/introduction", "docs/example"],
      },
    ],
  },
  search: {
    type: "pagefind",
    // Optional: Maximum number of sub results per page
    maxSubResults: 3,
    // Optional: Configure search result ranking (defaults shown below)
    ranking: {
      termFrequency: 0.8,
      pageLength: 0.6,
      termSimilarity: 1.2,
      termSaturation: 1.2,
    },
  },
  redirects: [{ from: "/", to: "/cloud-slicer-docs/docs/introduction" }],
  apis: {
    type: "file",
    input: "./apis/openapi.json",
    navigationId: "api",
  },
  docs: {
    files: "/pages/**/*.{md,mdx}",
  },
  theme: {
    light: {
      background: "oklch(100% 0 none)",
      foreground: "oklch(12.9% 0.027 262)",
      card: "oklch(100% 0 none)",
      cardForeground: "oklch(12.9% 0.027 262)",
      popover: "oklch(100% 0 none)",
      popoverForeground: "oklch(12.9% 0.027 262)",
      primary: "#E039D3",
      primaryForeground: "oklch(98.4% 0.002 248)",
      secondary: "#F9D5F6",
      secondaryForeground: "#6A1966",
      muted: "oklch(96.7% 0.003 265)",
      mutedForeground: "oklch(55.1% 0.023 264)",
      accent: "oklch(96.7% 0.003 265)",
      accentForeground: "oklch(21% 0.032 265)",
      destructive: "oklch(63.7% 0.208 25.3)",
      destructiveForeground: "oklch(98.4% 0.002 248)",
      border: "oklch(92.8% 0.006 265)",
      input: "oklch(92.8% 0.006 265)",
      ring: "#E039D3"
    },
    dark: {
      background: "oklch(12.9% 0.027 262)",
      foreground: "oklch(98.4% 0.002 248)",
      card: "oklch(12.9% 0.027 262)",
      cardForeground: "oklch(98.4% 0.002 248)",
      popover: "oklch(12.9% 0.027 262)",
      popoverForeground: "oklch(98.4% 0.002 248)",
      primary: "#E039D3",
      primaryForeground: "oklch(98.4% 0.002 248)",
      secondary: "#6A1966",
      secondaryForeground: "oklch(98.4% 0.002 248)",
      muted: "oklch(27.8% 0.03 257)",
      mutedForeground: "oklch(71.4% 0.019 261)",
      accent: "oklch(27.8% 0.03 257)",
      accentForeground: "oklch(98.4% 0.002 248)",
      destructive: "oklch(39.6% 0.133 25.7)",
      destructiveForeground: "oklch(98.4% 0.002 248)",
      border: "oklch(27.8% 0.03 257)",
      input: "oklch(27.8% 0.03 257)",
      ring: "#E039D3"
    }
  }
};

export default config;
