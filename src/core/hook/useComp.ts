/**
 * @author 胡小右
 * @date 2022-06-17 19:50:27
 * @desc 核心Hook 将常用的 service mitt router i18n 等进行集成
 */

import {inject} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from 'vue-i18n'

// 全局状态管理
import {useUserStore} from '@/store/user'
import {useAppStore} from "@/store/app";
import {useModuleStore} from "@/store/module";


import {ServiceType} from "@/core/types";
import {Emitter} from "mitt";
import {gp} from "@/core/hook/useMessage";


export default function useComp() {
    const service = inject<ServiceType>("service");
    const mitt: Emitter<any> = inject<any>("mitt");
    const route = useRoute();
    const router = useRouter();
    const {locale, t} = useI18n()

    const userStore = useUserStore()
    const appStore = useAppStore()
    const moduleStore = useModuleStore()

    return {
        route,
        router,
        service,
        mitt,
        locale,
        t,

        userStore,
        appStore,
        moduleStore,

        $baseNotify: gp.$baseNotify,

        $baseAlert: gp.$baseAlert,

        $baseMessage: gp.$baseMessage,

        $baseConfirm: gp.$baseConfirm,

        $basePrompt: gp.$basePrompt,

        getImageUrl: (name: string) => {
            let path: string = `/src/assets/image/${locale.value}/${name}`

            let modules: any = null

            switch (locale.value) {
                case "zh-cn":
                    modules = import.meta.globEager("/src/assets/images/zh-cn/**/*");
                    break;
                case "en":
                    modules = import.meta.globEager("/src/assets/images/en/**/*");
                    break;
                case "pt":
                    modules = import.meta.globEager("/src/assets/images/pt/**/*");
                    break;
                default:
                    modules = import.meta.globEager("/src/assets/images/en/**/*");
                    break;
            }

            if (modules[path]) {
                return modules[path].default;
            }
        },
    }
}
