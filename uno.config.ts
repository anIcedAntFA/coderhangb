// import { createRemToPxProcessor } from '@unocss/preset-wind4/utils';
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWind4,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	layers: {
		'components': -1,
		'default': 1,
		'my-layer': 3,
		'utilities': 2,
	},
	presets: [
		presetWind4({
			arbitraryVariants: true,
			dark: {
				dark: '[data-theme="dark"]',
				light: '[data-theme="light"]',
			},
			preflights: {
				reset: true,
				theme: {
					mode: 'on-demand',
					// process: [createRemToPxProcessor()],
				},
			},
		}),
		presetAttributify(),
		presetIcons({
			collections: {
				carbon: () =>
					import('@iconify-json/carbon/icons.json').then(i => i.default),
				logos: () =>
					import('@iconify-json/logos/icons.json').then(
						// biome-ignore lint/suspicious/noExplicitAny: <no need>
						i => i.default as any,
					),
				mdi: () =>
					import('@iconify-json/mdi/icons.json').then(i => i.default),
			},
			extraProperties: {
				display: 'inline-block',
			},
			layer: 'icons',
			prefix: 'i-',
			scale: 1.25,
			unit: 'em',
			warn: true,
		}),
		presetTypography({
			// cssExtend: theme => ({
			// 	h1: {
			// 		'font-size': 'clamp(2rem, 0.6364rem + 4.5455vw, 3rem)',
			// 		'line-height': '1.2',
			// 		'color': theme.colors?.brand?.primary,
			// 	},
			// }),
		}),
	],
	rules: [['m-1', { margin: '0.25rem' }]],
	shortcuts: [
		// Custom semantic tokens for background
		{
			'bg': 'bg-white dark:bg-black',
			'bg-emphasized': 'bg-gray-200 dark:bg-gray-800',
			'bg-error': 'bg-red-50 dark:bg-red-950',
			'bg-info': 'bg-blue-50 dark:bg-blue-950',
			'bg-inverted': 'bg-black dark:bg-white',
			'bg-muted': 'bg-gray-100 dark:bg-gray-900',
			'bg-panel': 'bg-white dark:bg-gray-950',
			'bg-subtle': 'bg-gray-50 dark:bg-gray-950',
			'bg-success': 'bg-green-50 dark:bg-green-950',
			'bg-warning': 'bg-yellow-50 dark:bg-yellow-950',
		},
		// Custom semantic tokens for border
		{
			'border': 'border-gray-200 dark:border-gray-800',
			'border-emphasized': 'border-gray-300 dark:border-gray-700',
			'border-error': 'border-red-500 dark:border-red-400',
			'border-info': 'border-blue-500 dark:border-blue-400',
			'border-inverted': 'border-gray-800 dark:border-gray-200',
			'border-muted': 'border-gray-100 dark:border-gray-900',
			'border-subtle': 'border-gray-50 dark:border-gray-950',
			'border-success': 'border-green-500 dark:border-green-400',
			'border-warning': 'border-yellow-500 dark:border-yellow-400',
		},
		// Custom semantic tokens for foreground
		{
			'fg': 'text-black dark:text-gray-50',
			'fg-emphasized': 'text-gray-800 dark:text-gray-200',
			'fg-error': 'text-red-700 dark:text-red-300',
			'fg-info': 'text-blue-700 dark:text-blue-300',
			'fg-inverted': 'text-gray-50 dark:text-black',
			'fg-muted': 'text-gray-600 dark:text-gray-400',
			'fg-subtle': 'text-gray-400 dark:text-gray-500',
			'fg-success': 'text-green-700 dark:text-green-300',
			'fg-warning': 'text-yellow-700 dark:text-yellow-300',
		},
		// Custom font sizes with compatible line-heights
		{
			'text-clamp-2xl':
				'text-[clamp(2rem,0.6364rem+4.5455vw,3rem)] leading-[clamp(2.4rem,0.7636rem+5.4545vw,3.6rem)]',
			'text-clamp-base':
				'text-[clamp(1rem,0.6591rem+1.1364vw,1.25rem)] leading-[clamp(1.5rem,0.9886rem+1.7045vw,1.875rem)]',
			'text-clamp-lg':
				'text-[clamp(1.25rem,0.4167rem+2.7778vw,1.75rem)] leading-[clamp(2rem,0.6667rem+4.4444vw,2.8rem)]',
			'text-clamp-md':
				'text-[clamp(1.125rem,0.5rem+2.0833vw,1.5rem)] leading-[clamp(1.688rem,0.75rem+3.125vw,2.25rem)]',
			'text-clamp-sm':
				'text-[clamp(0.875rem,0.7045rem+0.5682vw,1rem)] leading-[clamp(1.094rem,0.8806rem+0.7102vw,1.25rem)]',
			'text-clamp-xl':
				'text-[clamp(1.5rem,0.8182rem+2.2727vw,2rem)] leading-[clamp(2.4rem,1.3091rem+3.6364vw,3.2rem)]',
			'text-clamp-xs':
				'text-[clamp(0.75rem,0.5795rem+0.5682vw,0.875rem)] leading-[clamp(0.9rem,0.6954rem+0.6818vw,1.05rem)]',
		},
		{
			'text-clamp-content': 'text-[clamp(1rem,0.9063rem+0.4167vw,1.125rem)]',
		},
		{
			'heading-1': 'text-clamp-2xl font-bold',
			'heading-2': 'text-clamp-xl font-bold',
			'heading-3': 'text-clamp-lg font-bold',
			'heading-4': 'text-clamp-md font-semibold',
			'heading-5': 'text-clamp-base font-semibold',
		},
		{
			'flex-center': 'flex justify-center items-center',
			'grid-center': 'grid place-items-center',
		},
		{
			btn: 'cursor-pointer select-none',
		},
	],
	theme: {
		colors: {
			bg: {
				DEFAULT: 'white',
				subtle: 'gray-50',
			},
			brand: {
				DEFAULT: '#942192',
				primary: 'hsl(var(--hue, 217) 78% 51%)',
			},
		},
		font: {
			'clamp-2xl': [
				'clamp(2rem, 0.6364rem + 4.5455vw, 3rem)',
				'clamp(2.4rem,0.7636rem+5.4545vw,3.6rem)',
			],
			'clamp-base': [
				'clamp(1rem,0.6591rem+1.1364vw,1.25rem)',
				'clamp(1.5rem,0.9886rem+1.7045vw,1.875rem)',
			],
			'clamp-lg': [
				'clamp(1.25rem,0.4167rem+2.7778vw,1.75rem)',
				'clamp(2rem,0.6667rem+4.4444vw,2.8rem)',
			],
			'clamp-md': [
				'clamp(1.125rem,0.5rem+2.0833vw,1.5rem)',
				'clamp(1.688rem,0.75rem+3.125vw,2.25rem)',
			],
			'clamp-sm': [
				'clamp(0.875rem,0.7045rem+0.5682vw,1rem)',
				'clamp(1.094rem,0.8806rem+0.7102vw,1.25rem)',
			],
			'clamp-xl': [
				'clamp(1.5rem,0.8182rem+2.2727vw,2rem)',
				'clamp(2.4rem,1.3091rem+3.6364vw,3.2rem)',
			],
			'clamp-xs': [
				'clamp(0.75rem, 0.5795rem+0.5682vw, 0.875rem)',
				'clamp(0.9rem,0.6954rem+0.6818vw,1.05rem)',
			],
		},
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
