<!--
 * @author 胡小右
 * @date 2022-03-21 17:57:10
 * @desc base版本Header
-->

<template>
    <div class="l-layout-header">
        header
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";

export default defineComponent({
    name: "base-layout-header",
})

</script>

<style scoped lang="less">
.l-layout-header {
    width: 100%;
    background: #f5f5f5;
}
</style>
