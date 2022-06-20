/**
 * @author 胡小右
 * @date 2022-06-18 14:02:45
 * @desc useComp使用案例
 */

import {computed, defineComponent, nextTick} from "vue";
import useComp from "@/core/hook/useComp";

export default defineComponent({
    cool: {
        route: {
            path: "/exam-useComp"
        }
    },

    setup() {

        const {
            route,              // 路由信息等
            router,             // 路由跳转等操作
            mitt,               // 组件通讯
            locale,             // 当前语言
            refs,               // Dom ref操作
            setRefs,            // 设置dom元素ref
            t,                  // 多语言 $t
            notice,             // 弹窗
            service,            // api请求  建议不要在页面组件中操作。将请求在pinia中集中管理
            userStore,          // 用户相关状态管理
            moduleStore,        // 模块相关状态管理
            appStore            // 系统相关状态管理
        } = useComp()

        // console.log(route, "-------------- route")
        // console.log(router, "-------------- router")

        /**
         * mitt
         * 如果不需要传递参数 第二个参数可以不传 参数类型可以是任意类型
         *
         * emit发送事件
         * mitt.emit("useComp", "传递的参数")
         *
         * on 接收
         * mitt.on("useComp", (data: string) => {
         *     console.log(data)
         * })
         *
         * off 注销事件（组件销毁 页面销毁一定要注销事件）
         * mitt.off("useComp")
         */

        // i18n
        // console.log(locale.value, "-----locale.value")

        /**
         * ref
         *
         * 设置ref名称
         * setRefs('h')
         *
         * 获取ref
         * void nextTick(() => {
         *     console.log(refs.value['h'], "-------refs")
         * })
         */

        // 多语言使用
        // console.log(t("message.language"))

        /**
         * 弹窗使用
         *
         * notice("success")
         * notice("错误", "error")
         * notice("警告", "warning")
         * notice("默认", "info")
         */

        /**
         * service 请求
         * 1. 根据package/modules/??/service 文件下的所有文件进行文件名生成链式操作
         * 2. 例子：
         *   比如 当前是base模块下 service的文件命名为common.ts 那么请求路径就应该是 service?.base.common?.test()
         *   如果除了common.ts还有另外一个文件 例如 user.ts 那就应该是 service?.base.common?.test()
         *   test()是申明在文件内部的函数名称 具体写法看common.ts
         *   新增一个接口后需要在 src/core/types/index.d.ts新增类型申明 具体写法参考原有的
         *
         *   用法一 then
         *   service?.base.common?.test().then(() => {}).catch(() => {})
         *
         *   用法二 async await
         *   async function func() {
         *      const response = await service?.base.common?.test()
         *   }
         */

        /**
         * pinia 基本操作演示
         *
         * 调用getter 获取state
         * const userInfo = computed(() => userStore.getTest)
         *
         * 调用actions (如果方法是异步的 可以使用.then 或者 async await 接收回调)
         * userStore.setTest("设置的内容")
         */


        return () => {
            return (
                <div>
                    <h1 ref={setRefs('h')}>多语言: {t("message.language")}</h1>
                </div>
            )
        }
    }
})
