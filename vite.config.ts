import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    base: "/dev-game/",
    plugins: [react(), svgr()],
    build: {
        outDir: 'build',
    },
    publicDir: 'public',
    server: {
        port: 43210,
        host: '0.0.0.0',
        open: '/dev-game/',
    }
});
