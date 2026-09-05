<p align="center">
  <img src="https://raw.githubusercontent.com/TRC-Loop/Pelton/13f56136136bc00b9c8721dc2042fc9c84e1b3a7/.github/pelton-large-bg.png" alt="Pelton Banner">
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/peltonapp/Pelton-Website?style=for-the-badge&color=blue" alt="License: GPL-3.0">
  </a>
  <img src="https://img.shields.io/badge/Astro-6-BC52EE?style=for-the-badge&logo=astro&logoColor=white" alt="Built with Astro">
  <a href="https://pelton.app/discord">
    <img src="https://img.shields.io/badge/Discord-Join_Community-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
  <a href="https://github.com/peltonapp/Pelton-Website/actions/workflows/checks.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/peltonapp/Pelton-Website/checks.yml?style=for-the-badge&label=checks" alt="Checks">
  </a>
</p>

<h3 align="center">The source for pelton.app, the marketing site for Pelton.</h3>

<p align="center">
  <a href="https://pelton.app/discord">
    <img src="https://discord.com/api/guilds/1535688892689162260/widget.png?style=banner2" alt="Discord Banner">
  </a>
</p>

***

## About

This repository builds [pelton.app](https://pelton.app): the download page, feature tour, changelog,
privacy and legal pages, and the design system reference for the [Pelton](https://github.com/TRC-Loop/Pelton)
email client. It is a static [Astro](https://astro.build) site with a couple of [Svelte](https://svelte.dev)
islands for the interactive bits (the Cmd+K demo, the theme scroller), deployed to Cloudflare Workers.

It carries no telemetry or analytics of its own, in keeping with Pelton itself.

## Stack

- **[Astro](https://astro.build)**, static output, no server runtime
- **[Svelte 5](https://svelte.dev)**, for the two components that need client-side state
- **Plain CSS**, custom properties for theming, no framework
- **[Cloudflare Workers](https://developers.cloudflare.com/workers/)**, static asset hosting, via `wrangler.jsonc`

## Development

Requires Node 22.12+ and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev
```

Other scripts:

```sh
pnpm astro check   # type check
pnpm build          # static build to dist/
pnpm preview        # serve the built output locally
```

## Deployment

Pushing to `main` builds with `pnpm build` and deploys `dist/` to Cloudflare Workers via
`npx wrangler deploy` (see `wrangler.jsonc`). `.github/workflows/checks.yml` runs the type
check and build on every pull request so a break is caught before it reaches production.

## Structure

- `src/pages/`: one file per route
- `src/components/`: shared `.astro` components and the two `.svelte` islands
- `src/data/site.js`: copy and external links used across pages, kept in one place
- `src/styles/`: tokens, reset, layout and component CSS, plain files rather than a preprocessor

## Contributing

Issues and pull requests are welcome, same as the client. Content changes (copy, links, legal
pages) matter as much as code here, so open an issue if something on the site is wrong or out of
date.

## License

Licensed under **[GPL-3.0](LICENSE)**, matching the [Pelton client](https://github.com/TRC-Loop/Pelton).

Security issues belong in a private report, not a public issue. See
[security.txt](public/.well-known/security.txt).
