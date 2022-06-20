/**
 * @author 胡小右
 * @date 2022-06-17 19:43:40
 * @desc 全局状态管理 - 模块相关
 */

import {defineStore} from "pinia";
import store from "@/store/index";

export const useModuleStore = defineStore({
    id: "module",
    state: (): any => {
        return {
            list: [],
        }
    },
    getters: {
        getModuleList: (state) => {
            return state.list
        },
    },
    actions: {
        SET_MODULE(list: any) {
            const d: any = {};

            list.forEach((e: any) => {
                d[e.name] = e;
            });

            this.list = list;
        },
    }
})
