<!--
 * @author 胡小右
 * @date 2022-04-26 09:19:06
 * @desc useToggle Demo演示
-->

<template>
    <div>
        <p>状态: {{ useToggleDemoState }}</p>
        <button @click="handleUseTToggle">设置指定值</button>
        <button @click="useTToggle">useTToggle</button>
        <button @click="useTSetLeft">useTSetLeft</button>
        <button @click="useTSetCenter">useTSetCenter</button>
        <button @click="useTSetRight">useTSetRight</button>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useToggle from "@/core/hook/useToggle";

export default defineComponent({
    cool: {
        route: {
            path: "/exam-useToggle"
        }
    },

    setup() {
        //useToggle 测试
        const [useToggleDemoState, [useTToggle, useTSetLeft, useTSetCenter, useTSetRight]] = useToggle('left', 'center', 'right');

        const handleUseTToggle = () => {
            useTToggle('center')
        };

        return {
            useToggleDemoState,
            handleUseTToggle,
            useTToggle,
            useTSetLeft,
            useTSetCenter,
            useTSetRight,
        }
    }

})
</script>

<style scoped lang="less">

</style>
