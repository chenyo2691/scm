<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: this.$store.state.app.themeColor
        };
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

    }
};
</script>

<style lang="less">
html,
body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

.app-main {
    width: 100%;
    height: 100%;
}

// 盒子模型选用border-box
*,
*:before,
*:after {
    box-sizing: border-box;
}

// 自定义滚动条
// 仅限Webkit内核
&,
& * {
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: rgba(100, 100, 100, 0.1);
        transition: all 1s;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(120, 120, 120, 0.3);
    }
    &:hover::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(100, 100, 100, 0.5);
    }
}
</style>
