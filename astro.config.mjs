import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://shinsina.github.io",
  base: "/Ausick",
  integrations: [image(), tailwind(), prefetch()]
});
