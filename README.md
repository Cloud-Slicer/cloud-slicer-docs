# Cloud Slicer Documentation

Official documentation site for the [Cloud Slicer API](https://api.cloudslicer3d.com), built with [Zudoku](https://zudoku.dev/docs).

## Overview

This documentation provides comprehensive guides and API references for integrating Cloud Slicer's 3D printing capabilities into your applications. Whether you're building automated pricing systems, print management tools, or custom 3D printing workflows, you'll find everything you need here.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the documentation site.

You can start editing documentation by modifying files in the `pages/` directory. The site will automatically update as you save files.

## Project Structure

```
├── apis/
│   └── openapi.json          # OpenAPI specification for the Cloud Slicer API
├── pages/
│   ├── quick-start.mdx       # Quickstart guide
│   └── introduction/         # Introduction section
│       ├── overview.mdx
│       ├── core-concepts.mdx
│       └── authentication.mdx
├── public/
│   ├── images/               # Documentation images
│   ├── logo-light.svg        # Light theme logo
│   ├── logo-dark.svg         # Dark theme logo
│   └── banner-dark.svg       # Banner images
├── zudoku.config.tsx         # Zudoku configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the documentation for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Deployment

This project is configured to deploy automatically to GitHub Pages when changes are pushed to the `main` branch. The deployment workflow is defined in [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml).

The live documentation is available at: [docs.cloudslicer3d.com](https://docs.cloudslicer3d.com)

## Contributing

We welcome contributions to improve the documentation! If you find errors, unclear explanations, or missing information:

1. Open an issue on [GitHub](https://github.com/Cloud-Slicer/cloud-slicer-docs/issues)
2. Submit a pull request with your improvements
3. Join our [Discord community](https://discord.gg/CVmtSMVmVs) to discuss changes

## Key Features

- **Interactive API Playground** - Test API endpoints directly in the browser
- **Comprehensive Guides** - Step-by-step tutorials for common workflows
- **OpenAPI Integration** - Auto-generated API reference from OpenAPI specification
- **Search Functionality** - Powered by Pagefind for fast, client-side search
- **Dark Mode Support** - Automatic theme switching
- **Analytics** - PostHog integration for usage tracking

## Learn More

- [Cloud Slicer API](https://api.cloudslicer3d.com/docs) - API playground and interactive documentation
- [Cloud Slicer Website](https://www.cloudslicer3d.com) - Main product website
- [Zudoku Documentation](https://zudoku.dev/docs) - Learn about the documentation framework
- [GitHub Discussions](https://github.com/zuplo/zudoku/discussions) - Zudoku community support
- [Discord](https://discord.gg/CVmtSMVmVs) - Join the Cloud Slicer community

## License

This documentation is maintained by the Cloud Slicer team.

---

**Note:** The Cloud Slicer API is currently in beta. Documentation and features are subject to change as we continue development.
