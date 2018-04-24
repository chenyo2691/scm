<template>
    <div style="display:inline-block;padding:0 6px;">
        <Dropdown trigger="click" @on-click="setLang">
            <a href="javascript:void(0)">
                <Icon :style="{marginTop: '-2px', verticalAlign: 'middle'}" color="#495060" :size="18" type="earth"></Icon>
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in langList" :key="index" :name="item.name">
                    <Row type="flex" justify="center" align="middle">
                        <span>{{item.title}}</span>
                    </Row>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
export default {
    data() {
        return {
            langList: [
                {
                    name: 'zh-CN',
                    title: '中文简体'
                },
                {
                    name: 'zh-TW',
                    title: '中文繁體'
                },
                {
                    name: 'en-US',
                    title: 'English'
                }
            ]
        };
    },
    methods: {
        setLang(lang) {
            this.lang = lang;
            localStorage.lang = lang;
            this.$store.commit('switchLang', lang); // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型
        }
    }
};
</script>
