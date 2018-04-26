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
                <p slot="title">采购订单</p>
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
                        <span style="margin-left:24px">数量合计:
                            <b>{{quality}}</b>
                        </span>
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
    computed: {
        quality: function () {
            let total = 0;
            this.data.forEach(function (element) {
                total += element.iquantity;
            }, this);
            return total;
        }
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
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                    fixed: 'left'
                },
                {title: 'id', width: 180, key: 'id'},
                {title: 'poid', width: 180, key: 'poid'},
                {title: '业务类型', width: 180, key: 'cbustype'},
                {title: '订单编号', width: 180, key: 'cpoid'},
                {title: '单据日期', width: 180, key: 'dpodate', },
                {title: '审核时间', width: 180, key: 'caudittime', },
                {title: '审核日期', width: 180, key: 'cauditdate', },
                {title: '供应商编码', width: 180, key: 'cvencode'},
                {title: '供应商名称', width: 180, key: 'cvenabbname'},
                {title: '部门', width: 180, key: 'cdepname'},
                {title: '业务员', width: 180, key: 'cpersonname'},
                {title: '币种', width: 180, key: 'cexch_name'},
                {title: '销售订单号', width: 180, key: 'SOCode'},
                {title: '项次号', width: 180, key: 'cdefine24'},
                {title: '存货编码', width: 180, key: 'cinvcode'},
                {title: '存货名称', width: 180, key: 'cinvname'},
                {title: '规格型号', width: 180, key: 'cinvstd'},
                {title: '主计量', width: 180, key: 'cinvm_unit'},
                {title: '数量', width: 180, key: 'iquantity', className: "width: 180,keytable_table_style_column_right"},
                {title: '计划到货日期', width: 180, key: 'darrivedate'},
                {title: '暂停状态', width: 180, key: 'cbdefine21'},
                {title: '制单人', width: 180, key: 'cmaker'},
                {title: '行关闭人', width: 180, key: 'cbcloser'},
                {title: '确认状态', width: 180, key: 'PoConfirmStatus'},
                {title: '确认时间', width: 180, key: 'PoConfirmTime'},
                {title: '技术要求', width: 180, key: 'cbdefine9'},
                {title: '备注1', width: 180, key: 'cbdefine12'},
                {title: '备注2', width: 180, key: 'cbdefine13'},
                {title: '备注3', width: 180, key: 'cbdefine14'}
            ],
            data: [
                {
                    "id": 1000004498,
                    "poid": "1000000531",
                    "cbustype": "普通采购",
                    "cpoid": "G1180101427",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-01-06 15:22:58",
                    "cauditdate": "2018-01-06 00:00:00",
                    "cvencode": "12008",
                    "cvenabbname": "康成",
                    "cdepname": "装配-整车车间",
                    "cpersonname": "赵君君",
                    "cexch_name": "人民币",
                    "SOCode": "18D2002",
                    "cdefine24": "1-1",
                    "cinvcode": "531417-20900-001",
                    "cinvname": "消声器安装挂耳胶圈",
                    "cinvstd": null,
                    "cinvm_unit": "件",
                    "iquantity": 720,
                    "darrivedate": "2018-01-25 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "罗建聪",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000004499,
                    "poid": "1000000531",
                    "cbustype": "普通采购",
                    "cpoid": "G1180101427",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-01-06 15:22:58",
                    "cauditdate": "2018-01-06 00:00:00",
                    "cvencode": "12008",
                    "cvenabbname": "康成",
                    "cdepname": "装配-整车车间",
                    "cpersonname": "赵君君",
                    "cexch_name": "人民币",
                    "SOCode": "18D2002",
                    "cdefine24": "1-1",
                    "cinvcode": "531418-20900-001",
                    "cinvname": "消声器安装挂耳衬套",
                    "cinvstd": null,
                    "cinvm_unit": "件",
                    "iquantity": 720,
                    "darrivedate": "2018-01-25 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "罗建聪",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000005453,
                    "poid": "1000000645",
                    "cbustype": "普通采购",
                    "cpoid": "G1180101541",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-01-06 15:23:40",
                    "cauditdate": "2018-01-06 00:00:00",
                    "cvencode": "11103",
                    "cvenabbname": "广州杰久",
                    "cdepname": "装配-整车车间",
                    "cpersonname": "罗建聪",
                    "cexch_name": "人民币",
                    "SOCode": "17C2021",
                    "cdefine24": "1-1",
                    "cinvcode": "631100-20100-102",
                    "cinvname": "随车工具",
                    "cinvstd": "出口升级款。(其他要求见备注)",
                    "cinvm_unit": "件",
                    "iquantity": 85,
                    "darrivedate": "2018-01-15 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "赵君君",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006286,
                    "poid": "1000000810",
                    "cbustype": "普通采购",
                    "cpoid": "G1180101705",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-01-06 15:21:49",
                    "cauditdate": "2018-01-06 00:00:00",
                    "cvencode": "11109",
                    "cvenabbname": "广州稻田",
                    "cdepname": "装配-整车车间",
                    "cpersonname": "刘虎",
                    "cexch_name": "人民币",
                    "SOCode": "18D2002",
                    "cdefine24": "3-1",
                    "cinvcode": "624000-20400-002",
                    "cinvname": "喇叭罩铝标贴",
                    "cinvstd": "本田王款",
                    "cinvm_unit": "件",
                    "iquantity": 540,
                    "darrivedate": "2018-01-01 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "罗建聪",
                    "cbcloser": "",
                    "PoConfirmStatus": "已确认",
                    "PoConfirmTime": "2018-04-02 10:50:41",
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006962,
                    "poid": "1000000854",
                    "cbustype": "普通采购",
                    "cpoid": "G3180101135",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-03-03 09:24:53",
                    "cauditdate": "2018-03-03 00:00:00",
                    "cvencode": "21003",
                    "cvenabbname": "广州新以利（原中马）",
                    "cdepname": "采购计划-二轮",
                    "cpersonname": "向峰林",
                    "cexch_name": "人民币",
                    "SOCode": "18D2001",
                    "cdefine24": "5-1",
                    "cinvcode": "131700-10100-001A",
                    "cinvname": "凸轮齿轮",
                    "cinvstd": "（中马）",
                    "cinvm_unit": "件",
                    "iquantity": 235,
                    "darrivedate": "2018-01-05 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "向峰林",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006963,
                    "poid": "1000000854",
                    "cbustype": "普通采购",
                    "cpoid": "G3180101135",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-03-03 09:24:53",
                    "cauditdate": "2018-03-03 00:00:00",
                    "cvencode": "21003",
                    "cvenabbname": "广州新以利（原中马）",
                    "cdepname": "采购计划-二轮",
                    "cpersonname": "向峰林",
                    "cexch_name": "人民币",
                    "SOCode": "18D2001",
                    "cdefine24": "6-1",
                    "cinvcode": "131700-10100-001A",
                    "cinvname": "凸轮齿轮",
                    "cinvstd": "（中马）",
                    "cinvm_unit": "件",
                    "iquantity": 235,
                    "darrivedate": "2018-01-05 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "向峰林",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006964,
                    "poid": "1000000854",
                    "cbustype": "普通采购",
                    "cpoid": "G3180101135",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-03-03 09:24:53",
                    "cauditdate": "2018-03-03 00:00:00",
                    "cvencode": "21003",
                    "cvenabbname": "广州新以利（原中马）",
                    "cdepname": "采购计划-二轮",
                    "cpersonname": "向峰林",
                    "cexch_name": "人民币",
                    "SOCode": "18D2001",
                    "cdefine24": "7-1",
                    "cinvcode": "131700-10100-001A",
                    "cinvname": "凸轮齿轮",
                    "cinvstd": "（中马）",
                    "cinvm_unit": "件",
                    "iquantity": 200,
                    "darrivedate": "2018-01-05 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "向峰林",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006965,
                    "poid": "1000000854",
                    "cbustype": "普通采购",
                    "cpoid": "G3180101135",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-03-03 09:24:53",
                    "cauditdate": "2018-03-03 00:00:00",
                    "cvencode": "21003",
                    "cvenabbname": "广州新以利（原中马）",
                    "cdepname": "采购计划-二轮",
                    "cpersonname": "向峰林",
                    "cexch_name": "人民币",
                    "SOCode": "18D2001",
                    "cdefine24": "1-1",
                    "cinvcode": "131700-10100-001A",
                    "cinvname": "凸轮齿轮",
                    "cinvstd": "（中马）",
                    "cinvm_unit": "件",
                    "iquantity": 360,
                    "darrivedate": "2018-01-05 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "向峰林",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006966,
                    "poid": "1000000854",
                    "cbustype": "普通采购",
                    "cpoid": "G3180101135",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-03-03 09:24:53",
                    "cauditdate": "2018-03-03 00:00:00",
                    "cvencode": "21003",
                    "cvenabbname": "广州新以利（原中马）",
                    "cdepname": "采购计划-二轮",
                    "cpersonname": "向峰林",
                    "cexch_name": "人民币",
                    "SOCode": "18D2001",
                    "cdefine24": "2-1",
                    "cinvcode": "131700-10100-001A",
                    "cinvname": "凸轮齿轮",
                    "cinvstd": "（中马）",
                    "cinvm_unit": "件",
                    "iquantity": 1800,
                    "darrivedate": "2018-01-05 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "向峰林",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                },
                {
                    "id": 1000006967,
                    "poid": "1000000854",
                    "cbustype": "普通采购",
                    "cpoid": "G3180101135",
                    "dpodate": "2018-01-01 00:00:00",
                    "caudittime": "2018-03-03 09:24:53",
                    "cauditdate": "2018-03-03 00:00:00",
                    "cvencode": "21003",
                    "cvenabbname": "广州新以利（原中马）",
                    "cdepname": "采购计划-二轮",
                    "cpersonname": "向峰林",
                    "cexch_name": "人民币",
                    "SOCode": "18D2001",
                    "cdefine24": "3-1",
                    "cinvcode": "131700-10100-001A",
                    "cinvname": "凸轮齿轮",
                    "cinvstd": "（中马）",
                    "cinvm_unit": "件",
                    "iquantity": 720,
                    "darrivedate": "2018-01-05 00:00:00",
                    "cbdefine21": "正常",
                    "cmaker": "向峰林",
                    "cbcloser": "",
                    "PoConfirmStatus": "待确认",
                    "PoConfirmTime": null,
                    "cbdefine9": null,
                    "cbdefine12": null,
                    "cbdefine13": null,
                    "cbdefine14": null
                }
            ],
            data1: [
                {
                    "iquantity": 720
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
