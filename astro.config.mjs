import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import { defineConfig, sharpImageService } from 'astro/config';
import UnoCSS from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://coderhangb.ngockhoi96.dev',
	integrations: [
		UnoCSS({
			injectReset: false,
			configFile: './uno.config.ts',
		}),
		mdx(),
		sitemap(),
		vue({
			appEntrypoint: '/src/pages/_app.ts',
		}),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
			configPath: './wrangler.jsonc',
		},
		imageService: 'compile',
	}),
	output: 'static',
	srcDir: 'src',
	server: ({ command }) => ({
		port: command === 'dev' ? 3333 : 4444,
		host: true,
	}),
	prefetch: {
		defaultStrategy: 'hover',
		prefetchAll: true,
	},
	image: {
		domains: ['assets.ngockhoi96.dev'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'assets.ngockhoi96.dev',
			},
		],
		layout: 'constrained',
		objectFit: 'cover',
		objectPosition: 'center',
		service: sharpImageService(),
	},
	markdown: {
		syntaxHighlight: 'shiki',
		shikiConfig: {
			themes: {
				light: 'min-light',
				dark: 'dracula',
			},
		},
	},
	vite: {
		resolve: {
			alias: {
				'@': '/src',
			},
		},
		build: {
			outDir: 'dist',
			sourcemap: true,
			target: 'esnext',
			minify: 'esbuild',
			cssCodeSplit: true,
			cssMinify: 'esbuild',
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

							if (id.includes('@vue'))
								return 'vue';
						}
					},
				},
			},
		},

	},
});
