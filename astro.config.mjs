// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://luckkrit.github.io',
	base: '/cos3105',
	integrations: [
		starlight({
			title: 'COS3105',
			social: [
			],
			sidebar: [
				{
					label: 'Labs',
					items: [{ autogenerate: { directory: 'labs' } }],
				},
			],
		}),
	],
});
