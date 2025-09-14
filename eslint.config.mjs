import unocss from '@unocss/eslint-config/flat';
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	{
		ignores: [
			// Ignore the following files and directories
			'node_modules',
			'dist',
			'public',
			'astro.config.mjs',
			'eslint.config.mjs',
			'vite.config.js',
			'.wrangler',
		],
	},
	// add more generic rule sets here, such as:
	// js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	{
		rules: {
			// override/add rules settings here, such as:
			// "astro/no-set-html-directive": "error"
		},
	},
	// UnoCSS configuration
	unocss,
	// Make UnoCSS warnings into errors
	{
		files: ['**/*.{astro,vue}'],
		rules: {
			'unocss/order': 'error',
			'unocss/order-attributify': 'error',
		},
	},
];
