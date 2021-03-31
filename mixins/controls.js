/**
 * 用于流程的创建表单新增控件
 */
import { mapState } from 'vuex'
export default {
  data() {
    return {
      controls: [
        {
          name: '单行输入',
          type: 'text',
          icon: 'icon-danhangshurukuang',
          placeholder: '请输入',
          component: 'Text'
        },
        {
          name: '多行输入',
          type: 'textarea',
          icon: 'icon-duohangshurukuang',
          placeholder: '请输入',
          component: 'Text'
        },
        {
          name: '数字输入',
          type: 'number',
          icon: 'icon-shuzishurukuang',
          placeholder: '请输入',
          component: 'Text'
        },
        {
          name: '单选框',
          type: 'select',
          icon: 'icon-danxuankuang',
          placeholder: '请选择',
          component: 'Radio'
        },
        {
          name: '多选框',
          type: 'multi_select',
          icon: 'icon-duoxuankuang',
          placeholder: '请选择',
          component: 'MultiSelect'
        },
        {
          name: '日期',
          type: 'date',
          icon: 'icon-riqi',
          placeholder: '',
          component: 'Date'
        },
        {
          name: '日期期间',
          type: 'date_range',
          icon: 'icon-riqiqujian',
          placeholder: '请选择',
          component: 'DateRange'
        },
        {
          name: '图片',
          type: 'images',
          icon: 'icon-tupian',
          placeholder: '请上传',
          component: 'Images'
        },
        {
          name: '附件',
          type: 'addon',
          icon: 'icon-fujian',
          placeholder: '请上传',
          component: 'Addon'
        },
        {
          name: '说明文字',
          type: 'tips',
          icon: 'icon-shuomingwenzi',
          placeholder: '请填写',
          component: 'Tips'
        },
        {
          name: '金额',
          type: 'money',
          icon: 'icon-jine',
          placeholder: '请输入',
          component: 'Money'
        },
        {
          name: '数据表格',
          type: 'table',
          icon: 'icon-biaoge',
          placeholder: '请填写',
          component: 'Table'
        },
        {
          name: '部门单选',
          type: 'department',
          icon: 'icon-bumenxuanze',
          placeholder: '请选择',
          component: 'Department'
        },
        {
          name: '岗位单选',
          type: 'station',
          icon: 'icon-danweixuanze',
          placeholder: '请选择',
          component: 'Station'
        },
        {
          name: '分割线',
          type: 'line',
          icon: 'icon-fengexian',
          placeholder: '请选择',
          component: 'Line'
        },
        {
          name: '隐藏区块',
          type: 'block',
          icon: 'icon-yincangqukuai',
          placeholder: '请选择',
          component: 'Block',
          formList: []
        }
      ]
    }
  },
  computed: {
    ...mapState({
      accontrolItems: (state) => state.form.accontrolItems,
      curId: (state) => state.form.curId
    })
  }
}
