// @ts-ignore
import path from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import {svgBuilder} from "./src/core/utils/svg";


function resolve(dir: string) {
    // @ts-ignore
    return path.resolve(__dirname, ".", dir);
}

export default defineConfig({
    base: "/",
    plugins: [
        vue(),
        vueJsx(),
        svgBuilder("./src/assets/svg/"),
        vueI18n({
            include: path.resolve(__dirname, './src/core/i18n/locale/**')
        }),
    ],
    resolve: {
        alias: {
            "@": resolve("src"),
            "$": resolve("src/package/modules"),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        }
    },
    css: {
        postcss: {
            plugins: [
                {
                    postcssPlugin: 'internal:charset-removal',
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === 'charset') {
                                atRule.remove();
                            }
                        }
                    }
                }
            ]
        },
        preprocessorOptions: {
            css: {charset: false},
            scss: {
                // additionalData: `@import "./src/assets/css/const.scss";`,
            }
        }
    },
    server: {
        port: 12000,
        hmr: {
            overlay: true
        },
        proxy: {
            "/api_v1": {
                target: "http://192.168.80.50:8020",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\//, "")
            },
        }
    },
    build: {
        minify: "terser",
        sourcemap: false,
        polyfillDynamicImport: false,
        terserOptions: {
            compress: {
                // 生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                // 分包处理
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        },
        commonjsOptions: {
            requireReturnsDefault: 'namespace'
        }
    },
    optimizeDeps: {
        exclude: ["vue-demi"]
    }
});
