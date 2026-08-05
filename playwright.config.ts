import { defineConfig } from '@playwright/test';

export default defineConfig({
	timeout: 60000,
	expect: {
		timeout: 10000
	},
	use: {
		launchOptions: {
			args: [
				'--use-gl=angle',
				'--use-angle=swiftshader',
				'--enable-unsafe-swiftshader',
				'--disable-gpu-sandbox',
				'--no-sandbox'
			]
		}
	},
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	},
	testMatch: '**/*.e2e.{ts,js}'
});
