import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import eslint from 'vite-plugin-eslint';
import globals from './globals';
import dns from 'dns';
import react from '@vitejs/plugin-react';
import { HASH, PORT, IMAGE_EXTENSIONS, ALIASES } from './vite.constants';

dns.setDefaultResultOrder('verbatim');

const compileAsset = (assetInfo: { name?: string }): string => {
	if (assetInfo.name?.endsWith('.js')) {
		return '[name].js';
	} else if (assetInfo.name?.endsWith('.css')) {
		return `[name].${HASH}.css`;
	} else if (IMAGE_EXTENSIONS.some(ext => assetInfo.name?.endsWith(ext))) {
		return `images/[name].[ext]`;
	} else {
		return `[name].[ext]`;
	}
};

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				entryFileNames: `[name].bundle.${HASH}.js`,
				chunkFileNames: `[name].chunk.bundle.${HASH}.js`,
				assetFileNames: assetInfo => compileAsset(assetInfo),
				dir: 'dist',
			},
		},

		sourcemap: process.env.NODE_ENV !== 'production',
		minify: process.env.NODE_ENV === 'production',
	},
	server: {
		port: PORT,
		open: false,
	},
	resolve: {
		alias: ALIASES,
	},
	define: {
		...globals,
	},
	plugins: [
		react(),
		nodePolyfills({
			protocolImports: true,
		}),
		eslint({
			include: ['src/**/*.ts', 'src/**/*.tsx'],
			exclude: ['node_modules/**', 'dist/**'],
		}),
	],
});
