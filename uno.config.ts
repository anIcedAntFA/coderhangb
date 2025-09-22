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
		[
			'bg-gradient-subtle',
			{
				'background-image': 'linear-gradient(140deg, #f3fdf7 0%, #edfdfa 80%)',
			},
		],
		['btt-btn-size', { '--btt-btn-size': '3rem' }],
		[
			'bg-progress-conic',
			{
				'background-image': `conic-gradient(
					var(--clr-primary, #00666c),
					var(--clr-primary, #00666c) var(--btt-scroll-percent, 0%),
					transparent var(--btt-scroll-percent, 0%)
				)`,
			},
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
		// {
		// 	'btt-btn': [
		// 		'group relative inline-flex h-[--btt-btn-size] cursor-pointer items-center gap-2 rounded-md border border-gray-700/10 bg-gray-50/50 px-3 font-medium text-gray-700 shadow-lg backdrop-blur-xs transition-[border-color,background-color,color]',
		// 		'before:(content-empty -z-1 op-0 absolute inset-0 bg-gradient-subtle) transition-opacity',
		// 		'hover:(text-brand-primary before:op-100) border-transparent',
		// 	],
		// 	'btt-btn-wrapper': [
		// 		'op-0 btt-btn-size pointer-events-none sticky bottom-[--btt-btn-size] left-full z-50 mr-[--btt-btn-size] mb-[--btt-btn-size] max-w-160px translate-y-[--btt-btn-size] transition-[opacity,transform]',
		// 		'max-md:(w-[--btt-btn-size] h-[--btt-btn-size] overflow-visible)',
		// 	],
		// },
	],
	theme: {
		animation: {
			counts: {
				'icon-cycle-up': '1',
				'shiny-glass': 'infinite',
			},
			durations: {
				'icon-cycle-up': '0.8s',
				'shiny-glass': '1.2s',
			},
			keyframes: {
				'icon-cycle-up': `{
					0% { opacity: 1; transform: translateY(0); }
					30% { opacity: 0.5; transform: translateY(-100%); }
					40% { opacity: 0; transform: translateY(-100%); }
					50% { opacity: 0; transform: translateY(100%); }
					80% { opacity: 0.5; transform: translateY(-50%); }
					100% { opacity: 1; transform: translateY(0); }
				}`,
				'shiny-glass': `{
          0% { left: -100% }
          50% { left: 120% }
          100% { left: 120% }
        }`,
			},
			properties: {
				'icon-cycle-up': { 'will-change': 'opacity, transform' },
				'shiny-glass': { 'will-change': 'left' },
			},
			timingFns: {
				'icon-cycle-up': 'ease-in-out',
				'shiny-glass': 'linear',
			},
		},
		blur: {
			'2xs': '2px',
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
		spacing: {
			'btt-btn': '3rem', // 48px
			'btt-btn-size': '3rem', // 48px
		},
	} satisfies Theme,
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
