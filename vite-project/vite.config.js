import { fileURLToPath, URL } from "node:url";


import { defineConfig } from "vite";
import Components from 'unplugin-vue-components/vite';
import requireTransform from 'vite-plugin-require-transform';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vue from "@vitejs/plugin-vue";
import postCssPxToRem from 'postcss-pxtorem'

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
  css:{
    // rem 适配 感觉有点小问题
    postcss:{
      plugins:[
        // postCssPxToRem({
        //   rootValue: 192, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192
        //   propList: ["*", "!border"], // 除 border 外所有px 转 rem
        //   selectorBlackList: ['norem',".el-",".ant-"], // 过滤掉.el-开头的class，不进行rem转换
        // })
      ]
    }
  }
});
