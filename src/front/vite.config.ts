import {defineConfig} from 'vite'
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        proxy: {
            "/api": {
                target: "https://localhost.testkontur.ru:9002",
                changeOrigin: false,
                secure: false,
                headers: {
                    "X-Forwarded-For": "http://localhost:3000",
                },
            }
        },
        https: false,
    },
    define: {
        global: "window",
    },
})
