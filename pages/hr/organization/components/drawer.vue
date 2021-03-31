<template>
  <div class="drawer">
    <el-drawer
      size="70%"
      :visible.sync="visible"
      direction="rtl"
      :with-header="false"
      :before-close="handleClose"
    >
      <div class="header">基本信息</div>
      <div style="overflow: auto">
        <Card title="个人信息">
          <el-row :gutter="30" class="row">
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">工号：</el-col>
                <el-col :span="12">{{ dataSource.sn }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">别名：</el-col>
                <el-col :span="12">{{ dataSource.nickname }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">证件名：</el-col>
                <el-col :span="12">{{ dataSource.name }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">国籍：</el-col>
                <el-col :span="12">{{ dataSource.nationality_txt }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">性别：</el-col>
                <el-col :span="12">{{ dataSource.sex_txt }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">婚姻状况：</el-col>
                <el-col :span="12">{{ dataSource.marital_status_txt }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">最高学历：</el-col>
                <el-col :span="12">{{ dataSource.edu_high_txt }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">毕业院校：</el-col>
                <el-col :span="12">{{ dataSource.university }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-col :span="12" class="label">现居地址：</el-col>
                <el-col :span="12">{{ dataSource.address_dis }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row :gutter="10">
                <el-col :span="6" class="label">联系方式：</el-col>
                <el-col :span="18" style="padding-top: 0; padding-bottom: 0">
                  <el-row
                    :gutter="10"
                    v-for="(item, index) in dataSource.contact_data"
                    :key="index"
                  >
                    <el-col :span="24" job_file
                      >{{ item.way }} - {{ item.value }}</el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row :gutter="10">
                <el-col :span="6" class="label">护照签证：</el-col>
                <el-col :span="18" style="padding-top: 0; padding-bottom: 0">
                  <el-row :gutter="10">
                    <el-col :span="24"
                      >{{ dataSource.visa_type_txt }} -
                      {{ dataSource.visa_time_txt }}</el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row :gutter="10">
                <el-col :span="6" class="label">证件：</el-col>
                <el-col :span="18" style="padding-top: 0; padding-bottom: 0">
                  <el-row :gutter="10">
                    <el-col
                      :span="24"
                      v-for="(item, index) in dataSource.id_data"
                      :key="index"
                      >{{ item.type }} - {{ item.value }}</el-col
                    >
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row :gutter="10">
                <el-col :span="6" class="label">相关资料：</el-col>
                <el-col :span="18" style="padding-top: 0; padding-bottom: 0">
                  <el-row :gutter="10">
                    <el-col
                      :span="24"
                      v-for="(item, index) in dataSource.fileinfo"
                      :key="index"
                    >
                      <div class="download-box">
                        <span
                          class="icon iconfont icon-TUPIAN downloadFile"
                        ></span>
                        <div class="download-link">
                          <span>{{ item.realname }}</span>
                          <a
                            target="_blank"
                            @click.prevent="handleDownloadFile(item)"
                            :href="item.filename"
                            style="color: #4D86FB; font-size: 12px"
                            >附件下载</a
                          >
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </Card>

        <Card title="紧急联系人">
          <el-table
            :data="dataSource.ug_contact_data"
            style="width: 100%"
            header-row-class-name="table-list-header"
            row-class-name="tr-item"
          >
            <el-table-column :label="$t('姓名')" prop="name"></el-table-column>
            <el-table-column
              :label="$t('关系')"
              prop="relation"
            ></el-table-column>
            <el-table-column
              prop="way"
              :label="$t('联系方式')"
            ></el-table-column>
            <el-table-column
              prop="value"
              :label="$t('联系号码')"
            ></el-table-column>
          </el-table>
        </Card>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Card from '@/components/page/card'
import download from '@/utils/download'
export default {
  name: 'hr_organization_drawer',
  components: {
    Card
  },
  props: {
    dataSource: Object,
    visible: Boolean,
    handleClose: Function
  },
  methods: {
    handleDownloadFile(item) {
      download(item.filename, item.realname, true)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background: #f6f7fb;
  border-radius: 2px 2px 0 0;
  text-align: center;
}
.row {
  font-size: 14px;

  .el-col {
    padding: 6px 0;
  }

  .label {
    text-align: right;
  }
}
.drawer /deep/ .el-drawer__body {
  overflow: auto;
}

.download-box {
  display: flex;

  & .download-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & .downloadFile {
    color: #f2bb29;
    font-size: 40px;
    margin-right: 8px;
  }
}
</style>
