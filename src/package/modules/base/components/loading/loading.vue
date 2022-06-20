<template>
    <div class="loading">
        <div class="loading-content">
            <img width="100" height="100" src="../../../../../assets/img/base/loading.gif" alt="loading">
            <!--            <p class="desc">{{title}}</p>-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {
            title: '正在载入...'
        }
    },
    methods: {
        setTitle(title) {
            this.title = title
        }
    }
}
</script>

<style lang="less" scoped>
.loading {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: rgba(0, 0, 0, .4);
    z-index: 2001;

    .loading-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
}
</style>
