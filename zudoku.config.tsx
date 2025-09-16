import type { ZudokuConfig, ApiIdentity, ZudokuPlugin } from "zudoku";

const apiIdentityPlugin: ZudokuPlugin = {
  getIdentities: async () => {
    return [
      {
        label: "Cloud Slicer User",
        id: "test-user",
        authorizeRequest: (request: any) => {
          request.headers.set("Authorization", "Bearer token goes here");
          return request;
        },
      },
    ] as ApiIdentity[];
  },
};

const config: ZudokuConfig = {
  site: {
    logo: {
      src: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
      alt: "Cloud Slicer Docs",
      width: "250px",
    },
    banner: {
      message: (
        <div className="flex justify-center items-center gap-2">
          Welcome to the Cloud Slicer's BETA Documentation! ⏳
        </div>
      ),
      color: "#b366ff",
      dismissible: true,
    },
  },
  theme: {
    registryUrl: "https://tweakcn.com/r/themes/cmfllb5zf000804jscv6e1fuc",
    fonts: {
      sans: "Inter",
      serif: "Merriweather",
      mono: "JetBrains Mono",
    },
    customCss: `
      /* Make external links open in new tab */
      a[href^="https://api.cloudslicer3d.com"] {
        target: _blank;
        rel: noopener noreferrer;
      }
    `,
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
  navigation: [
    {
      type: "category",
      label: "Documentation",
      icon: "book",
      items: [
        {
          type: "link",
          label: "Quick Start",
          icon: "rocket",
          to: "/quick-start",
        },
        {
          type: "category",
          label: "Getting Started",
          icon: "sparkles",
          items: ["/introduction"],
        },
        {
          type: "link",
          icon: "code",
          badge: {
            label: "New",
            color: "indigo",
          },
          label: "API Playground",
          to: "https://api.cloudslicer3d.com/docs",
        },
      ],
    },
  ],
  plugins: [apiIdentityPlugin],
  redirects: [{ from: "/", to: "/introduction" }],
  apis: [
    {
      type: "file",
      input: "./apis/openapi.json",
      path: "/api",
    },
  ],
};

export default config;
