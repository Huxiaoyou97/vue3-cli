<!--
 * @author 胡小右
 * @date 2022-03-22 12:40:04
 * @desc base layout 侧边栏
-->

<template>
    <div class="l-layout-slider">
        slider
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from "vue"

export default defineComponent({
    name: "base-layout-slider",
})
</script>

<style scoped lang="less">
.l-layout-slider {
    display: block;
    overflow: hidden scroll;
    height: 100%;
    width: 100%;
    box-sizing: content-box;
    padding-right: 20px;


    &__menu {

        > div {
            height: 46px;
            line-height: 46px;
            width: 190px;
            cursor: pointer;
            background: #f5f5f5;
            border-bottom: 1px solid #dadada;

            .title-img {
                width: 38px;
                height: 38px;
                margin-left: 10px;
                margin-right: 14px;
                border-radius: 100px;
            }

            &:hover {
                .title-img {
                    transition: transform .3s linear;
                    transform: rotate(1turn);
                }
            }
        }

        img {
            width: 38px;
            height: 38px;
            margin-left: 10px;
            margin-right: 14px;
        }


        .xiala {
            width: 12px;
            height: 8px;
            margin: 0 10px 0 0;
        }

        .shangla {
            transform: rotate(180deg);
        }

        &_item {
            width: 100%;
            background-color: #fff;
            margin: 0;
            padding: 0;

            li {
                height: 46px;
                border-bottom: 1px dashed #dadada;
                list-style: none;
                overflow: hidden;
                display: flex;
                align-items: center;
                padding-left: 26px;
                cursor: pointer;

                .lottery-img {
                    width: 38px;
                    height: 38px;
                    border-radius: 100px;
                    margin-left: 10px;
                    margin-right: 14px;
                }

                &.active {
                    .lotteryName {
                        color: #ff5151;
                    }
                }

                &:hover {
                    img {
                        transition: transform .3s linear;
                        transform: rotate(1turn);
                    }
                }


                .lotteryName {
                    font-size: 14px;
                    color: #515151;
                }
            }
        }
    }
}
</style>
