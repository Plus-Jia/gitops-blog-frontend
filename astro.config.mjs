// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
	integrations: [react(), mdx(), !isProduction && keystatic()].filter(Boolean),
});
