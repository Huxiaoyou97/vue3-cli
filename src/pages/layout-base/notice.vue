<!--
 * @author 胡小右
 * @date 2022-03-22 16:07:41
 * @desc 滚动公告
-->

<template>
    <div class="l-layout-notice">

    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
    name: "base-layout-notice",

    setup() {
        function getImageUrl(name: string) {
            const path = `/src/assets/img/base/layout/slider/${name}.png`;
            const modules = import.meta.globEager("/src/assets/img/base/layout/slider/*");
            if (modules[path]) {
                return modules[path].default;
            }
        }


        return {
            getImageUrl
        }
    }
})
</script>

<style scoped lang="less">
.l-layout-notice {

}
</style>
