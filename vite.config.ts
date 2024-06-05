// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    test: { environment: "jsdom", setupFiles: "./tests/setup.js" },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  if (command === "serve") {
    const devConfig = {
      server: {
        host: true,
        port: 3000,
        https: {
          key: fs.readFileSync("./localhost-key.pem"),
          cert: fs.readFileSync("./localhost.pem"),
        },
      },
    };
    Object.assign(config, devConfig);
  }

  return config;
});
