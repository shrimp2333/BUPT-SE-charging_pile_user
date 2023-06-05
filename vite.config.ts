import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// const baseURL: string = 'http://10.128.201.42:5000'
// const baseURL: string = 'http://43.138.43.19:8080'
// const baseURL: string = 'http://127.0.0.1:9321'
// const baseURL: string = 'http://10.128.201.42:5000'
// const baseURL: string = 'http://10.128.141.30:5000'
// const baseWSURL: string = "10.128.155.13:8080"
// const baseURL: string = 'http://10.28.220.241:5000'
// const baseURL: string = "http://10.128.233.152:5000"
const baseURL: string = "http://116.204.86.135:8080"
// const baseURL: string = "http://10.128.210.151:5000"


export default defineConfig({
	server: {
		// 跨域的写法
		proxy: {
			'/u': {
				target: baseURL, // 实际请求地址
				changeOrigin: true,
				rewrite: (path) => path.replace("^/u", ""),
			},
			'/user': {
				target: baseURL, // 实际请求地址
				changeOrigin: true,
				rewrite: (path) => path.replace("^/user", ""),
			},
		},
	},
	base: './',
	plugins: [
		vue(),
		VueSetupExtend(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	optimizeDeps: {
		include: ['schart.js']
	}
});
