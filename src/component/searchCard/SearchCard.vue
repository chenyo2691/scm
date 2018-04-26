<template>
    <Card>
        <p slot="title">{{ $t('searchCardTitle') }}</p>
        <a href="#" slot="extra" @click.prevent="searchFormShow = !searchFormShow">
            <Icon :type=" searchFormShow ? 'arrow-shrink' : 'arrow-expand' "></Icon>
            <span>{{searchFormShow ? '收缩' : '展开'}}</span>
        </a>
        <transition name="fade">
            <Form v-show="searchFormShow" class="not-star" inline :label-width="this.labelWidth" label-position="right">
                <template v-for="(item,index) in form">
                    <template v-if="item.type === 'Input'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <Input v-model="item.value" style="width:200px"></Input>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'Select'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <Select v-model="item.value" style="width:200px">
                                <Option v-for="(optionItem,optionKey) in item.options" :key="optionKey" :value="optionItem.value">{{optionItem.key}}</Option>
                            </Select>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'RadioGroup'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <RadioGroup v-model="item.value">
                                <Radio v-for="(optionItem,optionKey) in item.options" :key="optionKey" :label="optionItem.value">{{optionItem.key}}</Radio>
                            </RadioGroup>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'CheckboxGroup'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <CheckboxGroup v-model="item.value">
                                <Checkbox v-for="(optionItem,optionKey) in item.options" :key="optionKey" :label="optionItem.value">{{optionItem.key}}</Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'Checkbox'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <Checkbox v-model="item.value"></Checkbox>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'Switch'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <i-switch v-model="item.value"></i-switch>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'Daterange'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <DatePicker v-model="item.value" format="yyyy/MM/dd" type="daterange" placement="bottom-end" style="width:200px"></DatePicker>
                        </FormItem>
                    </template>
                    <template v-if="item.type === 'Date'">
                        <FormItem :label="item.label + ':'" :key="index">
                            <DatePicker v-model="item.value" format="yyyy年MM月dd日" type="date" style="width: 200px"></DatePicker>
                        </FormItem>
                    </template>
                </template>
                <br>
                <FormItem>
                    <Button type="primary" @click="handleSearch">搜索</Button>
                </FormItem>
            </Form>
        </transition>
    </Card>
</template>

<script>
/**
 *          form: [
                {
                    label: 'xxxx',
                    type: 'Input',
                    value: '',
                },
                {
                    label: 'xxxx',
                    type: 'Checkbox',
                    value: false,
                },
                {
                    label: 'xxxx',
                    type: 'Switch',
                    value: true,
                },
                {
                    label: 'xxxx',
                    type: 'Daterange',
                    value: ['2016-01-01', '2016-02-15'],

                },
                {
                    label: 'xxxx',
                    type: 'Date',
                    value: '2016-01-01',

                },
                {
                    label: 'xxxxx',
                    type: 'Select',
                    value: '',
                    options: [
                        {
                            key: 'Eat',
                            value: '1'
                        },
                        {
                            key: 'Sleep',
                            value: '2'
                        },
                        {
                            key: 'Run',
                            value: '3'
                        },
                        {
                            key: 'Movie',
                            value: '4'
                        }
                    ]
                },
                {
                    label: 'xxxxxx',
                    type: 'RadioGroup',
                    value: '',
                    options: [
                        {
                            key: 'Eat',
                            value: '1'
                        },
                        {
                            key: 'Sleep',
                            value: '2'
                        },
                        {
                            key: 'Run',
                            value: '3'
                        },
                        {
                            key: 'Movie',
                            value: '4'
                        }
                    ]
                },
                {
                    label: 'xxxx',
                    type: 'CheckboxGroup',
                    value: [],
                    options: [
                        {
                            key: 'Eat',
                            value: '1'
                        },
                        {
                            key: 'Sleep',
                            value: '2'
                        },
                        {
                            key: 'Run',
                            value: '3'
                        },
                        {
                            key: 'Movie',
                            value: '4'
                        }
                    ]
                }
            ]
 */
export default {
    props: {
        form: Array,
        labelWidth: {
            type: Number,
            default: 80
        }
    },
    data() {
        return {
            searchFormShow: true
        };
    },
    methods: {
        handleSearch() {
            this.$emit('handleSearch', this.form);
        }
    }
};
</script>

<style lang="less" scoped>
.not-star {
    .ivu-form-item-required .ivu-form-item-label:before {
        content: "";
    }

    .ivu-form-item-label {
        font-weight: bolder;
    }

    .ivu-form-item {
        margin-bottom: 6px;
    }
}
</style>
