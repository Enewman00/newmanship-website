import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://newmanship.com',
  // GitHub Pages has no server redirects; Astro emits a meta-refresh page
  // with a canonical link, which Google treats as a permanent redirect.
  redirects: {
    '/sprout-alarm': '/sproutawake/',
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  image: {
    domains: [],
  },
});
