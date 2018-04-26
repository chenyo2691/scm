<template>
    <div>
        <Row>
            <Col span="24">
            <SearchCard :form="form" :labelWidth="80" @handleSearch="handleSearch"></SearchCard>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="24">
            <Card>
                <p slot="title">用户列表</p>
                <div class="tool-bar">
                    <ButtonGroup>
                        <Button type="ghost" loading>Default</Button>
                        <Button type="ghost">Default</Button>
                        <Button type="ghost" loading>Default</Button>
                        <Button type="ghost">Default</Button>
                        <Button type="ghost" loading>Default</Button>
                        <Button type="ghost">Default</Button>
                    </ButtonGroup>
                </div>
                <Table :columns="columns" :data="data" stripe border size="small" :loading="loading">
                    <div slot="footer">
                        <Table :columns="columns" :data="data1" stripe border size="small" :loading="loading" :show-header="false"></Table>
                    </div>
                </Table>
                <Page style=" padding-top: 24px; text-align: right; " :total="pageCondition.total " :page-size="pageCondition.perPage " :current="pageCondition.pageIndex " size="small " @on-change="pageChange "></Page>
            </Card>
            </Col>
        </Row>
        <Modal v-model="showRoleEditModal " title="角色编辑 " @on-ok="asyncOK ">
            <div>
                <CheckboxGroup v-model="selectedRoles ">
                    <Checkbox v-for="(item,index) in roles " :key="index " :label="item.key ">
                        <Icon type="person-stalker "></Icon>
                        <span>{{item.value}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </div>
        </Modal>
    </div>
</template>

<script>
import SearchCard from '@/component/searchCard/SearchCard.vue';
export default {
    components: {
        SearchCard
    },
    data() {
        return {
            form: [
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
            ],
            loading: false,
            columns: [
                // {
                //     title: '序号',
                //     width: 60,
                //     align: 'center',
                //     render: (h, params) => {
                //         if (params.row.isfooter) {
                //             return '-';
                //         }
                //         return params.index + 1;
                //     }
                // },
                {
                    title: '确认状态',
                    key: 'cDefine11'
                },
                {
                    title: '确认时间',
                    key: 'cDefine6'
                },
                {
                    title: '暂停状态',
                    key: 'cDefine13'
                },
                {
                    title: '主表ID',
                    key: 'poid'
                },
                {
                    title: '业务类型',
                    key: 'cbustype'
                },
                {
                    title: '采购类型',
                    key: 'cptcode'
                },
                {
                    title: '订单编号',
                    key: 'cpoid'
                },
                {
                    title: '单据日期',
                    key: 'dpodate'
                },
                {
                    title: '审核时间',
                    key: 'caudittime'
                },
                {
                    title: '审核日期',
                    key: 'cauditdate'
                },
                {
                    title: '供应商编码',
                    key: 'cvencode'
                },
                {
                    title: '供应商名称',
                    key: 'cvenabbname'
                },
                {
                    title: '部门',
                    key: 'cdepname'
                },
                {
                    title: '业务员',
                    key: 'cpersonname'
                },
                {
                    title: '币种',
                    key: 'cexch_name'
                },
                {
                    title: '制单人',
                    key: 'cmaker'
                },
                {
                    title: 'Age',
                    key: 'age',
                    sortable: true,
                    filters: [
                        {
                            label: 'Greater than 25',
                            value: 1
                        },
                        {
                            label: 'Less than 25',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    },
                    render: (h, params) => {
                        if (params.row.isfooter) {
                            let total = 0;
                            this.data.forEach(function (element) {
                                total += element.age;
                            }, this);
                            return '合计:' + total;
                        }
                        return params.row.age;
                    }
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                    title: 'date',
                    key: 'date'
                },
                {
                    title: 'role',
                    key: 'role'
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        if (!params.row.isfooter) {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '分配角色')
                            ]);
                        }
                        return '-';
                    }
                }
            ],
            data: [
                {
                    name: 'John BrownBrownBrownBrownBrownBrownBrown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03',
                    role: '供应商'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01',
                    role: '供应商'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02',
                    role: '业务员'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04',
                    role: '业务员'
                }
            ],
            data1: [
                {
                    name: '合计',
                    age: '合计',
                    address: '合计',
                    date: '合计',
                    role: '合计',
                    isfooter: true
                }
            ],
            pageCondition: {
                pageIndex: 1,
                perPage: 20,
                total: 0,
            },
            showRoleEditModal: false,
            roles: [
                {
                    key: '供应商',
                    value: '供应商'
                },
                {
                    key: '业务员',
                    value: '业务员'
                }
            ],
            selectedRoles: []
        };
    },
    methods: {
        handleSearch(form) {
            this.form = form;
            console.log(form);
        },
        pageChange() {

        },
        show() {
            this.selectedRoles = [];
            this.showRoleEditModal = true;
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../styles/common.less";

.tool-bar {
    margin-bottom: 12px;
}
</style>
