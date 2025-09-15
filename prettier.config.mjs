/** @type {import("prettier").Config} */
export default {
	arrowParens: 'always',
	endOfLine: 'lf',
	jsxSingleQuote: true,
	overrides: [
		{
			files: ['.*', '*.md', '*.toml', '*.yml'],
			options: {
				useTabs: false,
			},
		},
		{
			files: ['**/*.astro'],
			options: {
				parser: 'astro',
			},
		},
	],
	plugins: ['prettier-plugin-astro'],
	printWidth: 80,
	semi: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
};
