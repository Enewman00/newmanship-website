import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: 'https://newmanship.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    partytown({
      config: {
        forward: ['plausible'],
      },
    }),
  ],
  image: {
    domains: [],
  },
});
