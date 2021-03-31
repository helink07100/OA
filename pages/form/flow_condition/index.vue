<template>
    <LayoutPage :title="$t('新增条件')" :loading="loading">
        <titleColumn :style="{ 'margin-bottom': '20px' }" title="审批条件设定">
            <span
                slot="left"
                class="fs-sixteen ml-md text-primary cp"
                @click="
                    $router.push({
                        path: '/form/add',
                        query: { form_id: form.form_id, step: 2 }
                    })
                "
            >
                <i class="iconfont icon-fanhui fs-fourteen"></i>
                <label>返回</label>
            </span>
        </titleColumn>
        <Card title="当审批同时满足以下条件时">
            <div slot="other">
                <label
                    class="add-if text-primary cp ml-md"
                    @click="addConditionDialogShow = true"
                >
                    <i class="iconfont fs-twelve icon-tianjiaricheng"></i>
                    <span class="fs-fourteen">新增条件审批</span>
                </label>
            </div>
            <Condition
                ref="condition"
                :options="conditions"
                :levels="powerLevels"
                @change="changeHandle"
            />
        </Card>
        <defaultApprover
            ref="defaultApprover"
            page-load-name="flow_condition"
            title="对应审批人"
            :nodes="approverNodes"
            :cc-list="defaultCcs"
            @approverchange="approverChange"
            @delnodes="delNodes"
        >
            <el-button slot="submitButton" type="primary" @click="formValidate"
                >提交</el-button
            >
        </defaultApprover>
        <component
            :is="'addConditionDialog'"
            ref="optionCondition"
            :dialog-visible="addConditionDialogShow"
            :controls="field_configs"
            :checkeds="controlsCheckeds"
            @close="addConditionDialogShow = false"
            @define="addConditionTo"
        >
        </component>
    </LayoutPage>
</template>

