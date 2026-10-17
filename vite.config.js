import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 按需导入插件
// unplugin-auto-import源码中真正省略掉 import 语句（而不只是编辑器里看起来省略了），就必须在构建工具中配置该插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      //1.importStyle: "sass"-需导入的组件样式从编译好的 CSS 切换为 SCSS 源码
      resolvers: [ElementPlusResolver({ importStyle: "sass",})],
    }),
  ],
   server: {
    // 解决：axios访问报错-跨域
    proxy: {
      // 匹配所有以 /api 开头的请求
      '/api': {
        target: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
        changeOrigin: true, // 关键：让后端以为请求来自它自己
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 /api 前缀（如果需要）
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          //引入的公共样式文件-自动导入，免去手动导入，直接使用变量
          @use "@/styles/var.scss" as *;
          //替换主题设置样式文件-
          @use "@/styles/element/index.scss" as *;
        `,
      }
    }
  }
})
