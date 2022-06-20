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
import vueI18n from "./core/i18n"

// naive
import naive from 'naive-ui'

// loading
// @ts-ignore
import loadingDirective from "./directives/directive.js"
import {useAppStore} from "@/store/app";

const app = createApp(App);

app.use(pinia)

bootstrap(app)
    .then(() => {

        // 事件通讯
        app.provide("mitt", mitt());

        app.use(vueI18n).use(router).use(naive).directive('loading', loadingDirective).mount("#app");

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
