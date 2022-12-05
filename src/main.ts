import {createApp} from 'vue'
import App from './App.vue'

// core
import {bootstrap} from "./core";

// mitt
import mitt from "mitt";

// router
import router from "./router";

// store
// vuex替代品
import pinia from './store'

// i18n
import i18n from "./core/i18n"

// naive
import naive from 'naive-ui'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import {useAppStore} from "@/store/app";
import {gp, messageSetup} from "@/core/hook/useMessage";

const app = createApp(App);

app.use(pinia)

bootstrap(app)
    .then(() => {

        // 事件通讯
        app.provide("mitt", mitt());

        app.use(i18n).use(router).use(naive).use(ElementPlus, {
            // 支持 large、default、small
            size: 'default'
        })
        app.config.globalProperties.$t = (i18n.global as any).t

        messageSetup(app)

        app.mount("#app");

        // const userStore = useUserStore()
        const appStore = useAppStore()
        // if (userStore.getToken) {
        //     void userStore.getMemberInfo()
        // }
        void appStore.APP_LOAD()

    })
    .catch((err: string) => {
        console.error(`启动失败`, err);
    });


// @ts-ignore
window.__app__ = app;
