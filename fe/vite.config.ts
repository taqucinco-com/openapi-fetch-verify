import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
        proxy: {
            '/sample': {
                // target: "http://example.com",
                target: "http://127.0.0.1:3030",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/sample/, '')
            }
        }
    }
});
