import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "@/router";
import HiCache from "@/core/utils/storage";
import {HiStance} from "$/base/utils/key";
import {useUserStore} from "@/store/user";
import {getCookie} from "@/core/utils/version";


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
                        await router.push('/');
                    }
                    break;
                case 4005212:
                    await router.push('/cookie');
                    break;
                default:
                    return Promise.reject(msg)
            }
        }

    },
    async (error) => {
        NProgress.done();

        if (error.response) {

            const {status, config, data: {code, msg}} = error.response;
            switch (code) {
                case 40230:
                    // if (error.response.config.url.includes("refreshToken")) {
                    //     // await store.dispatch(UserActionsType.USER_REMOVE, '');
                    //     await router.push('/');
                    // } else {
                    //     const userStore = useUserStore()
                    //
                    //     userStore.REMOVE_USER_LOGOUT()
                    //     await router.push('/tokenFailure');
                    //     break;
                    // }
                    break;
                case 40231:
                    // const userStore = useUserStore()
                    // userStore.REMOVE_USER_LOGOUT()
                    // await router.push('/tokenFailure');
                    break;
                case 40204:
                    await router.push('/');
                    break;
                default:
                    console.error(status, config.url);
            }
        }
        return Promise.reject(error.message);
    }
);

export default instance;
