<template>
    <div>
        <Row>
            <Col span="18">
            <Card>
                <p slot="title">权限管理</p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                <Tree :data="data" :render="renderContent"></Tree>
            </Card>
            </Col>
        </Row>
        <Modal v-model="addModalShow" title="添加权限">
            <Form ref="permitForm" :model="permitForm" :rules="permitRuleValidate" :label-width="80">
                <FormItem label="上一层">
                    <Input v-model="permitForm.parent" readonly></Input>
                </FormItem>
                <FormItem label="权限名" prop="title">
                    <Input v-model="permitForm.title" placeholder="权限名"></Input>
                </FormItem>
                <FormItem label="标识码" prop="permitid">
                    <Input v-model="permitForm.permitid" placeholder="权限标识码" :readonly="permitEdit"></Input>
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input v-model="permitForm.desc" placeholder="不超过20字符串"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button v-if="!permitEdit" type="primary" @click="addPermit('permitForm')">添加</Button>
                <Button v-else type="primary" @click="modifyPermit('permitForm')">修改</Button>
                <!-- <Button type="ghost" @click="handleReset('permitForm')" style="margin-left: 8px">重置</Button> -->
            </div>
        </Modal>
    </div>
</template>

<script>
let findInChildrenArray = function (arr, permitid) {
    for (let index = 0; index < arr.length; index++) {
        let element = arr[index];
        if (element.permitid === permitid) {
            return element;
        }
        else {
            if (element.children) {
                let data = findInChildrenArray(element.children, permitid);
                if (data) {
                    return data;
                }
            }
        }
    }
    console.log('false');
    return false;
}
export default {
    data() {
        return {
            data: [
                {
                    title: '权限',
                    permitid: '0',
                    desc: '不能删除,不能修改!',
                    expand: true,
                    render: (h, {root, node, data}) => {
                        return h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%'
                            }
                        }, [
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                        h('Button', {
                                            props: Object.assign({}, this.buttonProps, {
                                                icon: 'ios-plus-empty',
                                                type: 'primary'
                                            }),
                                            style: {
                                                width: '86px'
                                            },
                                            on: {
                                                click: () => {this.append(data)}
                                            }
                                        })
                                    ]),
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', `${data.title}`),
                                    h('span', {style: {color: '#bbbec4'}}, `【${data.desc}】`),
                                    h('Tag', {style: {float: 'right'}}, `标识码${data.permitid}`)
                                ])
                            ]);
                    }
                    // children: [
                    //     {
                    //         title: 'child 1-1',
                    //         expand: true,
                    //         children: [
                    //             {
                    //                 title: 'leaf 1-1-1',
                    //                 expand: true
                    //             },
                    //             {
                    //                 title: 'leaf 1-1-2',
                    //                 expand: true
                    //             }
                    //         ]
                    //     },
                    //     {
                    //         title: 'child 1-2',
                    //         expand: true,
                    //         children: [
                    //             {
                    //                 title: 'leaf 1-2-1',
                    //                 expand: true
                    //             },
                    //             {
                    //                 title: 'leaf 1-2-1',
                    //                 expand: true
                    //             }
                    //         ]
                    //     }
                    // ]
                }
            ],
            buttonProps: {
                type: 'ghost',
                size: 'small',
            },
            addModalShow: false,
            permitForm: {
                parentPermitid: '',
                parentTitle: '',
                title: '',
                permitid: '',
                desc: ''
            },
            permitRuleValidate: {
                title: [
                    {required: true, message: '权限名不能为空', trigger: 'blur'},
                ],
                permitid: [
                    {required: true, message: '权限标识码不能为空', trigger: 'blur'}
                ],
                desc: [
                    {required: true, message: '权限描述不能为空', trigger: 'blur'},
                    {type: 'string', max: 20, message: '描述不能多于20字符', trigger: 'blur'}
                ]
            },
            permitEdit: false
        };
    },
    methods: {
        renderContent(h, {root, node, data}) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'edit'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => {this.edit(data)}
                                }
                            }),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-plus-empty'
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: () => {this.append(data)}
                                }
                            }),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-minus-empty',
                                    disabled: node.children && node.children.length > 0
                                }),
                                on: {
                                    click: () => {this.remove(root, node, data)}
                                }
                            })
                        ]),
                    h('span', [
                        h('Icon', {
                            props: {
                                type: node.children && node.children.length > 0 ? 'ios-folder' : 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', `${data.title}`),
                        h('span', {style: {color: '#bbbec4'}}, `【${data.desc}】`),
                        h('Tag', {style: {float: 'right'}}, `标识码${data.permitid}`)
                    ])
                ]);
        },
        edit(data) {
            this.permitEdit = true;
            this.addModalShow = true;
            this.permitForm = Object.assign({}, this.permitForm, {
                parent: data.title,
                parentPermitid: data.permitid,
                title: data.title,
                permitid: data.permitid,
                desc: data.desc,
            });
            // console.log(data);
        },
        append(data) {
            this.permitEdit = false;
            this.permitForm.parent = data.title;
            this.permitForm.parentPermitid = data.permitid;
            this.handleReset('permitForm');
            this.addModalShow = true;
            // const children = data.children || [];
            // children.push({
            //     title: 'appended node',
            //     expand: true
            // });
            // this.$set(data, 'children', children);
        },
        remove(root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        addPermit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 判断是否重复
                    if (findInChildrenArray(this.data, this.permitForm.permitid)) {
                        this.$Message.error('已存在该标识码');
                    }
                    else {
                        let curPermitId = this.permitForm.parentPermitid;
                        let parent = findInChildrenArray(this.data, curPermitId);
                        if (parent) {
                            const children = parent.children || [];
                            children.push({
                                title: this.permitForm.title,
                                permitid: this.permitForm.permitid,
                                desc: this.permitForm.desc,
                                expand: true
                            });
                            this.$set(parent, 'children', children);
                            this.$Message.success('Success!');
                            this.addModalShow = false;
                        }
                        else {
                            this.$Message.error('无法找到根');
                        }
                    }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        modifyPermit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let curPermitId = this.permitForm.permitid;
                    let cur = findInChildrenArray(this.data, curPermitId);
                    if (cur) {
                        cur.title = this.permitForm.title;
                        cur.desc = this.permitForm.desc;
                        this.addModalShow = false;
                    }
                    else {
                        this.$Message.error('无法找到该权限');
                    }
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>

</style>
