<template>
    <LayoutPage :title="editTitle" :loading="loading">
        <div class="page-content">
            <el-form
                ref="form"
                class="form-box"
                label-width="120px"
                :model="form"
                :rules="rules"
            >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="用户名：">
                            {{ form.username }}
                        </el-form-item>
                    </el-col>
                    <el-col v-if="users.is_admin === 0" :span="12">
                        <el-form-item label="别名：">
                            {{ users.nickname }}
                        </el-form-item>
                    </el-col>
                    <el-col v-if="users.is_admin === 0" :span="12">
                        <el-form-item label="部门：">
                            {{ users.department_name }}
                        </el-form-item>
                    </el-col>
                    <el-col v-if="users.is_admin === 0" :span="12">
                        <el-form-item label="岗位：">
                            {{ users.station_name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码：">
                            <a
                                href="javascript:;"
                                class="text-primary"
                                @click="showResetPwd = true"
                                >重置密码</a
                            >
                        </el-form-item>
                    </el-col>
                </el-row>
                <template v-if="users.is_admin !== 0">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名：" prop="realname">
                                <el-input
                                    v-model="form.realname"
                                    placeholder="请输入姓名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="归属机构："
                                prop="organization_id"
                            >
                                <span v-if="isChild">
                                    {{
                                        Object.values(organizations).find(
                                            (i) => {
                                                return (
                                                    i.id ===
                                                    this.form.organization_id
                                                )
                                            }
                                        ).name
                                    }}
                                </span>
                                <el-select
                                    v-else
                                    v-model="form.organization_id"
                                    placeholder="请选择归属机构："
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
                            <el-form-item
                                label="归属部门："
                                prop="department_id"
                            >
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
                            <el-form-item label="归属岗位：" prop="station_id">
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
                </template>
                <el-row v-if="userType === 'normal'" :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="登录时长：" prop="session_expire">
                            <el-input
                                v-model="form.session_expire"
                                placeholder="请输入登录时长"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="userType !== 'normal'">
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
                <el-form-item
                    v-if="userType !== 'normal' && !isChild"
                    label="用户组："
                >
                    <el-checkbox-group v-model="form.groups">
                        <el-checkbox
                            v-for="(name, key) in groups"
                            :key="key"
                            :label="key"
                            :disabled="form.groups.indexOf('3') > -1"
                            >{{ name }}</el-checkbox
                        >
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <ResetPwd :show="showResetPwd" @close="showResetPwd = false" />
    </LayoutPage>
</template>

<script>
import ResetPwd from './components/reset_pwd'
import mixin from '@/mixins/admin_add_edit'
export default {
    components: {
        ResetPwd
    },
    mixins: [mixin],
    data() {
        return {
            showResetPwd: false,
            // 是否是子管理员
            isChild: this.$route.query.isChild,
            userType: this.$route.query.type,
            users: {},
            permissionList: []
        }
    },
    computed: {
        editTitle() {
            let title = ''
            if (this.userType === 'normal') {
                title = '编辑普通员工'
            } else if (this.isChild) {
                title = '编辑子管理员'
            } else {
                title = '编辑管理员'
            }
            return title
        }
    },
    mounted() {
        this.form.id = this.$route.query.id
        this.getEditBaseData()
    },
    methods: {
        async getEditBaseData() {
            this.loading = true
            const res = await this.$api.admin.getAdminEditBaseData({
                id: this.form.id
            })
            if (res) {
                this.organizations = res.data.organizations
                this.groups = res.data.cur_user_info.group_options2
                this.form.groups = res.data.user.groups
                this.form.username = res.data.user.username
                this.form.realname = res.data.user.realname
                this.form.session_expire = res.data.user.session_expire
                this.form.organization_id = res.data.user.organization_id
                this.form.department_id = res.data.user.department_id
                this.form.station_id = res.data.user.station_id

                if (res.data.user.appro_permission) {
                    const list = res.data.user.appro_permission.split(',')
                    this.form.appro_permission = list.map((i) => {
                        return parseInt(i)
                    })
                }
                this.users = res.data.user
            }
            if (this.form.organization_id) this.getDepartments()
            if (this.form.department_id) this.getStation()

            const res1 = await this.$api.admin.getPermission({
                org_id: this.form.organization_id
            })
            this.permissionList = res1.data.list

            setTimeout(() => {
                this.loading = false
            }, 1000)
        },
        async submitForm() {
            this.loading = true
            const res = await this.$api.admin.edit(this.form)
            if (res) {
                this.$message.success(this.$t('修改成功'))

                setTimeout(() => {
                    this.$router.go(-1)
                }, 1500)
            }
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped></style>
