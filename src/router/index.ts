import {createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw} from "vue-router"
import {HRouter} from "@/core/types"
import {routerMode} from "@/config/env"
import version from "@/core/utils/version"

let layoutComp: any
let homeComp: any

if (version === "base") {
    layoutComp = import(`@/pages/layout-base/index.vue`)
    homeComp = import("@/views/base/home.vue")
} else {
    layoutComp = import(`@/pages/layout-base/index.vue`)
    homeComp = import("@/views/base/home.vue")
}


// 忽略规则
const ignore: any = {
    token: ["/login", "/403", "/404", "/500", "/502", "/cookie", "/tokenFailure"]
};

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "index",
        component: () => layoutComp,
        children: [
            {
                path: "/",
                name: "数据统计",
                // component: () => import("@/views/home.vue"),
                component: () => homeComp,
                // redirect: "/index"
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        name: "index2",
        redirect: "/"
    }
]


const router = createRouter({
    history: routerMode == "history" ? createWebHistory() : createWebHashHistory(),
    routes
}) as HRouter;
//
// /**
//  * 路由守卫
//  */
// router.beforeEach((to, from, next) => {
//     const userStore = useUserStore()
//
//     const isAuthenticated = userStore.getToken ?? '' !== ""
//
//     //没登录 必须携带token 进入登录页面
//     if (!to.path.includes("loading") && !isAuthenticated && to.query.token) {
//         console.log("1")
//         next({
//             path: "/loading",
//             query: to.query
//         })
//         return
//     }
//
//     // 携带了token 并且  不在loading页面  并且 处于登录状态
//     // 此时无需校验token 直接进入loading页面
//     if (to.query.token && !to.path.includes('loading') && isAuthenticated) {
//         console.log("2")
//         next({path: '/loading', query: to.query})
//         return
//     }
//
//     // 有登录,禁止进入登录页面
//     if (to.path.includes('login') && isAuthenticated) {
//         console.log("3")
//         next("/")
//         return
//     }
//
//     // 没有登录 并且 不在token失效页面 并且 没有地址栏没有token
//     if (!isAuthenticated && !to.path.includes("tokenFailure") && !to.query.token) {
//         console.log("4")
//         next("/tokenFailure")
//         return
//     }
//
//     next()
// })

export default router;
export {ignore};
