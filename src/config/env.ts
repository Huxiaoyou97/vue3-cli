
import store from "store";
import { getUrlParam } from "@/core/utils";

// 路由模式
const routerMode: String = "history";

// 开发模式
const isDev: Boolean = import.meta.env.MODE === "development";

// 请求地址
const baseUrl: String = (function () {
    let proxy = getUrlParam("proxy");

    if (proxy) {
        store.set("proxy", proxy);
    } else {
        proxy = store.get("proxy") || "";
    }

    return isDev ? `${proxy}/api_v1` : `/api_v1`;
})();


// 程序配置参数
const app: any = store.get("__app__") || {
    name: "Vite-Cli",

    conf: {
        showAMenu: false, // 是否显示一级菜单栏
        showRouteNav: true, // 是否显示路由导航栏
        showProcess: true, // 是否显示页面进程栏
        customMenu: false // 自定义菜单
    }
};

export { routerMode, baseUrl, isDev, app }
