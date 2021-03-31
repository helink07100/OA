<template>
    <LayoutPage
        :title="isChild ? '添加子管理员' : '添加管理员'"
        :loading="loading"
    >
        <div slot="header-right">
            <p class="text-warning">
                这里只能创建管理员，普通员工在体制系统里创建
            </p>
        </div>
        <div class="page-content add-admin">
            <el-form
                ref="form"
                class="form-box"
                label-width="120px"
                :model="form"
                :rules="rules"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input
                                v-model="form.username"
                                placeholder="请输入用户名"
                            >
                                <template v-if="isChild" slot="prepend">{{
                                    prefix
                                }}</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户密码" prop="password">
                            <el-input
                                v-model="form.password"
                                show-password
                                placeholder="必须大于6位，包含大小写字母和数字"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="realname">
                            <el-input
                                v-model="form.realname"
                                placeholder="请输入姓名"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属机构" prop="organization_id">
                            <span v-if="isChild">
                                {{
                                    Object.values(organizations).find((i) => {
                                        return (
                                            i.id === this.form.organization_id
                                        )
                                    }).name
                                }}
                            </span>
                            <el-select
                                v-else
                                v-model="form.organization_id"
                                placeholder="请选择归属机构"
                                :style="{ width: '100%' }"
                                @change="getDepartments()"
                            >
                                <el-option
                                    v-for="(item, index) in organizations"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="归属部门" prop="department_id">
                            <el-select
                                v-model="form.department_id"
                                placeholder="请选择归属部门"
                                :style="{ width: '100%' }"
                                @change="getStation()"
                            >
                                <el-option
                                    v-for="(item, index) in departments"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归属岗位" prop="station_id">
                            <el-select
                                v-model="form.station_id"
                                placeholder="请选择归属岗位"
                                :style="{ width: '100%' }"
                            >
                                <el-option
                                    v-for="(item, index) in stations"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="审批单权限" prop="control">
                            <el-select
                                v-model="form.appro_permission"
                                multiple
                                placeholder="请选择审批单权限"
                                class="w100"
                            >
                                <el-option
                                    v-for="item in permissionList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item v-if="!isChild" label="用户组">
                    <el-checkbox-group v-model="form.groups">
                        <el-checkbox
                            v-for="(name, key) in groups"
                            :key="key"
                            :label="key"
                            >{{ name }}</el-checkbox
                        >
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </LayoutPage>
</template>

<script>
import mixin from '@/mixins/admin_add_edit'
export default {
    mixins: [mixin],
    data() {
        return {
            // 是否是子管理员
            isChild: this.$route.query.isChild,
            prefix: '',
            permissionList: []
        }
    },
    mounted() {
        this.getAddBaseData()

        // 子管理员 手动触发
        if (this.isChild) {
            this.form.organization_id = this.$store.state.user.user.organization_id
            this.getDepartments()
        }
    },
    methods: {
        async getAddBaseData() {
            this.loading = true
            const res = await this.$api.admin.getAdminAddBaseData()
            const res1 = await this.$api.admin.getPermission({
                org_id: this.organization_id
            })
            if (res) {
                this.organizations = res.data.organizations
                this.groups = res.data.cur_user_info.group_options2
                this.prefix = res.data.prefix
            }

            if (res1) {
                this.permissionList = res1.data.list
            }

            this.loading = false
        },
        async submitForm() {
            this.loading = true
            let apiName = 'add'
            // 添加子管理员
            if (this.isChild) {
                apiName = 'addChildAdmin'
                this.form.groups = 3
            }
            const res = await this.$api.admin[apiName](this.form)
            if (res) {
                this.$message.success(this.$t('添加成功'))
                if (this.isChild) {
                    this.$router.push('/admin/index_child')
                } else {
                    this.$router.push('/admin')
                }
            }
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped></style>
