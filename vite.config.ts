import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const proxyTarget = env.VITE_PROXY_TARGET;

  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }]
    },

    server: {
      host: true,
      historyApiFallback: true,
      proxy: {
        "/weather": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/weather/, "/api/weather")
        },
        "/shelter": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/shelter/, "/api/shelter")
        },
        "/route": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/route/, "/api/route")
        }
      }
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "react-icons": [
              "react-icons/fa",
              "react-icons/md",
              "react-icons/ri",
              "react-icons/io5",
              "react-icons/ai"
            ],
            "google-maps": ["@react-google-maps/api"],
            "query-form": [
              "@tanstack/react-query",
              "react-hook-form",
              "@hookform/resolvers",
              "zod"
            ],
            utils: ["axios", "zustand"]
          }
        }
      },
      chunkSizeWarningLimit: 1000
    }
  };
});
