import { fileURLToPath, URL } from "node:url";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  server: {
    https: true,
    host: true,
  },
  preview: {
    https: true,
    host: true,
  },
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    vueI18n({
      compositionOnly: false,
      include: fileURLToPath(new URL("./src/locale/lang/**", import.meta.url)),
    }),
    VitePWA({
      registerType: "autoUpdate",
    }),
    // basicSsl(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  esbuild: {
    drop: command === "build" ? ["console", "debugger"] : [],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
}));
