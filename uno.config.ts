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
import type { Theme } from 'unocss/preset-wind4';

export default defineConfig({
	layers: {
		components: -1,
		default: 1,
		'my-layer': 3,
		utilities: 2,
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
		presetAttributify({
			prefix: 'u-',
			prefixedOnly: true,
			strict: true,
		}),
		presetIcons({
			collections: {
				carbon: () =>
					import('@iconify-json/carbon/icons.json').then((i) => i.default),
				logos: () =>
					import('@iconify-json/logos/icons.json').then(
						// biome-ignore lint/suspicious/noExplicitAny: <no need>
						(i) => i.default as any,
					),
				mdi: () =>
					import('@iconify-json/mdi/icons.json').then((i) => i.default),
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
	rules: [['m-1', { margin: '0.25rem' }, { layer: 'utilities' }]],
	shortcuts: [
		{
			'flex-center': 'flex justify-center items-center',
			'grid-center': 'grid place-items-center',
		},
		{
			btn: 'cursor-pointer select-none',
		},
	],
	theme: {
		breakpoint: {
			'2xl': '1536px',
			lg: '1024px',
			md: '768px',
			sm: '640px',
			xl: '1280px',
			xs: '480px',
		},
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
		font: {},
	} satisfies Theme,
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
