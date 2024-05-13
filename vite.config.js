import { defineConfig } from 'vite';
import MyViteAliases from './plugins/ViteAliases';

export default defineConfig({
	plugins: [
		MyViteAliases({
			keyName: '&',
		}),
	],
});
