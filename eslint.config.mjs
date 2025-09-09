import antfu from '@antfu/eslint-config';

export default antfu({
	astro: true,
	formatters: {
		astro: true,
		svg: true,
	},
	ignores: [
		'dist',
		'node_modules',
		'scripts',
		'plugins',
		'*.gen.*',
		'worker-configuration.d.ts',
	],
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: true,
		singleQuote: true,
		trailingComma: 'all',
	},
	vue: true,
});
