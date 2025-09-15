import unocss from '@unocss/eslint-config/flat';
import eslintPluginPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.Config[]} */
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
			'.astro',
		],
	},
	// linting for astro
	...eslintPluginAstro.configs.recommended,

	// accessibility linting
	...eslintPluginAstro.configs['jsx-a11y-recommended'],

	// Adds prettier rules to eslint so we will get eslint errors if
	// formatting is off. if these rules conflict with something else
	// you should use eslint-config-prettier instead to disable all
	// rules that might conflict with prettier
	eslintPluginPrettier,

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
