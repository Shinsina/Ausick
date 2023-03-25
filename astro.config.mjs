import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://shinsina.github.io",
  base: "/Ausick",
  integrations: [tailwind(), svelte(), prefetch()]
});
