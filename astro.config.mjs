import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import qwikdev from '@qwikdev/astro';
import { defineConfig, sharpImageService } from 'astro/config';
import { FontaineTransform } from 'fontaine';
import UnoCSS from 'unocss/astro';

const options = {
	// You can specify fallbacks as an array (applies to all fonts)
	fallbacks: [
		'BlinkMacSystemFont',
		'Segoe UI',
		'Helvetica Neue',
		'Arial',
		'Noto Sans',
	],

	// Or as an object to configure specific fallbacks per font family
	// fallbacks: {
	//   Poppins: ['Helvetica Neue'],
	//   'JetBrains Mono': ['Courier New']
	// },

	// You may need to resolve assets like `/fonts/Roboto.woff2` to a particular directory
	resolvePath: (id) => `file:///path/to/public/dir${id}`,
	// overrideName: (originalName) => `${name} override`
	// sourcemap: false
	// skipFontFaceGeneration: (fallbackName) => fallbackName === 'Roboto override'
};

// https://astro.build/config
export default defineConfig({
	adapter: cloudflare({
		imageService: 'compile',
		platformProxy: {
			configPath: './wrangler.jsonc',
			enabled: true,
		},
	}),
	image: {
		domains: ['assets.ngockhoi96.dev'],
		layout: 'constrained',
		objectFit: 'cover',
		objectPosition: 'center',
		remotePatterns: [
			{
				hostname: 'assets.ngockhoi96.dev',
				protocol: 'https',
			},
		],
		service: sharpImageService(),
	},
	integrations: [
		UnoCSS({
			configFile: './uno.config.ts',
			injectReset: false,
		}),
		qwikdev(),
		mdx(),
		sitemap(),
		vue({
			appEntrypoint: '/src/pages/_app.ts',
		}),
	],
	markdown: {
		shikiConfig: {
			themes: {
				dark: 'dracula',
				light: 'min-light',
			},
		},
		syntaxHighlight: 'shiki',
	},
	output: 'static',
	prefetch: {
		defaultStrategy: 'hover',
		prefetchAll: true,
	},
	server: ({ command }) => ({
		host: true,
		port: command === 'dev' ? 3333 : 4444,
	}),
	site: 'https://coderhangb.ngockhoi96.dev',
	srcDir: 'src',
	vite: {
		build: {
			cssCodeSplit: true,
			cssMinify: 'esbuild',
			minify: 'esbuild',
			outDir: 'dist',
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('node_modules')) {
							const packageName = id.split('node_modules/')[1].split('/')[0];

							const knownEmptyPackages = ['vue'];

							// Avoid creating chunks for known empty packages
							if (knownEmptyPackages.includes(packageName)) {
								return;
							}

							if (id.includes('@vue')) return 'vue';
						}
					},
				},
			},
			sourcemap: true,
			target: 'esnext',
		},
		plugins: [FontaineTransform.vite(options)],
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	},
});
