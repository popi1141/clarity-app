# Clarity (Next.js)

This repository contains the Clarity application refactored to run on [Next.js](https://nextjs.org/). The legacy single-page experience from Create React App is preserved, but it is now hosted by Next.js pages so the project can be deployed seamlessly on [Vercel](https://vercel.com/).

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app is served from `http://localhost:3000`. All routes are handled client-side by the legacy router just like before.

## Building for production

Create an optimized production build that Vercel can deploy:

```bash
npm run build
```

Then run the production server locally if desired:

```bash
npm start
```

## Deploying on Vercel

1. Install the [Vercel CLI](https://vercel.com/docs/cli) and authenticate: `npm i -g vercel` and `vercel login`.
2. Run `vercel` from the project root. The CLI detects Next.js automatically and configures the deployment.
3. Subsequent deploys can use `vercel --prod` once you are satisfied with the preview.

Alternatively, connect the repository to Vercel through the dashboard. Vercel will run `npm install`, `npm run build`, and host the generated Next.js output without further configuration.
