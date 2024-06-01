import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://www.nexxel.dev",
  integrations: [tailwind(), svelte(), mdx(), solidJs(), vue()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
});
