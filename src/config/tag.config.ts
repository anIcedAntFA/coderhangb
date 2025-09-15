export const TAG_VARIANT = [
	'javascript',
	'css',
	'typescript',
	'testing',
	'reactjs',
	'astro',
	'vuejs',
	'cloudflare',
	'git',
	'linux',
	'coding',
] as const;

export type TagVariant = (typeof TAG_VARIANT)[number];

export const TAG_CONFIG: Record<
	TagVariant,
	{ label: string; colorVar: string }
> = {
	javascript: { label: 'javascript', colorVar: 'var(--clr-javascript)' },
	css: { label: 'css', colorVar: 'var(--clr-css)' },
	typescript: { label: 'typescript', colorVar: 'var(--clr-typescript)' },
	testing: { label: 'testing', colorVar: 'var(--clr-testing)' },
	reactjs: { label: 'react.js', colorVar: 'var(--clr-reactjs)' },
	astro: { label: 'astro', colorVar: 'var(--clr-astro)' },
	vuejs: { label: 'vue.js', colorVar: 'var(--clr-vuejs)' },
	cloudflare: { label: 'cloudflare', colorVar: 'var(--clr-cloudflare)' },
	git: { label: 'git', colorVar: 'var(--clr-github)' },
	linux: { label: 'linux', colorVar: 'var(--clr-linux)' },
	coding: { label: 'coding', colorVar: 'var(--clr-coding)' },
};
