import { fileURLToPath, URL } from "node:url";


import { defineConfig } from "vite";
import Components from 'unplugin-vue-components/vite';
import requireTransform from 'vite-plugin-require-transform';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    requireTransform({
      fileRegex: /.js$|.vue$/ ,
    }),
  ],
  // 开发环境的代理
  server:{
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
