import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Per-URL priority so commercial pages outweigh legal/utility ones.
const PRIORITY = {
  '/': 1.0,
  '/beauty': 0.9,
  '/horse': 0.9,
  '/pricing': 0.9,
  '/platform': 0.8,
  '/features': 0.8,
  '/about': 0.7,
  '/contact': 0.7,
  '/write': 0.5,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/cookies': 0.3,
};

// https://astro.build/config
export default defineConfig({
  site: 'https://zapys24.com',
  server: { port: 4599 },
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/(.+)\/$/, '$1') || '/';
        item.priority = PRIORITY[path] ?? 0.6;
        item.changefreq = 'weekly';
        // No lastmod on purpose — a real value is added only when content
        // actually changes, never a blanket "today" for every URL.
        return item;
      },
    }),
  ],
});
