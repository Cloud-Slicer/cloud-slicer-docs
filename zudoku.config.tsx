import type { ZudokuConfig, ZudokuPlugin } from "zudoku";
import { Button } from "zudoku/ui/Button.js";
import { FaDiscord, FaHome } from "react-icons/fa";
import { BiLogoGithub } from "react-icons/bi";

const posthogPlugin: ZudokuPlugin = {
  getHead: () => {
    return (
      <script>
        {/* Make sure to use the public API key for PostHog, this can be exposed to the client side */}
        {`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);var n=t;return function(){n.apply(t,arguments)}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('phc_doSsmLWBGzV8KLLn6yVOhPnxOnl3DAdXh4Z7u0VQ9g7', {api_host: 'https://us.i.posthog.com'});
        `}
      </script>
    );
  },
};

const config: ZudokuConfig = {
  site: {
    title: "Cloud Slicer Documentation",
    logo: {
      src: { light: "/logo-light.svg", dark: "/logo-dark.svg" },
      alt: "Cloud Slicer Docs",
      width: "250px",
    },
    banner: {
      message: (
        <div className="flex justify-center items-center gap-2">
          Welcome to the Cloud Slicer's BETA Documentation! 🧪
        </div>
      ),
      color: "#b366ff",
      dismissible: true,
    },
  },
  theme: {
    fonts: {
      sans: "Plus Jakarta Sans",
      serif: "Lora",
      mono: "IBM Plex Mono",
    },
    customCss: {
      ":root": {
        "--background": "oklch(0.9940 0 0)",
        "--foreground": "oklch(0 0 0)",
        "--card": "oklch(0.9940 0 0)",
        "--card-foreground": "oklch(0 0 0)",
        "--popover": "oklch(0.9911 0 0)",
        "--popover-foreground": "oklch(0 0 0)",
        "--primary": "oklch(0.6659 0.2211 304.2111)",
        "--primary-foreground": "oklch(1.0000 0 0)",
        "--secondary": "oklch(0.9540 0.0063 255.4755)",
        "--secondary-foreground": "oklch(0.1344 0 0)",
        "--muted": "oklch(0.9702 0 0)",
        "--muted-foreground": "oklch(0.4386 0 0)",
        "--accent": "oklch(0.9393 0.0288 266.3680)",
        "--accent-foreground": "oklch(0.5445 0.1903 259.4848)",
        "--destructive": "oklch(0.6290 0.1902 23.0704)",
        "--destructive-foreground": "oklch(1.0000 0 0)",
        "--border": "oklch(0.9300 0.0094 286.2156)",
        "--input": "oklch(0.9401 0 0)",
        "--ring": "oklch(0 0 0)",
        "--chart-1": "oklch(0.7459 0.1483 156.4499)",
        "--chart-2": "oklch(0.5393 0.2713 286.7462)",
        "--chart-3": "oklch(0.7336 0.1758 50.5517)",
        "--chart-4": "oklch(0.5828 0.1809 259.7276)",
        "--chart-5": "oklch(0.5590 0 0)",
        "--radius": "1.4rem",
        "--sidebar": "oklch(0.9777 0.0051 247.8763)",
        "--sidebar-foreground": "oklch(0 0 0)",
        "--sidebar-primary": "oklch(0 0 0)",
        "--sidebar-primary-foreground": "oklch(1.0000 0 0)",
        "--sidebar-accent": "oklch(0.9401 0 0)",
        "--sidebar-accent-foreground": "oklch(0 0 0)",
        "--sidebar-border": "oklch(0.9401 0 0)",
        "--sidebar-ring": "oklch(0 0 0)",
        "--font-sans": "Plus Jakarta Sans, sans-serif",
        "--font-serif": "Lora, serif",
        "--font-mono": "IBM Plex Mono, monospace",
        "--shadow-color": "hsl(0 0% 0%)",
        "--shadow-opacity": "0.16",
        "--shadow-blur": "3px",
        "--shadow-spread": "0px",
        "--shadow-offset-x": "0px",
        "--shadow-offset-y": "2px",
        "--letter-spacing": "-0.025em",
        "--spacing": "0.27rem",
        "--shadow-2xs": "0px 2px 3px 0px hsl(0 0% 0% / 0.08)",
        "--shadow-xs": "0px 2px 3px 0px hsl(0 0% 0% / 0.08)",
        "--shadow-sm":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 1px 2px -1px hsl(0 0% 0% / 0.16)",
        "--shadow":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 1px 2px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-md":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 2px 4px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-lg":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 4px 6px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-xl":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 8px 10px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-2xl": "0px 2px 3px 0px hsl(0 0% 0% / 0.40)",
        "--tracking-normal": "-0.025em",
        "--tracking-tighter": "calc(var(--tracking-normal) - 0.05em)",
        "--tracking-tight": "calc(var(--tracking-normal) - 0.025em)",
        "--tracking-wide": "calc(var(--tracking-normal) + 0.025em)",
        "--tracking-wider": "calc(var(--tracking-normal) + 0.05em)",
        "--tracking-widest": "calc(var(--tracking-normal) + 0.1em)",
        // Zudoku's main.css derives --radius-sm/md/lg/xl from --radius but not
        // --radius-2xl, so without this Frame's rounded-2xl wrapper doesn't
        // track FramePanel's rounded-xl when --radius is bumped above default.
        "--radius-2xl": "calc(var(--radius) + 8px)",
      },
      ".dark": {
        "--background": "oklch(0.2223 0.0060 271.1393)",
        "--foreground": "oklch(0.9551 0 0)",
        "--card": "oklch(0.2568 0.0076 274.6528)",
        "--card-foreground": "oklch(0.9551 0 0)",
        "--popover": "oklch(0.2568 0.0076 274.6528)",
        "--popover-foreground": "oklch(0.9551 0 0)",
        "--primary": "oklch(0.6659 0.2211 304.2111)",
        "--primary-foreground": "oklch(1.0000 0 0)",
        "--secondary": "oklch(0.2940 0.0130 272.9312)",
        "--secondary-foreground": "oklch(0.9551 0 0)",
        "--muted": "oklch(0.2940 0.0130 272.9312)",
        "--muted-foreground": "oklch(0.7058 0 0)",
        "--accent": "oklch(0.2795 0.0368 260.0310)",
        "--accent-foreground": "oklch(0.7857 0.1153 246.6596)",
        "--destructive": "oklch(0.7106 0.1661 22.2162)",
        "--destructive-foreground": "oklch(1.0000 0 0)",
        "--border": "oklch(0.3289 0.0092 268.3843)",
        "--input": "oklch(0.3289 0.0092 268.3843)",
        "--ring": "oklch(0.6132 0.2294 291.7437)",
        "--chart-1": "oklch(0.8003 0.1821 151.7110)",
        "--chart-2": "oklch(0.6132 0.2294 291.7437)",
        "--chart-3": "oklch(0.8077 0.1035 19.5706)",
        "--chart-4": "oklch(0.6691 0.1569 260.1063)",
        "--chart-5": "oklch(0.7058 0 0)",
        "--radius": "1.4rem",
        "--sidebar": "oklch(0.2011 0.0039 286.0396)",
        "--sidebar-foreground": "oklch(0.9551 0 0)",
        "--sidebar-primary": "oklch(0.6132 0.2294 291.7437)",
        "--sidebar-primary-foreground": "oklch(1.0000 0 0)",
        "--sidebar-accent": "oklch(0.2940 0.0130 272.9312)",
        "--sidebar-accent-foreground": "oklch(0.6132 0.2294 291.7437)",
        "--sidebar-border": "oklch(0.3289 0.0092 268.3843)",
        "--sidebar-ring": "oklch(0.6132 0.2294 291.7437)",
        "--font-sans": "Plus Jakarta Sans, sans-serif",
        "--font-serif": "Lora, serif",
        "--font-mono": "IBM Plex Mono, monospace",
        "--shadow-color": "hsl(0 0% 0%)",
        "--shadow-opacity": "0.16",
        "--shadow-blur": "3px",
        "--shadow-spread": "0px",
        "--shadow-offset-x": "0px",
        "--shadow-offset-y": "2px",
        "--letter-spacing": "-0.025em",
        "--spacing": "0.27rem",
        "--shadow-2xs": "0px 2px 3px 0px hsl(0 0% 0% / 0.08)",
        "--shadow-xs": "0px 2px 3px 0px hsl(0 0% 0% / 0.08)",
        "--shadow-sm":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 1px 2px -1px hsl(0 0% 0% / 0.16)",
        "--shadow":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 1px 2px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-md":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 2px 4px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-lg":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 4px 6px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-xl":
          "0px 2px 3px 0px hsl(0 0% 0% / 0.16), 0px 8px 10px -1px hsl(0 0% 0% / 0.16)",
        "--shadow-2xl": "0px 2px 3px 0px hsl(0 0% 0% / 0.40)",
      },
      "@layer base": {
        body: {
          "letter-spacing": "var(--tracking-normal)",
        },
      },
    },
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
          type: "doc",
          label: "Quick Start",
          icon: "rocket",
          file: "quick-start",
        },
        {
          type: "category",
          label: "Introduction",
          icon: "book-marked",
          link: "introduction/overview",
          items: [
            {
              type: "doc",
              label: "Overview",
              icon: "book-open",
              file: "introduction/overview",
            },
            {
              type: "doc",
              label: "Core Concepts",
              icon: "shapes",
              file: "introduction/core-concepts",
            },
            {
              type: "doc",
              label: "Authentication",
              icon: "lock",
              file: "introduction/authentication",
            },
          ],
        },
        {
          type: "category",
          label: "Guides",
          icon: "book-open-text",
          link: "guides/managing-files",
          items: [
            {
              type: "doc",
              label: "Managing Files",
              icon: "file",
              file: "guides/managing-files",
            },
            {
              type: "doc",
              label: "Creating Quotes",
              icon: "receipt",
              file: "guides/creating-quotes",
            },
          ],
        },
        {
          type: "category",
          label: "Troubleshooting",
          icon: "hammer",
          link: "troubleshooting/cors-issues",
          items: [
            {
              type: "doc",
              label: "CORS Errors",
              icon: "lock",
              file: "troubleshooting/cors-issues",
            },
          ],
        },
        {
          type: "link",
          icon: "code",
          badge: {
            label: "new",
            color: "green",
          },
          label: "API Playground",
          to: "/api",
        },
        {
          type: "link",
          icon: "file-text",
          label: "Swagger Docs (Legacy)",
          to: "https://api.cloudslicer3d.com/docs",
          target: "_blank",
        },
      ],
    },
    {
      type: "category",
      label: "API Docs",
      icon: "code",
      items: [
        {
          type: "link",
          icon: "play",
          badge: {
            label: "New",
            color: "indigo",
          },
          label: "API Playground",
          to: "/api",
        },
      ],
    },
  ],
  plugins: [posthogPlugin],
  redirects: [{ from: "/", to: "/introduction/overview" }],
  apis: [
    {
      type: "file",
      input: "./apis/openapi.json",
      path: "/api",
      options: {
        disableSecurity: false,
      },
    },
  ],
  docs: {
    files: "/pages/**/*.{md,mdx}",
    publishMarkdown: true,
    defaultOptions: {
      copyPage: true,
      suggestEdit: {
        url: "https://github.com/Cloud-Slicer/cloud-slicer-docs",
        text: "Edit this page",
      },
    },
  },
  slots: {
    "head-navigation-end": () => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/Cloud-Slicer/cloud-slicer-docs"
            target="_blank"
          >
            <BiLogoGithub className="size-5" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://discord.gg/CVmtSMVmVs" target="_blank">
            <FaDiscord className="size-5" />
          </a>
        </Button>
        <div className="h-8 mr-2 border-l border-[0.5px] border-white-400 dark:border-gray-500" />
        <Button variant="ghost" size="icon" asChild>
          <a href="https://cloudslicer3d.com" target="_blank">
            <FaHome className="size-5" />
          </a>
        </Button>
      </div>
    ),
  },
  metadata: {
    title: "Cloud Slicer Docs",
    description:
      "The official documentation for Cloud Slicer's API and services.  These docs cover everything from getting started to advanced usage of Cloud Slicer's powerful 3D printing software tools.",
    logo: "/logo-light.svg",
    favicon: "/images/favicon.ico",
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
