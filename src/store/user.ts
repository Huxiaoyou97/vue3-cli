/**
 * @author 胡小右
 * @date 2022-06-17 19:43:11
 * @desc 全局状态管理 - 用户相关
 */

import {defineStore} from 'pinia'
import HiCache from "@/core/utils/storage";
import {HiStance} from "$/base/utils/key";

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: HiCache.getCache<string>(HiStance.TOKEN) || "",
            refreshToken: HiCache.getCache<string>(HiStance.REFRESH_TOKEN) || "",

            test: "",
        }
    },
    actions: {
        /**
         * 设置token
         * @param data
         */
        setToken(data) {
            const {refreshToken, accessToken} = data
            this.token = accessToken
            this.refreshToken = refreshToken
            HiCache.setCache<string>(HiStance.TOKEN, accessToken)
            HiCache.setCache<string>(HiStance.REFRESH_TOKEN, refreshToken)
        },

        /**
         * 清除所有本地登录信息
         * @constructor
         */
        REMOVE_USER_LOGOUT() {
            HiCache.clearCache()
        }
    },
    getters: {
        getTest(state) {
            return state.test
        },

        getToken(state) {
            return state.token
        },

        getRefreshToken(state) {
            return state.refreshToken
        }
    }
})
