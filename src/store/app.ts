/**
 * @author 胡小右
 * @date 2022-06-17 19:43:57
 * @desc 全局状态管理 - 系统相关
 */

import {defineStore} from "pinia";
import HiCache from "@/core/utils/storage";
import store from "@/store/index";

export const useAppStore = defineStore({
    id: "app",
    state: () => {
        return {
            serverTime: HiCache.getCache<string>('serverTime')
        }
    },
    getters: {
        serverTime(state) {
            return state.serverTime
        }
    },

    actions: {
        async APP_LOAD() {
            console.log("service: ", store.service?.base)
        },
    }
})
