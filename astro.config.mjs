import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'

export default defineConfig({
  site: 'https://pelton.app',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: { enabled: false },
  redirects: {
    '/2026-4': 'https://github.com/TRC-Loop/Pelton/releases/tag/v2026.4',
    '/discord': 'https://discord.gg/UzPNGZYy6V',
    '/github': 'https://github.com/TRC-Loop/Pelton',
    '/AGENTS.md': '/llms.txt',
  },
  integrations: [
    svelte(),
    sitemap({
      filter: (page) =>
        !page.includes('/imprint') &&
        !page.includes('/privacy') &&
        !page.includes('/terms') &&
        !page.includes('/thanks') &&
        !page.includes('/2026-4') &&
        !page.includes('/discord') &&
        !page.includes('/github'),
    }),
  ],
})
