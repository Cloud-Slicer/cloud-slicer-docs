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
    registryUrl: "https://tweakcn.com/r/themes/cmiiaqs7p000f04l75mnnd0dz",
    fonts: {
      sans: "Inter",
      serif: "Merriweather",
      mono: "JetBrains Mono",
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
          type: "link",
          label: "Quick Start",
          icon: "rocket",
          to: "/quick-start",
        },
        {
          type: "category",
          label: "Introduction",
          icon: "book-marked",
          link: "/introduction/overview",
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
  plugins: [posthogPlugin],
  redirects: [{ from: "/", to: "/introduction/overview" }],
  apis: [
    {
      type: "file",
      input: "./apis/openapi.json",
      path: "/api",
    },
  ],
  docs: {
    defaultOptions: {
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
