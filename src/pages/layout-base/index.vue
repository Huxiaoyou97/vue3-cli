<template>
    <!--    <div class="l-box">-->
    <!--        <div class="l-box-header">-->
    <!--            <base-layout-header/>-->
    <!--        </div>-->

    <!--        <div class="l-box-room">-->
    <!--            <div class="l-box-room__slider">-->
    <!--                <base-layout-slider/>-->
    <!--            </div>-->

    <!--            <div class="l-box-room__notice">-->
    <!--                <base-layout-notice />-->
    <!--            </div>-->

    <!--            <div class="l-box-room__main">-->
    <!--                <div class="l-box-room__main_container">-->
    <!--                    <router-view :key="$route.path" v-slot="{ Component }">-->
    <!--                        <component :is="Component"/>-->
    <!--                    </router-view>-->
    <!--                </div>-->
    <!--            </div>-->

    <!--        </div>-->
    <!--    </div>-->
    <router-view :key="$route.path" v-slot="{ Component }">
        <component :is="Component"/>
    </router-view>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import BaseLayoutHeader from "./header.vue"
import BaseLayoutSlider from "./slider.vue"
import BaseLayoutNotice from "./notice.vue"
import {useMessage, useNotification} from "naive-ui";

export default defineComponent({
    components: {
        BaseLayoutHeader,
        BaseLayoutSlider,
        BaseLayoutNotice
    },

    setup() {

        // 将弹窗挂载到全局
        function installMsg() {
            window.$message = useMessage()
            window.$notice = useNotification()
        }

        installMsg()
    }
})
</script>

<style scoped lang="less">
.l-box {

}
</style>