<script>
import Condition from './src/components/condition'
import addConditionDialog from './src/components/add_condition'
import defaultApprover from '~/pages/form/add/src/components/audit/default_approver'
import Card from '~/components/page/card'
import titleColumn from '~/components/page/title_column'
const conditionConfig = {
    control_1: {
        name: '发起人',
        type: 'initiator'
    },
    control_2: {
        name: '发起人岗位等级',
        type: 'orgrank'
    }
}
export default {
    components: {
        titleColumn,
        Card,
        Condition,
        addConditionDialog,
        defaultApprover
    },
    data() {
        return {
            loading: false,
            conditions: {},
            field_configs: {},
            controlsCheckeds: [], // ['control_1', 'control_2'],
            powerLevels: {},
            addConditionDialogShow: false,
            approverNodes: [],
            defaultCcs: [],
            form: {
                form_id: (() => {
                    return this.$route.query.form_id
                })(),
                flow_id: (() => {
                    return this.$route.query.flow_id
                })()
            }
        }
    },
    mounted() {
        this.getBaseData()
    },
    methods: {
        async getBaseData() {
            // 获取基础数据
            this.loading = true
            const res = await this.$api.form.getPowerLevels({
                form_id: this.form.form_id
            })
            if (res) {
                this.powerLevels = res.data
            }
            // 编辑时调用
            if (this.form.flow_id) {
                const res = await this.$api.form.getFlowDetail({
                    form_id: this.form.form_id,
                    flow_id: this.form.flow_id
                })
                const detailData = res.data
                if (res) {
                    const field_configs = Object.assign(
                        {},
                        conditionConfig,
                        JSON.parse(detailData.form_info.field_configs)
                    )
                    for (const key in field_configs) {
                        if (field_configs[key].type === 'multi_select')
                            field_configs[key].value = []
                    }

                    this.field_configs = field_configs

                    this.approverNodes = detailData.nodes
                        ? detailData.nodes
                        : []
                    const ccStr = detailData.flow_info.default_cc
                    const ccs = ccStr ? ccStr.split(',') : []
                    if (detailData.flow_info.conditions) {
                        console.log(
                            this.field_configs,
                            detailData.flow_info.conditions
                        )
                        debugger
                        this.HandleEditDataInit(
                            JSON.parse(detailData.flow_info.conditions)
                        )
                    }
                    // 用人员ID取抄送人相关数据
                    const organizations = this.$store.state.form.organizations
                    this.defaultCcs = this.$utils.common.ArrayGetOrgDataItem(
                        ccs,
                        organizations
                    )
                }
            } else {
                // 新增时才调用
                const rs = await this.$api.form.getFlowFormConfigs({
                    form_id: this.form.form_id
                })
                if (rs) {
                    const field_configs = Object.assign(
                        {},
                        conditionConfig,
                        JSON.parse(rs.data.field_configs)
                    )

                    for (const key in field_configs) {
                        if (field_configs[key].type === 'multi_select')
                            field_configs[key].value = []
                    }

                    this.field_configs = field_configs
                }
            }
            this.loading = false
        },
        HandleEditDataInit(conditions) {
            if (!conditions) return
            // 处理编辑时的默认数据
            delete conditions.third_form_sn
            delete conditions._timezone_offset
            debugger
            for (const key in conditions) {
                const item = conditions[key]
                if (key === 'initiator') {
                    const initiator = this.$utils.common.getIds(
                        conditions.initiator,
                        '<Object>Array'
                    )
                    const initiatorArray = this.$utils.common.ArrayGetOrgDataItem(
                        initiator,
                        this.$store.state.form.organizations
                    )
                    conditions[key].initiator = initiatorArray
                    const initiatorItem = Object.assign(
                        this.field_configs.control_1,
                        item
                    )
                    this.field_configs.control_1 = initiatorItem
                    this.controlsCheckeds.push('control_1')
                    this.conditions.control_1 = initiatorItem
                } else if (key === 'orgrank') {
                    const orgrankItem = Object.assign(
                        this.field_configs.control_2,
                        item
                    )
                    this.field_configs.control_2 = orgrankItem
                    this.conditions.control_2 = orgrankItem
                    this.controlsCheckeds.push('control_2')
                } else {
                    if (item.type === 'multi_select') {
                        item.value = item.val.split(',')
                    }
                    let otherItem
                    if (this.field_configs[key]) {
                        otherItem = Object.assign(this.field_configs[key], item)
                    } else {
                        otherItem = item
                    }
                    this.field_configs[key] = otherItem
                    this.controlsCheckeds.push(key)
                    this.conditions[key] = otherItem
                }
            }

            this.changeHandle({
                controls: this.conditions,
                delControl: ''
            })
        },

        addConditionTo($event) {
            this.conditions = Object.assign({}, $event, this.conditions)
            this.addConditionDialogShow = false
        },

        // 当审批同时满足以下条件时  修改时触发
        changeHandle(params) {
            const { controls, delControl } = params
            // 设置-新增条件审批-弹窗多选项
            this.conditions = JSON.parse(JSON.stringify(controls))
            // 删除条件
            if (delControl) {
                this.field_configs[delControl].initiator = []
                this.field_configs[delControl].m = []

                this.field_configs[delControl].con = ''
                this.field_configs[delControl].val = ''
            }

            this.controlsCheckeds = this.$refs.optionCondition.getCheckedsKey(
                controls
            )
        },
        approverChange(data) {
            this.approverNodes = data.submiteNodes
        },
        delNodes(index) {
            this.approverNodes.splice(index, 1)
        },
        formValidate() {
            let submitNumber = 0
            this.$refs.condition.$refs.form.validate((valid) => {
                if (valid) {
                    submitNumber++
                } else {
                    this.$log('condition error submit!!')
                    return false
                }
            })
            this.$refs.defaultApprover.$refs.form.validate((valid) => {
                if (valid) {
                    submitNumber++
                } else {
                    this.$log('defaultApprover error submit!!')
                    return false
                }
            })

            if (submitNumber >= 2) {
                // 表单验证通过可以提交
                this.submitForm()
            } else {
                submitNumber = 0
            }
        },
        filtersKeyData(arrs) {
            const newObj = {}
            for (let i = 0; i < arrs.length; i++) {
                const preFix = String(arrs[i].type).substring(0, 1)
                if (!newObj[preFix]) newObj[preFix] = []
                newObj[preFix].push(arrs[i].key)
            }
            return newObj // { 'm' : ["52_27"], 's' : ['213']... }
        },
        async submitForm() {
            this.loading = true
            const approverForm = this.$refs.defaultApprover.$refs.form.model
            const conditionForm = this.$refs.condition.$refs.form.model
            const conditions = {}
            // 组装数据
            for (const k in conditionForm) {
                const item = conditionForm[k]
                if (item.type === 'initiator') {
                    // 处理 发起人
                    conditions[item.type] = this.filtersKeyData(item.initiator)
                } else if (item.type === 'orgrank') {
                    // 处理 发起人岗位等级
                    conditions[item.type] = {
                        con: item.con,
                        val: item.val
                    }
                } else if (
                    item.type === 'number' ||
                    item.type === 'money' ||
                    item.type === 'date_range'
                ) {
                    if (!conditions[k]) conditions[k] = {}
                    conditions[k].name = item.name
                    conditions[k].type = item.type
                    conditions[k].gt = item.gt
                    conditions[k].val = item.val
                    conditions[k].con = item.con
                    conditions[k].addcon = item.addcon
                    conditions[k].addval = item.addval
                } else if (
                    item.type === 'select' ||
                    item.type === 'multi_select'
                ) {
                    // 单选与多选
                    if (!conditions[k]) conditions[k] = {}
                    conditions[k].name = item.name
                    conditions[k].type = item.type
                    if (item.type === 'select') {
                        conditions[k].val = item.val
                    } else {
                        conditions[k].val = item.value.join(',')
                    }
                }
            }
            const submiteNodes = approverForm.submiteNodes
            submiteNodes.forEach((item) => {
                delete item.checkeds
                delete item.item_info
                delete item.pass_type
                delete item.form_id
                delete item.flow_id
            })
            const submitData = {
                form_id: this.form.form_id,
                copy_push_ids: approverForm.default_cc.split(','),
                conditions,
                nodes: JSON.parse(JSON.stringify(submiteNodes))
            }
            this.$log(submitData)
            const res = await this.$api.form.flowMoreCondition({
                json_config: JSON.stringify(submitData),
                default_cc: approverForm.default_cc,
                form_id: this.form.form_id,
                flow_id: this.form.flow_id
            })
            this.loading = false
            if (res) {
                this.$message.success('审批条件设定成功')
                // 如果不需要跳转还需要做表单清除
                if (this.form.flow_id) {
                    this.getBaseData()
                } else {
                    this.changeHandle({ controls: '', delControl: '' })
                    this.$refs.defaultApprover.defaultCcs = []
                    this.approverNodes = []
                }
                setTimeout(() => {
                    // 直接提交也需要修改
                    this.field_configs.control_1.initiator = []
                    this.field_configs.control_1.m = []
                    this.field_configs.control_2.con = ''
                    this.field_configs.control_2.val = ''

                    this.$router.push({
                        path: '/form/add',
                        query: { form_id: this.form.form_id, step: 2 }
                    })
                }, 1000)
            }
        }
    }
}

/*  提交表单数据
form_id: 121
flow_id: 221
json_config: {
  "form_id":"121",
  "copy_push_ids":["407_245","447_11081","485_75"],
  "conditions":{
    "orgrank":{"con":"<=","val":"6"},
    "control_1004":{"name":"开始时间","type":"date_range","gt":">=|<","val":"5","con":">=","addcon":"<","addval":"8"},
    "control_1002":{"name":"数字输入框","type":"number","gt":">=","addval":"8"},
    "initiator":{"m":["485_75","445_265"]}},
    "nodes":[{"id":1003,"third_form_sn":"","step":1,"approve_pass":"order","approve_type":"operator","user_type":"organization","department_set":"leader","organization_set":"leader","create_time":1586319247,"create_user":"1000000001","update_time":0,"update_user":"","delete_time":0,"delete_user":""},{"id":1005,"third_form_sn":"","step":2,"approve_pass":"order","approve_type":"final","user_type":"organization","department_set":"leader","organization_set":"superior","create_time":1586319255,"create_user":"1000000001","update_time":0,"update_user":"","delete_time":0,"delete_user":""}]
  }
default_cc: 407_245,447_11081,485_75
*/
</script>
