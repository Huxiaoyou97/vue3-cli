/**
 * @author 胡小右
 * @date 2022-06-17 19:50:27
 * @desc 核心Hook 将常用的 ref service mitt router 多语言等进行集成
 */

import {inject} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from 'vue-i18n'
import {useRefs} from "@/core";

// 全局状态管理
import {useUserStore} from '@/store/user'
import {useAppStore} from "@/store/app";
import {useModuleStore} from "@/store/module";


import {useNotification, NotificationType} from 'naive-ui'
import {ServiceType} from "@/core/types";
import {Emitter} from "mitt";


export default function useComp() {
    const {refs, setRefs} = useRefs();
    const service = inject<ServiceType>("service");
    const mitt: Emitter<any> = inject<any>("mitt");
    const route = useRoute();
    const router = useRouter();
    const {locale, t} = useI18n()

    const userStore = useUserStore()
    const appStore = useAppStore()
    const moduleStore = useModuleStore()

    const notification = useNotification()

    return {
        route,
        router,
        refs,
        setRefs,
        service,
        mitt,
        locale,
        t,

        userStore,
        appStore,
        moduleStore,
        notice: function (content: any, type: NotificationType = "success", isClose: boolean = true) {

            let data: any = {
                content,
            }
            if (isClose) {
                data = {
                    ...data,
                    duration: 2000
                }
            }

            notification[type](data)
        }
    }
}
