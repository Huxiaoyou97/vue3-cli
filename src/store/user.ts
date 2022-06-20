/**
 * @author 胡小右
 * @date 2022-06-17 19:43:11
 * @desc 全局状态管理 - 用户相关
 */

import {defineStore} from 'pinia'
import store from "@/store/index";
import HiCache from "@/core/utils/storage";
import {HiStance} from "$/base/utils/key";
import {Token, UserInfo} from "@/interface/home";

export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            token: HiCache.getCache<string>(HiStance.TOKEN) || "",
            refreshToken: HiCache.getCache<string>(HiStance.REFRESH_TOKEN) || "",
            userInfo: HiCache.getCache<UserInfo>(HiStance.USER_INFO) || null,

            test: "",
        }
    },
    actions: {
        /**
         * 设置token
         * @param data
         */
        setToken(data: Token) {
            const {refreshToken, accessToken} = data
            this.token = accessToken
            this.refreshToken = refreshToken
            HiCache.setCache<string>(HiStance.TOKEN, accessToken)
            HiCache.setCache<string>(HiStance.REFRESH_TOKEN, refreshToken)
        },

        /**
         * 演示操作
         * @param text
         */
        setTest(text: string) {
            this.test = text
        },

        /**
         * 设置用户信息
         * @param info
         */
        SET_MEMBER_INFO(info: UserInfo) {
            this.userInfo = info
            HiCache.setCache<UserInfo>(HiStance.USER_INFO, info)
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

        getUserInfo(state) {
            return state.userInfo
        },

        getRefreshToken(state) {
            return state.refreshToken
        }
    }
})
