<template>
  <LayoutPage :title="$t(titleDict[controlName] + '公告')" :loading="loading">
    <div
      class="form-content pt-lg"
      :class="{ 'view-content': controlName === 'view' }"
      :style="{ background: '#fff' }"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="controlName === 'view' ? {} : formRules"
        label-width="200px"
      >
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="公告对象：" prop="doc_kinds">
              <el-select
                :disabled="
                  form.forward_from ||
                    controlName === 'view' ||
                    controlName === 'transfer'
                "
                v-model="form.doc_kinds"
                :style="{ width: '100%' }"
                placeholder="请选择公告对象"
              >
                <el-option
                  v-for="(item, index) in docKinds"
                  :key="'doc_' + index"
                  :label="item.label"
                  :value="parseInt(item.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              v-if="
                ((controlName === 'view' || controlName === 'transfer') &&
                  (controlType === 'get_interagency' ||
                    controlType === 'interagency')) ||
                  form.forward_from
              "
              label="发文单位："
              prop="id"
            >
              {{ computedOrganizationName }}
            </el-form-item>
            <el-form-item v-else label="发文单位：" prop="pub_sig_depart">
              <el-select
                :disabled="controlName === 'view' || form.doc_kinds === 2"
                v-model="form.pub_sig_depart"
                :style="{ width: '100%' }"
                placeholder="请选择发文署名单位"
                @change="pubSigDepartChange"
              >
                <el-option
                  v-for="(item, index) in pubSigDeparts"
                  :key="'pub_' + index"
                  :label="item.name"
                  :value="parseInt(item.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="紧急程度：" prop="deg_emer">
              <el-select
                :disabled="controlName === 'view'"
                v-model="form.deg_emer"
                :style="{ width: '100%' }"
                placeholder="请选择紧急程度"
              >
                <el-option
                  v-for="item in degEmer"
                  :key="'deg_' + item.name"
                  :label="item.name"
                  :value="parseInt(item.value)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="
              form.doc_kinds === 1 ||
                (form.doc_kinds === 3 &&
                  (controlName === 'transfer' ||
                    controlName === 'add' ||
                    controlType === 'published' ||
                    controlType === 'draft'))
            "
            :span="11"
          >
            <el-form-item
              :disabled="controlName === 'view'"
              label="公告属性："
              prop="cate_id"
            >
              <el-select
                :disabled="controlName === 'view'"
                v-model="form.cate_id"
                :style="{ width: '100%' }"
                placeholder="请选择公告属性"
              >
                <el-option
                  v-for="item in cateLists"
                  :key="'cate_' + item.cate_name"
                  :label="item.cate_name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="公告编号：" prop="sn">
              <el-input
                :disabled="controlName === 'view'"
                v-model="form.sn"
                v-loading="sn_loading"
                text="验证中..."
                placeholder="请输入公告编号"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            v-if="
              form.doc_kinds === 1 ||
                (form.doc_kinds === 3 &&
                  (controlName === 'transfer' ||
                    controlName === 'add' ||
                    controlType === 'published' ||
                    controlType === 'draft'))
            "
            :span="11"
          >
            <el-row :gutter="20">
              <el-col :span="3">
                <el-form-item label="置顶设置：" prop="is_top">
                  <el-checkbox
                    v-if="form.is_top || controlName !== 'view'"
                    :disabled="controlName === 'view'"
                    v-model="form.is_top"
                    :true-label="1"
                    name="is_top"
                    :label="1"
                    >置顶
                  </el-checkbox>
                  <div style="padding-left:15px; width: 100px;" v-else>
                    不置顶
                  </div>
                </el-form-item>
              </el-col>
              <el-col v-if="!!form.is_top" :span="5">
                <el-form-item
                  v-if="form.top_date_type !== 0 || controlName !== 'view'"
                >
                  <el-select
                    :disabled="controlName === 'view'"
                    v-model="form.top_date_type"
                    placeholder="请选择"
                    :style="{ width: '118px' }"
                    @change="setTopDate"
                  >
                    <el-option label="3天" :value="1"></el-option>
                    <el-option label="5天" :value="2"></el-option>
                    <el-option label="一个月" :value="3"></el-option>
                    <el-option label="自定义" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-if="form.top_date_type === 0 && form.is_top" :span="8">
                <el-form-item prop="top_time">
                  <el-date-picker
                    :disabled="controlName === 'view'"
                    v-model="form.top_time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="date"
                    :style="{ width: '193px' }"
                    placeholder="年/月/日"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="公告主题（中文）：" prop="title">
              <el-input
                :disabled="controlName === 'view'"
                v-model="form.title"
                placeholder="请输入公告主题"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="公告主题（英文）：" prop="title">
              <el-input
                :disabled="controlName === 'view'"
                v-model="form.en_title"
                placeholder="请输入公告主题英文"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="公告内容：" prop="content">
              <div
                class="ml-md text-normal"
                v-if="controlName === 'view'"
                v-html="form.content"
              ></div>
              <editor
                v-else
                v-model="form.content"
                ref="docEditor"
                class="editor-style"
                :style="{ height: '350px' }"
                :config="editorOption"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="
            form.doc_kinds === 1 ||
              (form.doc_kinds === 3 &&
                (controlName === 'transfer' ||
                  controlName === 'add' ||
                  controlName === 'edit'))
          "
          :gutter="20"
        >
          <el-col :span="22">
            <el-form-item label="主送：" prop="main_push_ids">
              <el-button
                v-if="controlName === 'view'"
                type="primary"
                plain
                @click="showRead('read')"
              >
                查看
              </el-button>
              <Organization
                v-else
                btn-text="选择本机构主送人"
                :key="2"
                from="member"
                v-model="form.main_push_ids"
                :disabled="controlName === 'view'"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-if="form.doc_kinds === 3 || form.doc_kinds === 2"
          :gutter="20"
        >
          <el-col :span="22">
            <el-form-item label="主送：" prop="to_organization">
              <el-button
                v-if="controlName === 'view'"
                type="primary"
                plain
                @click="showRead('read')"
              >
                查看
              </el-button>
              <Organization
                v-else
                :key="1"
                btn-text="选择机构"
                v-model="form.to_organization"
                from="organization"
                apiTop="apiTop"
                :master="controlName === 'view' ? 1 : 0"
                :organizationApi="{
                  name: 'getAllOrganization',
                  topName: 'common'
                }"
                :disabled="controlName === 'view'"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-form-item label="抄送：" prop="copy_push_ids">
              <el-button
                v-if="controlName === 'view'"
                type="primary"
                plain
                @click="showRead('read')"
              >
                查看
              </el-button>
              <Organization
                v-else
                btn-text="选择抄送人"
                :key="3"
                from="member"
                v-model="form.copy_push_ids"
                :disabled="controlName === 'view'"
                :topOrganizationID="copyOrganizationID"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="公告附件：" props="attach_url">
              <Upload
                :hideBtn="controlName === 'view'"
                :label="$t('选择附件')"
                type="label"
                v-model="form.attach_url"
                @input="form.attach_url = $event"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="邮件通知" prop="is_open_mail_notice">
              <el-select
                :disabled="controlName === 'view'"
                v-model="form.is_open_mail_notice"
                filterable
                placeholder="邮件通知"
                :clearable="false"
              >
                <el-option
                  key="email_0"
                  label="发送邮件通知"
                  :value="1"
                ></el-option>
                <el-option
                  key="email_1"
                  label="不发送邮件通知"
                  :value="0"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="公告审批单：" prop="appro_code">
              <el-select
                :disabled="controlName === 'view' || controlName === 'transfer'"
                v-model="form.appro_code"
                filterable
                :style="{ width: '100%' }"
                placeholder="请选择公告审批单"
              >
                <el-option
                  v-for="(item, index) in approCodes"
                  :key="'app_' + index"
                  :label="item.opt_name"
                  :value="item.opt_val"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="24"
            v-if="controlName === 'view' && controlType !== 'draft'"
          >
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
        <el-form-item v-if="controlName === 'edit' || controlName === 'add'">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-button
                :loading="submit_form_loading"
                type="primary"
                @click="validateSubmitForm"
                >发布公告</el-button
              >

              <el-button
                v-if="
                  controlName === 'add' ||
                    (controlName === 'edit' && controlType === 'draft')
                "
                :loading="submit_form_loading"
                type="primary"
                plain
                @click="validateSubmitForm('draft')"
                >暂存</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="controlName === 'transfer'">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-button
                :loading="submit_form_loading"
                type="primary"
                @click="validateSubmitForm"
                >转发公告</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <Read
      v-if="controlType !== 'draft' && controlName === 'view'"
      :list="readList"
      :title="form.title"
      :readVisible="readVisible"
      @hideRead="readVisible = false"
      :id="id"
      :showDownload="controlType === 'published'"
    />
  </LayoutPage>
