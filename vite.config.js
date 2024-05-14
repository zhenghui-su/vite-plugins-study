import { defineConfig } from 'vite';
import VitePluginMock from './plugins/VitePluginMock';
export default defineConfig({
	plugins: [VitePluginMock()],
});
