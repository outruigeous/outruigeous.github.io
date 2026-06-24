// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import { unified } from '@astrojs/markdown-remark';

// Tags markdown images sourced from a .png file with a class, so CSS can target
// them specifically — Astro's image pipeline rewrites src to a hashed .webp
// before render, so the original extension isn't otherwise recoverable in HTML.
function remarkPngClass() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'image' && /\.png(?:[?#]|$)/i.test(node.url)) {
        node.data = node.data || {};
        node.data.hProperties = { ...(node.data.hProperties || {}), class: 'png-bg' };
      }
      if (node.children) node.children.forEach(visit);
    }
    visit(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://outruigeous.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [svelte()],

  markdown: {
    processor: unified({ remarkPlugins: [remarkPngClass] })
  }
});