</template>

<script>
// 此页需要抽空优化一下
import Editor from '@kali/editor'
import Read from './components/read'
import Organization from '~/components/organization'
import Upload from '~/components/upload_file'
export default {
  components: {
    Editor,
    Organization,
    Upload,
    Read
  },
  data() {
    return {
      loading: false,
      formRules: {
        doc_kinds: [
          { required: true, message: '请选择公文种类', trigger: 'change' }
        ],
        pub_sig_depart: [
          { required: true, message: '请选择发文署名单位', trigger: 'change' }
        ],
        deg_emer: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入公文主题', trigger: 'change' },
          {
            min: 1,
            max: 120,
            message: '长度不能超过120个字符',
            trigger: 'change'
          }
        ],
        sn: [
          { required: true, message: '请输入公文编号', trigger: 'change' },
          { validator: this.validator_sn, trigger: 'blur' }
        ],
        top_time: [
          { required: true, message: '请设置置顶时间', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入公文内容', trigger: 'blur' }
        ],
        to_organization: [
          { required: true, message: '选择机构', trigger: 'input' }
        ],
        main_push_ids: [
          { required: true, message: '选择主送人', trigger: 'input' }
        ],
        privacy_level_id: [
          { required: true, message: '请选择保密等级', trigger: 'change' }
        ]
      },
      cateLists: [],
      docKinds: [
        { value: 1, label: '本机构内部' },
        { value: 2, label: '其他机构' },
        { value: 3, label: '本机构及其他机构' }
      ],
      approCodes: [],
      pubSigDeparts: [],
      degEmer: [],
      form: {
        id: '',
        cate_id: '', // 公文属性
        title: '', // 公告主题
        en_title: '', // 公告主题英文
        sn: '', // 公文编号
        main_push_ids: '', // 主送
        copy_push_ids: '', // 抄送
        content: '', // 公文内容
        attach_url: '', // 公文附件
        is_top: false, // 置顶
        top_date_type: '', // 选择
        top_time: '', // 置顶时间
        doc_kinds: 1, // 公文种类
        pub_sig_depart: '', // 发文署名单位
        pub_sig_depart_name: '', // 发文署名单位名称
        deg_emer: 1, // 紧急程度
        is_main_push_confirm: '', // 开启主送对象确认公告内容
        is_open_mail_notice: 1, // 开启邮件通知
        appro_code: '', // 公文审批单
        privacy_level_id: '', // 保密等级
        to_organization: '', // 主送机构
        forward_from: 0 // 判断是不是转发过来的机构内公告
      },
      submit_form_loading: false,
      checkedMainPushIds: [], // main开头的是主送的变量与方法
      checkedCopyPushIds: [], // copy开头的是抄送的变量与方法
      mainDialogVisible: false,
      copyDialogVisible: false,
      sn_loading: false,
      oldSN: '',
      title: '',
      flag: '',
      id: this.$route.query.id,
      organizationId: this.$route.query.organization_id,
      //
      copyOrganizationID: '',
      titleDict: {
        edit: '编辑',
        add: '新增',
        transfer: '转发',
        view: '查看'
      },
      controlName: '', // 编辑、查看、转发
      controlType: '', // 机构内公告、收文、发文、草稿
      /**
       * 公告、收发文、草稿公用的：新增、查看、编辑
       * list： 列表地址，
       * name：操作类型姓名，
       * edit：编辑接口，
       * add：新增接口，
       * transfer：转发接口，
       * view：查看接口
       **/
      formDict: {
        received: {
          list: '/document/received',
          idName: 'id',
          name: '查看收文',
          view: 'detailDoc'
        },
        published: {
          list: '/document/published',
          idName: 'id',
          name: '公告',
          edit: 'editDoc',
          view: 'detailDoc',
          add: 'addDoc'
        },
        interagency: {
          list: '/document/interagency',
          name: '发文',
          idName: 'id',
          add: 'interagencyAdd',
          view: 'interagencyDetail'
        },
        get_interagency: {
          list: '/document/get_interagency',
          name: '收文',
          idName: 'id',
          view: 'interagencyDetail',
          transfer: 'transferDoc'
        },
        draft: {
          list: '/document/list_draft',
          name: '草稿',
          idName: 'draft_id',
          edit: 'draftEdit',
          view: 'draftDetail',
          add: 'draftAdd'
        }
      },
      readVisible: false,
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
      memberList: [],
      // 机构列表
      toOrganizationList: [],
      deparmentName: {}
    }
  },
  computed: {
    mineOrganizationId() {
      return this.$store.state.user.user.organization_id
    },
    editorOption() {
      const url = this.$config.client.api
      const token = this.$store.state.user.user.token
      return {
        upload_img_url: `${url}?ct=upload&ac=upload&display=web&ajax=1&token=${token}`,
        upload_video_url: `${url}?ct=upload&ac=upload&display=web&ajax=1&token=${token}`
      }
    },

    computedOrganizationName() {
      if (!this.form.id) return ''
      const oId = JSON.parse(
        this.form.forward_from
          ? this.form.organization_id
          : this.form.pub_sig_depart
      )
      const oName = this.toOrganizationList.find((i) => {
        return i.id === oId
      })
      return oName ? oName.name : ''
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(nv, ov) {
        this.controlType = nv.type
        this.flag = nv.flag
        this.controlName = nv.control
        this.title = this.titleDict[nv.control] + this.formDict[nv.type].name
      }
    },
    'form.doc_kinds'(nv) {
      if (nv === 2) {
        this.$refs.form.clearValidate('doc_kinds')
      }
    },
    'form.is_top'(nv) {
      if (!nv) {
        this.$refs.form.clearValidate('top_time')
      }
    },
    'form.content'(nv, ov) {
      this.$refs.form.validateField('content')
    },
    'form.main_push_ids'(nv, ov) {
      this.$refs.form.validateField('main_push_ids')
    }
  },
  async mounted() {
    await this.getBaseData()
    // 转发需要机构列表
    await this.getToListOrganization()
    // 详情需要显示已读、未读列表
    await this.getOrganizationMember()
    if (this.controlName === 'view') {
      await this.getRead()
    }
  },
  methods: {
    async getBaseData() {
      this.loading = true
      const baseRes = await this.$api.document.getAddBaseData()
      if (baseRes) {
        this.degEmer = this.$utils.common.objectTarray(baseRes.data.deg_emer)
        this.cateLists = baseRes.data.cate_list || []
        if (this.cateLists && this.cateLists.length) {
          this.form.cate_id = this.cateLists[0].id
        }
        this.approCodes = baseRes.data.appro_codes
        this.pubSigDepartChange(this.form.pub_sig_depart)
      }

      // 发文单位列表
      const listRes = await this.$api.document.getDocumentOrganization()
      if (listRes) {
        this.pubSigDeparts = []
        Object.entries(listRes.data.department).map((item) => {
          this.pubSigDeparts.push({ name: item[1], value: item[0] })
        })

        this.form.pub_sig_depart = JSON.parse(this.pubSigDeparts[0].value)
      }

      if (this.id) {
        const params = {}
        // 跨机构收发文使用type，本机构用flag
        if (
          this.controlType === 'interagency' ||
          this.controlType === 'get_interagency'
        ) {
          params.type = this.flag
        } else {
          params.flag = this.flag
        }
        params[this.formDict[this.controlType].idName] = this.id

        let initRes = await this.$api.document[
          this.formDict[this.controlType].view
        ](params)

        if (initRes) {
          initRes = Array.isArray(initRes.data.doc_info)
            ? initRes.data.doc_info[0]
            : initRes.data.doc_info
            ? initRes.data.doc_info
            : initRes.data

          // 转发抄送需要清空
          if (
            this.controlType === 'get_interagency' &&
            this.controlName === 'transfer'
          ) {
            initRes.copy_push_ids = []
          }

          if (this.controlName === 'view' && !initRes.appro_code)
            initRes.appro_code = '—'

          // 跨机构收文 需要用到发文机构id，其他用本机构id
          this.copyOrganizationID =
            this.controlName === 'view' &&
            this.controlType === 'get_interagency'
              ? initRes.organization_id
              : this.mineOrganizationId

          // 我的收文 字段转换
          if (this.controlName === 'received') {
            initRes.main_push_ids = initRes.main_push_ids.join(',')
            initRes.copy_push_ids = initRes.copy_push_ids.join(',')
          }

          // 数据转换
          initRes.content = this.$utils.common.html_decode(initRes.content)
          if (initRes.attach_url.length) {
            initRes.attach_url = initRes.attach_url[0]
          } else {
            initRes.attach_url = ''
          }

          this.form = Object.assign(this.form, initRes)

          // 机构收文----转发，字段需要修改
          if (this.controlName === 'transfer') {
            this.form.doc_kinds = 1
            this.form.id = initRes.organization_id
          }

          // 防止重复校验
          this.oldSN = this.form.sn
        }
      }

      this.loading = false
    },
    // 详情页显示已读未读 弹窗
    showRead(type) {
      this.readVisible = true
    },
    // 机构列表
    async getToListOrganization() {
      // 跨机构详情，需要本机构信息
      const data =
        this.controlName === 'view' ||
        this.controlName === 'transfer' ||
        this.form.forward_from
          ? { master: 1 }
          : {}
      const res = await this.$api.common.getAllOrganization(data)

      // 遍历列表用
      this.toOrganizationList = res.data.list
    },
    // 机构人员列表
    async getOrganizationMember() {
      const res = await this.$api.common.memberSelectWhole({
        organization_id: this.copyOrganizationID
      })
      if (res) {
        this.memberList = this.filterMember(res.data)
      }
    },
    // 已读、未读列表
    async getRead() {
      let res
      if (this.controlType === 'published') {
        res = await this.$api.document.getRead({
          doc_id: this.id
        })
      } else {
        res = await this.$api.document.getInteragencyRead({
          doc_id: this.id
        })
      }

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
    pubSigDepartChange() {
      const item = this.pubSigDeparts.find(
        (item) => JSON.parse(item.value) === this.form.pub_sig_depart
      )
      if (!item) return
      this.form.pub_sig_depart_name = item.name
    },
    setTopDate(value) {
      if (value !== 'custom') {
        let ymd = ''
        if (value === '3' || value === '5') {
          ymd = this.$moment()
            .add(value, 'days')
            .format('YYYY-MM-DD')
        } else if (value === 'oneMonth') {
          ymd = this.$moment()
            .add(1, 'month')
            .format('YYYY-MM-DD')
        }

        this.form.top_time = ymd
      } else {
        this.form.top_time = ''
      }
    },

    // controlType  有可能是暂存-就是草稿功能
    async submitForm(controlType) {
      if (this.submit_form_loading) return
      this.submit_form_loading = true
      const submit_data = { ...this.form }

      // 编辑需要id
      if (this.id) submit_data[this.formDict[this.controlType].idName] = this.id
      if (!submit_data.is_top) {
        submit_data.is_top = 0
        submit_data.top_time = ''
      }

      if (submit_data.top_time) {
        const date = new Date(submit_data.top_time)
        const YYYY = date.getFullYear()
        const MM = date.getMonth() + 1
        const DD = date.getDate()
        submit_data.top_time = YYYY + '-' + MM + '-' + DD
      }

      let res1, res2
      // 跨机构-调用两个接口
      if (typeof controlType !== 'string' || !controlType) {
        controlType =
          this.controlName === 'transfer'
            ? 'get_interagency'
            : this.form.doc_kinds === 2
            ? 'interagency'
            : 'published'
      }

      // 草稿只有新增公告功能-没有编辑公告功能
      let controlName = this.controlName
      if (
        this.controlType === 'draft' &&
        this.controlName === 'edit' &&
        controlType !== 'draft'
      ) {
        controlName = 'add'
      }

      if (
        this.form.doc_kinds === 3 &&
        controlName === 'add' &&
        controlType !== 'draft'
      ) {
        res2 = await this.$api.document.interagencyAdd(submit_data)
        if (res2) res1 = await this.$api.document.addDoc(submit_data)

        // 本机构或者其他机构
      } else {
        res1 = await this.$api.document[
          this.formDict[controlType][controlName]
        ](submit_data)
      }

      // 从草稿中发布公告，需要删除草稿
      if (
        this.controlType === 'draft' &&
        controlType !== this.controlName &&
        controlName === 'add'
      ) {
        res2 = await this.$api.document.draftDel(this.id)
      }

      if (res1) {
        this.$message({
          message: res1.msg,
          type: 'success'
        })
        setTimeout(() => {
          this.submit_form_loading = false
          this.$router.push(this.formDict[this.controlType].list)
        }, 1500)
      } else {
        this.submit_form_loading = false
      }
    },
    validateSubmitForm(controlName) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm(controlName)
        } else {
          this.$log('error submit!!')
          return false
        }
      })
    },
    async validator_sn(rule, value, callback) {
      if (!value || this.oldSN === value) return
      // 公文编号
      this.sn_loading = true
      const res = await this.$api.document.isSnRepeat({
        sn: this.form.sn
      })
      if (res) {
        callback()
      } else {
        callback(res.msg)
      }
      this.sn_loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.view-content {
  /deep/.el-input.is-disabled {
    .el-input__inner {
      border: none;
      color: #333;
      background: #fff;
    }

    .el-input__icon {
      display: none;
    }
  }

  /deep/.el-checkbox__input.is-disabled {
    display: none;

    & + .el-checkbox__label {
      color: #333;
    }
  }
}
.form-content {
  /deep/.ui-file .file-item {
    margin-bottom: 0;
  }

  /deep/.el-form-item__error {
    min-width: 100px;
  }
}
</style>
