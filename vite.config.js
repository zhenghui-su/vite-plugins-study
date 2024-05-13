import { defineConfig } from 'vite';
// import { createHtmlPlugin } from 'vite-plugin-html';
import CreateHtmlPlugin from './plugins/CreateHtmlPlugin';
export default defineConfig({
	plugins: [
		CreateHtmlPlugin({
			inject: {
				data: {
					title: '主页',
				},
			},
		}),
	],
});
