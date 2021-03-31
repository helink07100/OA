<template>
  <LayoutPage title="查看收文" :loading="loading">
    <titleColumn :style="{ 'margin-bottom': '20px' }" :title="form.title">
    </titleColumn>
    <div class="receive-con">
      <el-form slot="search" :model="form">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="公告内容：" props="attach_url">
              <div class="content" v-html="form.content"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="公告附件：" props="attach_url">
              <Upload
                v-model="form.attach_url"
                :disabled="true"
                :hide-btn="true"
                :label="$t('选择附件')"
                type="label"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="读取记录：" prop="appro_code">
              <el-button
                class="mr-lg"
                type="primary"
                plain
                @click="showRead('read')"
              >
                查看
              </el-button>
              已读：<span class="text-success ">{{ form.have_read }}</span
              >, <span class=" ml-sm"> 未读：</span
              ><span class="text-danger">{{ form.not_read }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <Read
      :id="id"
      :list="readList"
      :title="form.title"
      :read-visible="readVisible"
      :show-download="false"
      @hideRead="readVisible = false"
    />
  </LayoutPage>
</template>

<script>
import Read from './components/read'
import Upload from '~/components/upload_file'
import titleColumn from '~/components/page/title_column'
export default {
  components: {
    Upload,
    titleColumn,
    Read
  },
  data() {
    return {
      loading: false,
      form: {
        have_read: '',
        not_read: '',
        title: '', // 公告主题
        en_title: '', // 公告主题英文
        content: '', // 公文内容
        attach_url: [] // 公文附件
      },
      id: this.$route.query.id,
      organizationId: this.$route.query.organization_id,
      memberList: [],
      readList: {
        copy_push_ids: {
          all: [],
          not_read: [],
          have_read: []
        },
        main_push_ids: {
          all: [],
          not_read: [],
          have_read: []
        },
        organization: {
          all: [],
          not_read: [],
          have_read: []
        }
      },
      readVisible: false
    }
  },
  mounted() {
    this.getDetail()
    this.getRead()
  },
  methods: {
    async getDetail() {
      this.loading = true
      const res = await this.$api.document.detailDoc({ id: this.id, flag: 2 })
      if (res) {
        const initRes = Array.isArray(res.data.doc_info)
          ? res.data.doc_info[0]
          : res.data.doc_info

        if (initRes.attach_url.length) {
          initRes.attach_url = initRes.attach_url[0]
        } else {
          initRes.attach_url = ''
        }
        this.form = initRes
      }

      this.loading = false
    }, // 已读、未读列表
    async getRead() {
      const res = await this.$api.document.getRead({
        doc_id: this.id
      })

      this.loading = false

      // 字段统一
      if (res) {
        const list = res.data.list ? res.data.list : res.data
        const emptyData = {
          all: [],
          not_read: [],
          have_read: []
        }
        for (const key in this.readList) {
          // 补全字段
          if (!list[key] || !list[key].all) {
            list[key] = emptyData
          }

          for (const nkey in emptyData) {
            list[key][nkey] = list[key][nkey] ? list[key][nkey] : []
            list[key][nkey] = list[key][nkey].map((i) => {
              if (i.name) i.toName = i.station ? i.station : i.name
              i.name = i.organization_name ? i.organization_name : i.name
              return i
            })
          }
        }

        this.readList = list
      }
    },
    // 把所有的人员筛选出来
    filterMember(data, pushArray) {
      if (!pushArray) pushArray = []
      for (let i = 0; i < data.length; i++) {
        // 需要用到部门信息
        if (data[i].type === 'department')
          this.deparmentName = { name: data[i].name, name_en: data[i].name_en }

        // 保存个人信息
        if (data[i].type === 'member') {
          data[i].deparmentName = this.deparmentName
          pushArray.push(data[i])
        } else if (data[i].child && data[i].child.length > 0) {
          this.filterMember(data[i].child, pushArray)
        }
      }
      return pushArray
    },

    // 详情页显示已读未读 弹窗
    showRead(type) {
      this.readVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.receive-con {
  padding: 20px 50px;
  background: #fff;

  /deep/.el-upload-list__item {
    margin-top: 0;
  }

  .content {
    min-height: 100px;
  }
}
</style>
