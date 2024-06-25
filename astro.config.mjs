import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://shinsina.github.io",
  base: "/Ausick",
  integrations: [tailwind()],
  prefetch: { defaultStrategy: 'viewport', prefetchAll: true }
});
