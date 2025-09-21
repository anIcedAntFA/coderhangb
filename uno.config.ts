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
				custom: {
					circle:
						'<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
				},
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
	rules: [
		['m-1', { margin: '0.25rem' }, { layer: 'utilities' }],
		[
			'bg-white-fade-x',
			{
				'background-image':
					'linear-gradient(90deg, transparent, rgb(255 255 255 / 40%), transparent)',
			},
			{ layer: 'utilities' },
		],
	],
	safelist: [
		// Button component variants and sizes
		() => {
			const variants = ['contained', 'outlined', 'text'];
			const sizes = ['small', 'medium', 'large'];

			return [
				...variants.map((variant) => `btn-${variant}`),
				...sizes.map((size) => `btn-${size}`),
			];
		},
	],
	shortcuts: [
		{
			'btn-base':
				'cursor-pointer select-none relative inline-flex items-center overflow-hidden font-medium uppercase hover:shadow-lg hover:shadow-md focus-visible:shadow-md',
			'btn-contained': [
				'bg-brand-primary text-gray-100 border border-transparent transition-[transform,shadow]',
				'before:(content-[""] absolute top-0 -left-full z-0 w-4/5 h-full bg-white-fade-x pointer-events-none opacity-0 skew-y-45deg transition-opacity)',
				'hover:before:(opacity-100% animate-shiny-glass) focus-visible:before:(opacity-100% animate-shiny-glass)',
				'active:(scale-95)',
			],
			'btn-large': 'h-12 px-6 py-3 text-xl gap-2.5 rounded-lg tracking-wider',
			'btn-medium': 'h-10 px-4 py-2 text-base gap-2 rounded-md tracking-wide',
			'btn-outlined': [
				'bg-transparent text-brand-primary border border-brand-primary transition-[transform,shadow,background-color]',
				'hover:(bg-brand-primary/10) focus-visible:(bg-brand-primary/10)',
				'active:(scale-95)',
			],
			'btn-small': 'h-8 px-3 py-1.5 text-sm gap-1 rounded-sm tracking-normal',
			'btn-text': [
				'bg-transparent text-brand-primary border border-transparent transition-[transform,shadow,background-color]',
				'hover:(bg-brand-primary/5) focus-visible:(bg-brand-primary/5)',
				'active:(scale-95)',
			],
		},
	],
	theme: {
		animation: {
			counts: {
				'shiny-glass': 'infinite',
			},
			durations: {
				'shiny-glass': '1.2s',
			},
			keyframes: {
				'shiny-glass': '{0%{left:-100%}50%{left:120%}100%{left:120%}}',
			},
			properties: {
				'shiny-glass': { 'will-change': 'left' },
			},
			timingFns: {
				'shiny-glass': 'linear',
			},
		},
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
				// primary: '#ec935e',
				// primary: '#5388cd',
				primary: '#00666c',
				secondary: '#f3f4f6',
			},
		},
		default: {
			transition: {
				duration: '200ms',
			},
		},
		font: {},
	} satisfies Theme,
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
