<template>
    <n-notification-provider>
        <n-message-provider>
            <router-view/>
        </n-message-provider>
    </n-notification-provider>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useComp from "./core/hook/useComp";

export default defineComponent({
    setup() {
        const {$baseNotify, $baseMessage, $baseAlert, $baseConfirm, $basePrompt, t} = useComp()

        // $baseConfirm("我是内容 可以是模板语法", "我是标题", () => {
        //     console.log("我是确定回调函数")
        // }, () => {
        //     console.log("我是取消回调函数")
        // }, "我是确定按钮", "我是取消按钮")

        // $basePrompt("我是内容 可以是模板语法", "我是标题")
    },
})
</script>

<style scoped>
</style>
