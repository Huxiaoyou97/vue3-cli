/**
 * @author 胡小右
 * @date 2022-06-18 14:44:23
 * @desc loading相关操作
 */

import {defineComponent} from "vue";
import {useLoading} from "@/core/hook/useLoading";
// import "$/base/styles/axam.less"

export default defineComponent({
    xiaoyou: {
        route: {
            path: "/exam-useLoading"
        }
    },

    setup() {
        const {isLoading, loadingWrapper} = useLoading()


        // 睡眠
        function sleep(duration: number): Promise<number> {
            return new Promise(resolve => {
                setTimeout(resolve, duration);
            })
        }

        // loadingWrapper中的异步函数执行完成后 isLoading会自动变更状态
        void loadingWrapper(sleep(2000).then(() => {
            console.log("执行完成", isLoading.value)
        }))

        return () => {
            return (
                // v-loading 自定义指令 默认是全屏loading
                // 如果需要挂载到某一个元素上 只需要给该元素新增css position: relative; 即可
                <div class="exam-loading" v-loading={isLoading.value}>
                    123
                </div>
            )
        }
    }
})
