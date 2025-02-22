// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMermaid from 'remark-mermaidjs'
import remarkMath from 'remark-math';
import rehypeMathJax from 'rehype-mathjax';

// https://astro.build/config
export default defineConfig({
	site: 'https://luckkrit.github.io',
	base: '/cos3105',
	markdown: {
		// Applied to .md and .mdx files
		remarkPlugins: [remarkMermaid, remarkMath],
		rehypePlugins: [rehypeMathJax],
	},
	integrations: [
		starlight({
			title: 'COS3105',
			social: {
				// github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		// Each item here is one entry in the navigation menu.
				// 		{ label: 'Example Guide', slug: 'guides/example' },
				// 	],
				// },
				// {
				// 	label: 'Reference',
				// 	autogenerate: { directory: 'reference' },
				// },
				{
					label: 'Labs',
					autogenerate: { directory: 'labs' },
				},
			],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/kbd.css',
				'./src/styles/mathjax.css',
			],
		}),
	],
});
