import axios from "axios";
import store from "@/store";
// import storage from "@/core/utils/storage";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "@/router";
import HiCache from "@/core/utils/storage";
import {HiStance} from "$/base/utils/key";
import {useAppStore} from "@/store/app";
import {useUserStore} from "@/store/user";
import {useNotification} from "naive-ui";


NProgress.configure({
    showSpinner: false
})

axios.defaults.timeout = 30000
// axios.defaults.withCredentials = true
// @ts-ignore
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

axios.defaults.withCredentials = true;

// 创建一个axios实例
let instance = axios.create({
    timeout: 50000,// 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 请求队列
let requests: Array<Function> = [];

// Token 是否刷新中
let isRefreshing = false;
// 请求等待队列
let waitQueue: Array<Function> = [];


// 忽略规则
const ignore = {
    NProgress: ["/sys/info/record"],
};

// 数组中匹配单个字符串的方法
async function searchStr(value: string, list: string[]) {
    if (value) {
        let arr: string[] = []
        for (const item of list) {
            if (item.indexOf(value) >= 0) {
                arr.push(item)
            }
        }

        return arr
    }
}

export function getCookie(cookieName: string) {
    let cookieValue = null;
    let CookieList: string[] | [] = [];
    if (document.cookie) {
        if (document.cookie.includes("; ")) {
            CookieList = document.cookie.split("; ");
        } else {
            if (document.cookie.includes("=")) {
                CookieList = [document.cookie];
            } else {
                CookieList = [];
            }
        }
    }
    if (CookieList.length > 0) {
        for (let i = 0; i < CookieList.length; i++) {
            if (CookieList[i].includes("=")) {
                const itemName = CookieList[i].split("=")[0];
                if (cookieName === itemName) {
                    cookieValue = CookieList[i].split("=")[1];
                }
            }
        }
    }
    return cookieValue;
}

// Request
instance.interceptors.request.use(
    async (config: any) => {

        const userStore = useUserStore()

        const token = userStore.getToken || HiCache.getCache<string>(HiStance.TOKEN)

        if (token ?? '' !== '') {
            config.headers.Authorization = 'bearer ' + token
        }

        if (config.url.includes("refreshToken") || config.url.includes("gameUrlLogin")) {
            config.headers.Authorization = ""
        }

        config.headers["m"] = getCookie('m') ?? localStorage.getItem("M");
        config.headers["lang"] = 'zh-cn'
        config.headers["device"] = 'pc';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response
instance.interceptors.response.use(
    async (response) => {
        // NProgress.done();

        //这里根据后台返回来设置
        const {code, data, msg} = response.data
        if (code == 0) {
            return Promise.resolve(response.data)
        } else {

            switch (code) {
                case 40204:
                    if (response.config.url?.includes("refreshToken")) {
                        // await store.dispatch(UserActionsType.USER_REMOVE, '');
                        await router.push('/');
                    }
                    break;
                case 4005212:
                    await router.push('/cookie');
                    break;
                default:
                    return Promise.reject(msg)
            }
            // return Promise.reject(msg)
        }

    },
    async (error) => {
        // NProgress.done();
        // let config = error.config
        // const {code, msg} = error.response.data
        // console.log(code, msg, "code")
        // if (code === 40230) {
        //     // access_token过期，尝试续期token
        //     if (isRefreshing == false) {
        //         // 切换正在刷新标识，其他请求先进请求等待队列中
        //         isRefreshing = true
        //
        //         const refreshToken = storage.get("refreshToken")
        //         return store.dispatch('refreshToken', refreshToken).then(token => {
        //             console.log("-------")
        //             config.headers['Authorization'] = 'bearer ' + token
        //             config.baseURL = '' // 请求重试时，url已包含baseURL
        //             waitQueue.forEach(callback => callback(token)) // 已成功刷新token，队列中的所有请求重试
        //             waitQueue = []
        //             return instance(config)
        //         }).catch(() => {
        //             // token 续期失败
        //             console.log('当前页面已失效，请重新登录')
        //             //router.push('/login')
        //             Notify({type: 'danger', message: msg, duration: 1000});
        //         }).finally(() => {
        //             isRefreshing = false
        //         })
        //     } else {
        //         return new Promise((resolve => {
        //             waitQueue.push((token: string) => {
        //                 config.headers['Authorization'] = 'bearer ' + token
        //                 config.baseURL = ''
        //                 resolve(instance(config))
        //             })
        //         }))
        //     }
        // } else if (code === 40231) {
        //     console.log('您已被管理员强制下线');
        //     //router.push('/login')
        // } else {
        //     console.log('系统出错');
        //     return Promise.reject(new Error(msg || 'Error'))
        // }
        NProgress.done();
        // console.log(
        //     error.response,
        //     error.request,
        //     error.config,
        //     "-----------"
        // )

        if (error.response) {

            const {status, config, data: {code, msg}} = error.response;
            switch (code) {
                case 40230:
                    if (error.response.config.url.includes("refreshToken")) {
                        // await store.dispatch(UserActionsType.USER_REMOVE, '');
                        await router.push('/');
                    } else {

                        if (window.$notice) {
                            window.$notice.error({
                                content: msg,
                                duration: 3000
                            })
                        }

                        const userStore = useUserStore()

                        userStore.REMOVE_USER_LOGOUT()
                        await router.push('/tokenFailure');
                        break;
                    }
                    break;
                case 40231:

                    if (window.$notice) {
                        window.$notice.error({
                            content: msg,
                            duration: 3000
                        })
                    }

                    const userStore = useUserStore()

                    userStore.REMOVE_USER_LOGOUT()
                    await router.push('/tokenFailure');
                    break;
                case 40204:
                    // ElNotification({type: 'error', message: msg, duration: 1000});
                    // await store.dispatch(UserActionsType.USER_REMOVE, '');
                    // sessionStorage.setItem('h5_token', '');
                    await router.push('/');
                    break;
                // case 401:
                //     // await store.dispatch("userRemove");
                //     href("/login");
                //     break;
                //
                // case 403:
                //     if (isDev) {
                //         Notify({type: 'danger', message: `${config.url + t('message.msg13')} ！！`, duration: 1000});
                //     } else {
                //         href("/403");
                //     }
                //     break;
                //
                // case 404:
                //     break;
                //
                // case 500:
                //     if (!isDev) {
                //         href("/500");
                //     }
                //     break;
                //
                // case 502:
                //     if (isDev) {
                //         Notify({type: 'danger', message: `${config.url + t('message.msg14')} ！！`, duration: 1000});
                //     } else {
                //         href("/502");
                //     }
                //     break;

                default:
                    console.error(status, config.url);
            }
        }
        return Promise.reject(error.message);
    }
);

export default instance;
