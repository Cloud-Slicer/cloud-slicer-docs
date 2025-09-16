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
  // Comment out basePath for now to fix dev issues
  // Will need to enable for GitHub Pages deployment
  // basePath: "/cloud-slicer-docs",
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
    registryUrl: "https://tweakcn.com/r/themes/cmfn1g81u000004l12zk01rut",
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
          label: "Introduction",
          icon: "book-marked",
          link: "/introduction/introduction",
          items: [
            {
              type: "link",
              label: "Core Concepts",
              icon: "shapes",
              to: "/introduction/core-concepts",
            },
            {
              type: "link",
              label: "Authentication",
              icon: "lock",
              to: "/introduction/authentication",
            },
          ],
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
  metadata: {
    title: "Cloud Slicer Docs",
    description:
      "The official documentation for Cloud Slicer's API and services.  These docs cover everything from getting started to advanced usage of Cloud Slicer's powerful 3D printing software tools.",
    logo: "/logo-light.svg",
    favicon: "/favicon.ico",
    applicationName: "Cloud Slicer Docs",
    referrer: "no-referrer",
    keywords: [
      "3D Printing",
      "Cloud Slicer docs",
      "Instant quotes",
      "3D Printing Business",
    ],
  },
};

export default config;
