// 权限菜单
export const MenuData = [
  {
    id: '1',
    parentid: 0,
    topid: 0,
    name: '我的',
    lang: 'menu_my',
    class: 'iconfont icon-wode',
    children: [
      {
        id: '2',
        parentid: '1',
        topid: '1',
        name: '我的',
        lang: 'menu_my',
        class: ' iconfont icon-wode1',
        children: [
          {
            id: '3',
            parentid: '2',
            topid: '1',
            name: '我的主页',
            lang: 'menu_my_homepage',
            class: 'portal_index',
            ct: 'portal',
            ac: 'index',
            url: '?ct=portal&ac=index'
          },
          {
            id: '4',
            parentid: '2',
            topid: '1',
            name: '我的申请',
            lang: 'menu_my_applicant',
            ct: 'myflow',
            ac: 'record_list',
            url: '?ct=myflow&ac=record_list'
          },
          {
            id: '5',
            parentid: '2',
            topid: '1',
            name: '我的审批',
            lang: 'menu_my_approval',
            ct: 'myreview',
            ac: 'approve_list',
            url: '?ct=myreview&ac=approve_list'
          },
          {
            id: '6',
            parentid: '2',
            topid: '1',
            name: '抄送我的',
            lang: 'menu_my_cc',
            ct: 'myreview',
            ac: 'cc_list',
            url: '?ct=myreview&ac=cc_list'
          },
          {
            id: '7',
            parentid: '2',
            topid: '1',
            name: '我的传阅',
            lang: 'menu_my_circulate',
            ct: 'circulate',
            ac: 'index',
            url: '?ct=circulate&ac=index'
          },
          {
            id: '8',
            parentid: '2',
            topid: '1',
            name: '我的日程',
            lang: 'menu_my_calendar',
            ct: 'schedule',
            ac: 'lists',
            url: '?ct=schedule&ac=lists'
          },
          {
            id: '9',
            parentid: '2',
            topid: '1',
            name: '我的收文',
            lang: 'menu_my_reciept',
            ct: 'document',
            ac: 'received',
            url: '?ct=document&ac=received'
          },
          {
            id: '10',
            parentid: '2',
            topid: '1',
            name: '我的消息',
            lang: 'menu_my_message',
            ct: 'message',
            ac: 'index',
            url: '?ct=message&ac=index'
          }
        ]
      }
    ]
  },
  {
    id: '11',
    parentid: 0,
    topid: 0,
    name: '通知公告',
    admin: '1',
    lang: 'menu_announcement',
    class: 'iconfont icon-gongwen',
    children: [
      {
        id: '12',
        parentid: '11',
        topid: '11',
        name: '公告',
        lang: 'menu_announcement',
        class: ' iconfont icon-gongwenguanli',
        children: [
          {
            id: '13',
            parentid: '12',
            topid: '11',
            name: '机构内公告',
            lang: 'menu_announcement_list',
            default: '1',
            ct: 'document',
            ac: 'published',
            url: '?ct=document&ac=published'
          },
          {
            id: '14',
            parentid: '12',
            topid: '11',
            name: '公告属性',
            lang: 'menu_announcement_type',
            ct: 'doc_type',
            ac: 'index',
            url: '?ct=doc_type&ac=index'
          }
        ]
      }
    ]
  },
  {
    id: '15',
    parentid: 0,
    topid: 0,
    name: '流程',
    admin: '1',
    lang: 'menu_workflow',
    class: 'iconfont icon-liucheng1',
    children: [
      {
        id: '16',
        parentid: '15',
        topid: '15',
        name: '流程管理',
        lang: 'menu_workflow_manage',
        class: ' iconfont icon-liucheng1',
        children: [
          {
            id: '17',
            parentid: '16',
            topid: '15',
            name: '创建表单',
            lang: 'menu_create_form',
            ct: 'form',
            ac: 'add',
            url: '?ct=form&ac=add'
          },
          {
            id: '18',
            parentid: '16',
            topid: '15',
            name: '审批流程管理',
            lang: 'menu_workflow_list',
            ct: 'form',
            ac: 'index',
            url: '?ct=form&ac=index'
          },
          {
            id: '19',
            parentid: '16',
            topid: '15',
            name: '表单类型管理',
            lang: 'menu_form_type',
            ct: 'form_type',
            ac: 'index',
            url: '?ct=form_type&ac=index'
          }
        ]
      }
    ]
  },
  {
    id: '20',
    parentid: 0,
    topid: 0,
    name: '权限',
    lang: 'menu_permission',
    class: 'fa fa-th-list',
    children: [
      {
        id: '21',
        parentid: '20',
        topid: '20',
        name: '个人门户',
        lang: 'menu_person_portal',
        class: 'fa fa-file',
        children: [
          {
            id: '22',
            parentid: '21',
            topid: '20',
            name: '读取用户最新公文',
            lang: 'menu_portal_get_user_docs',
            ct: 'portal',
            ac: 'get_user_docs',
            display: 'none',
            url: '?ct=portal&ac=get_user_docs'
          },
          {
            id: '23',
            parentid: '21',
            topid: '20',
            name: '远程读取人员列表',
            lang: 'menu_tisi_member_select',
            ct: 'tisi',
            ac: 'member_select',
            display: 'none',
            url: '?ct=tisi&ac=member_select'
          },
          {
            id: '24',
            parentid: '21',
            topid: '20',
            name: '远程读取搜索人员',
            lang: 'menu_tisi_member_search',
            ct: 'tisi',
            ac: 'member_search',
            display: 'none',
            url: '?ct=tisi&ac=member_search'
          },
          {
            id: '25',
            parentid: '21',
            topid: '20',
            name: '远程读取全部人员',
            lang: 'member_select_whole',
            ct: 'tisi',
            ac: 'member_select_whole',
            display: 'none',
            url: '?ct=tisi&ac=member_select_whole'
          }
        ]
      },
      {
        id: '26',
        parentid: '20',
        topid: '20',
        name: '事务管理',
        lang: 'menu_flow_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '27',
            parentid: '26',
            topid: '20',
            name: '我的事务',
            lang: 'menu_myflow',
            ct: 'myflow',
            ac: 'index',
            display: 'none',
            url: '?ct=myflow&ac=index'
          },
          {
            id: '28',
            parentid: '26',
            topid: '20',
            name: '搜索我的事务',
            lang: 'menu_myflow_record_list',
            ct: 'myflow',
            ac: 'record_list',
            display: 'none',
            url: '?ct=myflow&ac=record_list'
          },
          {
            id: '29',
            parentid: '26',
            topid: '20',
            name: '填写事务表单',
            lang: 'menu_myflow_apply',
            ct: 'myflow',
            ac: 'apply',
            display: 'none',
            url: '?ct=myflow&ac=apply'
          },
          {
            id: '30',
            parentid: '26',
            topid: '20',
            name: '保存事务表单',
            lang: 'menu_myflow_apply',
            ct: 'myflow',
            ac: 'apply_save',
            display: 'none',
            url: '?ct=myflow&ac=apply_save'
          },
          {
            id: '31',
            parentid: '26',
            topid: '20',
            name: '保存事务表单(H5)',
            lang: 'menu_myflow_apply_h5',
            ct: 'myflow',
            ac: 'apply_h5_save',
            display: 'none',
            url: '?ct=myflow&ac=apply_h5_save'
          },
          {
            id: '32',
            parentid: '26',
            topid: '20',
            name: '修改事务表单',
            lang: 'menu_myflow_edit_apply',
            ct: 'myflow',
            ac: 'edit_apply',
            display: 'none',
            url: '?ct=myflow&ac=edit_apply'
          },
          {
            id: '33',
            parentid: '26',
            topid: '20',
            name: '撤消事务申请',
            lang: 'menu_myflow_cancel_approve',
            ct: 'myflow',
            ac: 'cancel_approve',
            display: 'none',
            url: '?ct=myflow&ac=cancel_approve'
          },
          {
            id: '34',
            parentid: '26',
            topid: '20',
            name: '查看事务数据',
            lang: 'menu_myflow_record_detailed',
            ct: 'myflow',
            ac: 'record_detailed',
            display: 'none',
            url: '?ct=myflow&ac=record_detailed'
          },
          {
            id: '35',
            parentid: '26',
            topid: '20',
            name: '获取我可以使用的表单',
            lang: 'menu_myflow_myforms',
            ct: 'my_myflow',
            ac: 'ajax_get_myforms',
            display: 'none',
            url: '?ct=my_myflow&ac=ajax_get_myforms'
          }
        ]
      },
      {
        id: '36',
        parentid: '20',
        topid: '20',
        name: '表单管理',
        lang: 'menu_form_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '37',
            parentid: '36',
            topid: '20',
            name: '编辑表单',
            lang: 'menu_form_edit',
            ct: 'form',
            ac: 'edit',
            display: 'none',
            url: '?ct=form&ac=edit'
          },
          {
            id: '38',
            parentid: '36',
            topid: '20',
            name: '禁/停用表单',
            lang: 'menu_form_enable',
            ct: 'form',
            ac: 'enable',
            display: 'none',
            url: '?ct=form&ac=enable'
          },
          {
            id: '39',
            parentid: '36',
            topid: '20',
            name: '列出当前组织信息',
            lang: 'menu_form_load_organization',
            ct: 'form',
            ac: 'load_organization',
            display: 'none',
            url: '?ct=form&ac=load_organization'
          },
          {
            id: '40',
            parentid: '36',
            topid: '20',
            name: '列出组织子节点信息',
            lang: 'menu_form_load_organization_sub',
            ct: 'form',
            ac: 'load_organization_sub',
            display: 'none',
            url: '?ct=form&ac=load_organization_sub'
          },
          {
            id: '41',
            parentid: '36',
            topid: '20',
            name: '设置表单用户',
            lang: 'menu_form_set_user',
            ct: 'form',
            ac: 'set_user',
            display: 'none',
            url: '?ct=form&ac=set_user'
          },
          {
            id: '42',
            parentid: '36',
            topid: '20',
            name: '预览表单',
            lang: 'menu_form_view',
            ct: 'form',
            ac: 'view',
            display: 'none',
            url: '?ct=form&ac=view'
          },
          {
            id: '43',
            parentid: '36',
            topid: '20',
            name: '添加表单类型',
            lang: 'menu_formtype_add',
            ct: 'form_type',
            ac: 'add',
            display: 'none',
            url: '?ct=form_type&ac=add'
          },
          {
            id: '44',
            parentid: '36',
            topid: '20',
            name: '编辑表单类型',
            lang: 'menu_formtype_edit',
            ct: 'form_type',
            ac: 'edit',
            display: 'none',
            url: '?ct=form_type&ac=edit'
          },
          {
            id: '45',
            parentid: '36',
            topid: '20',
            name: '禁/启用表单类型',
            lang: 'menu_formtype_hide',
            ct: 'form_type',
            ac: 'hide',
            display: 'none',
            url: '?ct=form_type&ac=hide'
          },
          {
            id: '46',
            parentid: '36',
            topid: '20',
            name: '增加第三方表单',
            lang: 'menu_tds_add',
            ct: 'tds',
            ac: 'add',
            display: 'none',
            url: '?ct=tds&ac=add'
          },
          {
            id: '47',
            parentid: '36',
            topid: '20',
            name: '修改第三方表单',
            lang: 'menu_tds_edit',
            ct: 'tds',
            ac: 'edit',
            display: 'none',
            url: '?ct=tds&ac=edit'
          },
          {
            id: '48',
            parentid: '36',
            topid: '20',
            name: '删除第三方表单',
            lang: 'menu_tds_delete',
            ct: 'tds',
            ac: 'del',
            display: 'none',
            url: '?ct=tds&ac=del'
          }
        ]
      },
      {
        id: '49',
        parentid: '20',
        topid: '20',
        name: '传阅管理',
        lang: 'menu_circulate_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '50',
            parentid: '49',
            topid: '20',
            name: '传阅详情',
            lang: 'menu_circulate_detail',
            ct: 'circulate',
            ac: 'detail',
            display: 'none',
            url: '?ct=circulate&ac=detail'
          },
          {
            id: '51',
            parentid: '49',
            topid: '20',
            name: '新增传阅',
            lang: 'menu_circulate_add',
            ct: 'circulate',
            ac: 'add',
            display: 'none',
            url: '?ct=circulate&ac=add'
          },
          {
            id: '52',
            parentid: '49',
            topid: '20',
            name: '我的传阅',
            lang: 'menu_my_circulate',
            ct: 'circulate',
            ac: 'index',
            display: 'none',
            url: '?ct=circulate&ac=index'
          },
          {
            id: '53',
            parentid: '49',
            topid: '20',
            name: '异步新增传阅',
            lang: 'menu_circulate_ajax_add',
            ct: 'circulate',
            ac: 'ajax_add_circulate',
            display: 'none',
            url: '?ct=circulate&ac=ajax_add_circulate'
          },
          {
            id: '54',
            parentid: '49',
            topid: '20',
            name: '异步添加评论',
            lang: 'menu_circulate_ajax_addcomment',
            ct: 'circulate',
            ac: 'ajax_add_comment',
            display: 'none',
            url: '?ct=circulate&ac=ajax_add_comment'
          },
          {
            id: '55',
            parentid: '49',
            topid: '20',
            name: '异步确定已阅',
            lang: 'menu_circulate_ajax_confirm',
            ct: 'circulate',
            ac: 'ajax_confirm',
            display: 'none',
            url: '?ct=circulate&ac=ajax_confirm'
          },
          {
            id: '56',
            parentid: '49',
            topid: '20',
            name: '异步查看传阅详情',
            lang: 'menu_circulate_ajax_get_detail',
            ct: 'circulate',
            ac: 'ajax_get_detail',
            display: 'none',
            url: '?ct=circulate&ac=ajax_get_detail'
          },
          {
            id: '57',
            parentid: '49',
            topid: '20',
            name: '邀请加入传阅',
            lang: 'menu_circulate_ajax_invite',
            ct: 'circulate',
            ac: 'ajax_invite',
            display: 'none',
            url: '?ct=circulate&ac=ajax_invite'
          },
          {
            id: '58',
            parentid: '49',
            topid: '20',
            name: '获取我的传阅列表',
            lang: 'menu_circulate_ajax_search_lists',
            ct: 'circulate',
            ac: 'ajax_search_lists',
            display: 'none',
            url: '?ct=circulate&ac=ajax_search_lists'
          },
          {
            id: '59',
            parentid: '49',
            topid: '20',
            name: '获取已存在的传阅创建者',
            lang: 'menu_circulate_ajax_get_creator',
            ct: 'circulate',
            ac: 'ajax_get_creator',
            display: 'none',
            url: '?ct=circulate&ac=ajax_get_creator'
          }
        ]
      },
      {
        id: '60',
        parentid: '20',
        topid: '20',
        name: '审批管理',
        lang: 'menu_approve',
        class: 'fa fa-file',
        children: [
          {
            id: '61',
            parentid: '60',
            topid: '20',
            name: '我审批的表单主页',
            lang: 'menu_review_approve',
            ct: 'myreview',
            ac: 'approve',
            display: 'none',
            url: '?ct=myreview&ac=approve'
          },
          {
            id: '62',
            parentid: '60',
            topid: '20',
            name: '搜索我审批的表单',
            lang: 'menu_review_approve_list',
            ct: 'myreview',
            ac: 'approve_list',
            display: 'none',
            url: '?ct=myreview&ac=approve_list'
          },
          {
            id: '63',
            parentid: '60',
            topid: '20',
            name: '抄送我的表单主页',
            lang: 'menu_review_cc',
            ct: 'myreview',
            ac: 'cc',
            display: 'none',
            url: '?ct=myreview&ac=cc'
          },
          {
            id: '64',
            parentid: '60',
            topid: '20',
            name: '搜索抄送我的表单',
            lang: 'menu_review_cc_list',
            ct: 'myreview',
            ac: 'cc_list',
            display: 'none',
            url: '?ct=myreview&ac=cc_list'
          },
          {
            id: '65',
            parentid: '60',
            topid: '20',
            name: '表单统计(H5接口)',
            lang: 'menu_review_count',
            ct: 'myreview',
            ac: 'count',
            display: 'none',
            url: '?ct=myreview&ac=count'
          },
          {
            id: '66',
            parentid: '60',
            topid: '20',
            name: '我审批的(H5接口)',
            lang: 'menu_review_reviews',
            ct: 'myreview',
            ac: 'reviews',
            display: 'none',
            url: '?ct=myreview&ac=reviews'
          },
          {
            id: '67',
            parentid: '60',
            topid: '20',
            name: '抄送我的(H5接口)',
            lang: 'menu_review_ccs',
            ct: 'myreview',
            ac: 'ccs',
            display: 'none',
            url: '?ct=myreview&ac=ccs'
          },
          {
            id: '68',
            parentid: '60',
            topid: '20',
            name: '我的申请(H5接口)',
            lang: 'menu_flow_myrecords',
            ct: 'myflow',
            ac: 'myrecords',
            display: 'none',
            url: '?ct=myflow&ac=myrecords'
          },
          {
            id: '69',
            parentid: '60',
            topid: '20',
            name: '获取申请人',
            lang: 'menu_review_get_approve_users',
            ct: 'myreview',
            ac: 'get_approve_users',
            display: 'none',
            url: '?ct=myreview&ac=get_approve_users'
          },
          {
            id: '70',
            parentid: '60',
            topid: '20',
            name: '邀请人发表评论',
            lang: 'menu_review_save_suggestion',
            ct: 'myreview',
            ac: 'save_suggestion',
            display: 'none',
            url: '?ct=myreview&ac=save_suggestion'
          },
          {
            id: '71',
            parentid: '60',
            topid: '20',
            name: '获取我的信息(H5接口)',
            lang: 'menu_flow_myinfo',
            ct: 'myflow',
            ac: 'myinfo',
            display: 'none',
            url: '?ct=myflow&ac=myinfo'
          },
          {
            id: '72',
            parentid: '60',
            topid: '20',
            name: '获取机构部门列表(H5接口)',
            lang: 'menu_flow_get_departments',
            ct: 'myflow',
            ac: 'get_departments',
            display: 'none',
            url: '?ct=myflow&ac=get_departments'
          },
          {
            id: '73',
            parentid: '60',
            topid: '20',
            name: '获取部门岗位列表(H5接口)',
            lang: 'menu_flow_get_stations',
            ct: 'myflow',
            ac: 'get_stations',
            display: 'none',
            url: '?ct=myflow&ac=get_stations'
          },
          {
            id: '74',
            parentid: '60',
            topid: '20',
            name: '审批事务',
            lang: 'menu_review_saveapprove',
            ct: 'myreview',
            ac: 'save_approve',
            display: 'none',
            url: '?ct=myreview&ac=save_approve'
          }
        ]
      },
      {
        id: '75',
        parentid: '20',
        topid: '20',
        name: '工作流管理',
        lang: 'menu_flow_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '76',
            parentid: '75',
            topid: '20',
            name: '编辑工作流',
            lang: 'menu_flow_edit',
            ct: 'flow',
            ac: 'edit',
            display: 'none',
            url: '?ct=flow&ac=edit'
          },
          {
            id: '77',
            parentid: '75',
            topid: '20',
            name: '读取表单字段',
            lang: 'menu_flow_get_form_configs',
            ct: 'flow',
            ac: 'get_form_configs',
            display: 'none',
            url: '?ct=flow&ac=get_form_configs'
          },
          {
            id: '78',
            parentid: '75',
            topid: '20',
            name: '分条件工作流',
            lang: 'menu_flow_more_condition',
            ct: 'flow',
            ac: 'more_condition',
            display: 'none',
            url: '?ct=flow&ac=more_condition'
          },
          {
            id: '79',
            parentid: '75',
            topid: '20',
            name: '添加审核节点',
            lang: 'menu_flow_node_add',
            ct: 'flow',
            ac: 'node_add',
            display: 'none',
            url: '?ct=flow&ac=node_add'
          },
          {
            id: '80',
            parentid: '75',
            topid: '20',
            name: '编辑审核节点',
            lang: 'menu_flow_node_edit',
            ct: 'flow',
            ac: 'node_edit',
            display: 'none',
            url: '?ct=flow&ac=node_edit'
          },
          {
            id: '81',
            parentid: '75',
            topid: '20',
            name: '删除审核节点',
            lang: 'menu_flow_node_delete',
            ct: 'flow',
            ac: 'node_delete',
            display: 'none',
            url: '?ct=flow&ac=node_delete'
          },
          {
            id: '82',
            parentid: '75',
            topid: '20',
            name: '获取工作流',
            lang: 'menu_flow_get_flow',
            ct: 'flow',
            ac: 'get_flow',
            display: 'none',
            url: '?ct=flow&ac=get_flow'
          },
          {
            id: '83',
            parentid: '75',
            topid: '20',
            name: '修改工作流优先级',
            lang: 'menu_flow_modify_rank',
            ct: 'flow',
            ac: 'modify_rank',
            display: 'none',
            url: '?ct=flow&ac=modify_rank'
          },
          {
            id: '84',
            parentid: '75',
            topid: '20',
            name: '删除一个工作流',
            lang: 'menu_flow_delete_flow',
            ct: 'flow',
            ac: 'delete_flow',
            display: 'none',
            url: '?ct=flow&ac=delete_flow'
          },
          {
            id: '85',
            parentid: '75',
            topid: '20',
            name: '读取条件工作流',
            lang: 'menu_flow_get_flow_detail',
            ct: 'flow',
            ac: 'get_flow_detail',
            display: 'none',
            url: '?ct=flow&ac=get_flow_detail'
          },
          {
            id: '86',
            parentid: '75',
            topid: '20',
            name: '读取用户名',
            lang: 'menu_flow_get_username',
            ct: 'flow',
            ac: 'get_username',
            display: 'none',
            url: '?ct=flow&ac=get_username'
          }
        ]
      },
      {
        id: '87',
        parentid: '20',
        topid: '20',
        name: '公文管理',
        lang: 'menu_document_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '88',
            parentid: '87',
            topid: '20',
            name: '公文详情',
            lang: 'menu_document_detail',
            ct: 'document',
            ac: 'detail',
            display: 'none',
            url: '?ct=document&ac=detail'
          },
          {
            id: '89',
            parentid: '87',
            topid: '20',
            name: '发送公文通知邮件',
            lang: 'menu_document_mail_notice',
            ct: 'document',
            ac: 'mail_notice',
            display: 'none',
            url: '?ct=document&ac=mail_notice'
          },
          {
            id: '90',
            parentid: '87',
            topid: '20',
            name: '异步发送公文通知邮件',
            lang: 'menu_document_ajax_send_mail',
            ct: 'document',
            ac: 'ajax_send_mail',
            display: 'none',
            url: '?ct=document&ac=ajax_send_mail'
          },
          {
            id: '91',
            parentid: '87',
            topid: '20',
            name: '主送人员确认公文通知',
            lang: 'menu_document_confirm',
            ct: 'document',
            ac: 'confirm',
            display: 'none',
            url: '?ct=document&ac=confirm'
          },
          {
            id: '92',
            parentid: '87',
            topid: '20',
            name: '主送人员异步确认公文通知',
            lang: 'menu_document_ajax_confirm',
            ct: 'document',
            ac: 'ajax_confirm',
            display: 'none',
            url: '?ct=document&ac=ajax_confirm'
          },
          {
            id: '93',
            parentid: '87',
            topid: '20',
            name: '删除公文',
            lang: 'menu_document_delete',
            ct: 'document',
            ac: 'delete',
            display: 'none',
            url: '?ct=document&ac=delete'
          },
          {
            id: '94',
            parentid: '87',
            topid: '20',
            name: '保存公文分类数据',
            lang: 'menu_document_save',
            ct: 'doc_type',
            ac: 'save',
            display: 'none',
            url: '?ct=doc_type&ac=save'
          },
          {
            id: '95',
            parentid: '87',
            topid: '20',
            name: '删除公文分类',
            lang: 'menu_document_doc_type',
            ct: 'doc_type',
            ac: 'delete',
            display: 'none',
            url: '?ct=doc_type&ac=delete'
          },
          {
            id: '96',
            parentid: '87',
            topid: '20',
            name: '门户公文',
            lang: 'menu_document_get_docs_bycate',
            ct: 'document',
            ac: 'get_docs_by_cate',
            display: 'none',
            url: '?ct=document&ac=get_docs_by_cate'
          },
          {
            id: '97',
            parentid: '87',
            topid: '20',
            name: '公文编号是否重复',
            lang: 'menu_document_is_sn_repeat',
            ct: 'document',
            ac: 'is_sn_repeat',
            display: 'none',
            url: '?ct=document&ac=is_sn_repeat'
          },
          {
            id: '98',
            parentid: '87',
            topid: '20',
            name: '异步获取公文列表',
            lang: 'menu_document_ajax_get_docs',
            ct: 'document',
            ac: 'ajax_get_docs',
            display: 'none',
            url: '?ct=document&ac=ajax_get_docs'
          },
          {
            id: '99',
            parentid: '87',
            topid: '20',
            name: '发布公文',
            lang: 'menu_document_add',
            ct: 'document',
            ac: 'add',
            display: 'none',
            url: '?ct=document&ac=add'
          }
        ]
      },
      {
        id: '100',
        parentid: '20',
        topid: '20',
        name: '日程管理',
        lang: 'menu_schedule_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '101',
            parentid: '100',
            topid: '20',
            name: '根据日期查询日程信息',
            lang: 'menu_schedule_by_day',
            ct: 'schedule',
            ac: 'search_schedule_by_day',
            display: 'none',
            url: '?ct=schedule&ac=search_schedule_by_day'
          },
          {
            id: '102',
            parentid: '100',
            topid: '20',
            name: '修改日程状态',
            lang: 'menu_schedule_status',
            ct: 'schedule',
            ac: 'status',
            display: 'none',
            url: '?ct=schedule&ac=status'
          },
          {
            id: '103',
            parentid: '100',
            topid: '20',
            name: '获取一条日程信息',
            lang: 'menu_schedule_by_id',
            ct: 'schedule',
            ac: 'get_schedule_by_id',
            display: 'none',
            url: '?ct=schedule&ac=get_schedule_by_id'
          },
          {
            id: '104',
            parentid: '100',
            topid: '20',
            name: '保存日程信息',
            lang: 'menu_schedule_save',
            ct: 'schedule',
            ac: 'save',
            display: 'none',
            url: '?ct=schedule&ac=save'
          },
          {
            id: '105',
            parentid: '100',
            topid: '20',
            name: '日程详情',
            lang: 'menu_schedule_details',
            ct: 'schedule',
            ac: 'details',
            display: 'none',
            url: '?ct=schedule&ac=details'
          },
          {
            id: '106',
            parentid: '100',
            topid: '20',
            name: '获取一个月内有日程的日子',
            lang: 'menu_schedule_get_days',
            ct: 'schedule',
            ac: 'get_days_from_month',
            display: 'none',
            url: '?ct=schedule&ac=get_days_from_month'
          },
          {
            id: '107',
            parentid: '100',
            topid: '20',
            name: '获取重复周期子日程的详情',
            lang: 'menu_schedule_get_child_detail',
            ct: 'schedule',
            ac: 'get_child_detail',
            display: 'none',
            url: '?ct=schedule&ac=get_child_detail'
          }
        ]
      },
      {
        id: '108',
        parentid: '20',
        topid: '20',
        name: '消息管理',
        lang: 'menu_message_manage',
        class: 'fa fa-file',
        children: [
          {
            id: '109',
            parentid: '108',
            topid: '20',
            name: '发送消息',
            lang: 'menu_message_add',
            ct: 'message',
            ac: 'add',
            display: 'none',
            url: '?ct=message&ac=add'
          },
          {
            id: '110',
            parentid: '108',
            topid: '20',
            name: '删除自己消息',
            lang: 'menu_message_delete',
            ct: 'message',
            ac: 'del',
            display: 'none',
            url: '?ct=message&ac=del'
          },
          {
            id: '111',
            parentid: '108',
            topid: '20',
            name: '批量设置消息状态',
            lang: 'menu_message_set_read',
            ct: 'message',
            ac: 'set_read',
            display: 'none',
            url: '?ct=message&ac=set_read'
          },
          {
            id: '112',
            parentid: '108',
            topid: '20',
            name: '消息详情',
            lang: 'menu_message_details',
            ct: 'message',
            ac: 'details',
            display: 'none',
            url: '?ct=message&ac=details'
          },
          {
            id: '113',
            parentid: '108',
            topid: '20',
            name: '新消息数量',
            lang: 'menu_message_get_message_nums',
            ct: 'message',
            ac: 'get_message_nums',
            display: 'none',
            url: '?ct=message&ac=get_message_nums'
          },
          {
            id: '114',
            parentid: '108',
            topid: '20',
            name: '最近消息列表',
            lang: 'menu_message_list',
            ct: 'message',
            ac: 'get_message_lists',
            display: 'none',
            url: '?ct=message&ac=get_message_lists'
          },
          {
            id: '115',
            parentid: '108',
            topid: '20',
            name: '设置一条消息状态',
            lang: 'menu_message_read',
            ct: 'message',
            ac: 'message_read',
            display: 'none',
            url: '?ct=message&ac=message_read'
          },
          {
            id: '116',
            parentid: '108',
            topid: '20',
            name: '获取消息分类',
            lang: 'menu_message_types',
            ct: 'message',
            ac: 'get_types',
            display: 'none',
            url: '?ct=message&ac=get_types'
          },
          {
            id: '117',
            parentid: '108',
            topid: '20',
            name: '根据分类获取消息',
            lang: 'menu_message_by_type',
            ct: 'message',
            ac: 'get_message_by_type',
            display: 'none',
            url: '?ct=message&ac=get_message_by_type'
          }
        ]
      },
      {
        id: '118',
        parentid: '20',
        topid: '20',
        name: '文件上传',
        lang: 'menu_upload',
        class: 'fa fa-user',
        children: [
          {
            id: '119',
            parentid: '118',
            topid: '20',
            name: '常规上传',
            lang: 'menu_upload_base',
            ct: 'upload',
            ac: 'upload',
            display: 'none',
            url: '?ct=upload&ac=upload'
          },
          {
            id: '120',
            parentid: '118',
            topid: '20',
            name: 'H5方式上传',
            lang: 'menu_upload_h5',
            ct: 'upload',
            ac: 'upload_html5',
            display: 'none',
            url: '?ct=upload&ac=upload_html5'
          },
          {
            id: '121',
            parentid: '118',
            topid: '20',
            name: '分片上传',
            lang: 'menu_upload_chunked',
            ct: 'upload',
            ac: 'upload_chunked',
            display: 'none',
            url: '?ct=upload&ac=upload_chunked'
          },
          {
            id: '122',
            parentid: '118',
            topid: '20',
            name: '下载附件',
            lang: 'menu_upload_download',
            ct: 'upload',
            ac: 'download',
            display: 'none',
            url: '?ct=upload&ac=download'
          }
        ]
      }
    ]
  },
  {
    id: '123',
    parentid: 0,
    topid: 0,
    name: '系统',
    lang: 'menu_system',
    class: 'fa fa-gear',
    children: [
      {
        id: '124',
        parentid: '123',
        topid: '123',
        name: '个人中心',
        lang: 'menu_user_center',
        class: 'fa fa-user',
        children: [
          {
            id: '125',
            parentid: '124',
            topid: '123',
            name: '修改密码',
            lang: 'menu_user_change_password',
            ct: 'admin',
            ac: 'editpwd',
            url: '?ct=admin&ac=editpwd'
          },
          {
            id: '126',
            parentid: '124',
            topid: '123',
            name: '个人资料',
            lang: 'menu_my_permission',
            ct: 'admin',
            ac: 'mypurview',
            url: '?ct=admin&ac=mypurview'
          }
        ]
      },
      {
        id: '127',
        parentid: '123',
        topid: '123',
        name: '用户管理',
        admin: '1',
        lang: 'menu_user_account',
        class: 'fa fa-users',
        children: [
          {
            id: '128',
            parentid: '127',
            topid: '123',
            name: '管理员管理',
            admin: '2',
            lang: 'menu_user_manage',
            ct: 'admin',
            ac: 'index',
            url: '?ct=admin&ac=index'
          },
          {
            id: '129',
            parentid: '127',
            topid: '123',
            name: '普通员工管理',
            lang: 'menu_member_manage',
            ct: 'admin',
            ac: 'index_base',
            url: '?ct=admin&ac=index_base'
          },
          {
            id: '130',
            parentid: '127',
            topid: '123',
            name: '用户添加',
            lang: 'menu_user_add',
            ct: 'admin',
            ac: 'add',
            display: 'none',
            url: '?ct=admin&ac=add'
          },
          {
            id: '131',
            parentid: '127',
            topid: '123',
            name: '用户修改',
            lang: 'menu_user_edit',
            ct: 'admin',
            ac: 'edit',
            display: 'none',
            url: '?ct=admin&ac=edit'
          },
          {
            id: '132',
            parentid: '127',
            topid: '123',
            name: '用户删除',
            lang: 'menu_user_delete',
            ct: 'admin',
            ac: 'del',
            display: 'none',
            url: '?ct=admin&ac=del'
          },
          {
            id: '133',
            parentid: '127',
            topid: '123',
            name: '修改员工密码',
            lang: 'menu_user_create_pwd',
            ct: 'admin',
            ac: 'create_pwd',
            display: 'none',
            url: '?ct=admin&ac=create_pwd'
          },
          {
            id: '134',
            parentid: '127',
            topid: '123',
            name: '用户组管理',
            admin: '2',
            lang: 'menu_usergroup_manage',
            ct: 'admin_group',
            ac: 'index',
            url: '?ct=admin_group&ac=index'
          },
          {
            id: '135',
            parentid: '127',
            topid: '123',
            name: '用户组添加',
            admin: '2',
            lang: 'menu_usergroup_add',
            ct: 'admin_group',
            ac: 'add',
            display: 'none',
            url: '?ct=admin_group&ac=add'
          },
          {
            id: '136',
            parentid: '127',
            topid: '123',
            name: '用户组修改',
            admin: '2',
            lang: 'menu_usergroup_update',
            ct: 'admin_group',
            ac: 'edit',
            display: 'none',
            url: '?ct=admin_group&ac=edit'
          },
          {
            id: '137',
            parentid: '127',
            topid: '123',
            name: '用户组删除',
            admin: '2',
            lang: 'menu_usergroup_delete',
            ct: 'admin_group',
            ac: 'del',
            display: 'none',
            url: '?ct=admin_group&ac=del'
          },
          {
            id: '138',
            parentid: '127',
            topid: '123',
            name: '操作日志',
            lang: 'menu_login_log',
            ct: 'admin',
            ac: 'oplog',
            url: '?ct=admin&ac=oplog'
          },
          {
            id: '139',
            parentid: '127',
            topid: '123',
            name: '登录日志',
            lang: 'menu_operation_log',
            ct: 'admin',
            ac: 'login_log',
            url: '?ct=admin&ac=login_log'
          },
          {
            id: '140',
            parentid: '127',
            topid: '123',
            name: '重设MFA',
            admin: '2',
            lang: 'menu_reset_mfa',
            ct: 'admin',
            ac: 'reset_mfa',
            display: 'none',
            url: '?ct=admin&ac=reset_mfa'
          },
          {
            id: '141',
            parentid: '127',
            topid: '123',
            name: '用户激活',
            lang: 'menu_user_active',
            ct: 'admin',
            ac: 'active',
            display: 'none',
            url: '?ct=admin&ac=active'
          },
          {
            id: '142',
            parentid: '127',
            topid: '123',
            name: '操作日志删除',
            lang: 'menu_oplog_delete',
            ct: 'admin',
            ac: 'oplog_del',
            display: 'none',
            url: '?ct=admin&ac=oplog_del'
          },
          {
            id: '143',
            parentid: '127',
            topid: '123',
            name: '登录日志删除',
            lang: 'menu_ogin_log_delete',
            ct: 'admin',
            ac: 'login_log_del',
            display: 'none',
            url: '?ct=admin&ac=login_log_del'
          },
          {
            id: '144',
            parentid: '127',
            topid: '123',
            name: '清空三个月前登录日志',
            lang: 'menu_old_login_log',
            ct: 'admin',
            ac: 'del_old_login_log',
            display: 'none',
            url: '?ct=admin&ac=del_old_login_log'
          },
          {
            id: '145',
            parentid: '127',
            topid: '123',
            name: '终断回话',
            lang: 'menu_session_terminate',
            ct: 'session',
            ac: 'terminate',
            display: 'none',
            url: '?ct=session&ac=terminate'
          },
          {
            id: '146',
            parentid: '127',
            topid: '123',
            name: '显示缓存',
            lang: 'menu_show_cache',
            ct: 'cache',
            ac: 'show_cache',
            display: 'none',
            url: '?ct=cache&ac=show_cache'
          },
          {
            id: '147',
            parentid: '127',
            topid: '123',
            name: '配置批量修改',
            admin: '2',
            lang: 'menu_config_batch_edit',
            ct: 'config',
            ac: 'batch_edit',
            display: 'none',
            url: '?ct=config&ac=batch_edit'
          }
        ]
      },
      {
        id: '148',
        parentid: '123',
        topid: '123',
        name: '会话管理',
        admin: '1',
        lang: 'menu_session_manage',
        class: 'fa fa-rocket',
        children: [
          {
            id: '149',
            parentid: '148',
            topid: '123',
            name: '在线会话',
            lang: 'menu_session_online',
            ct: 'session',
            ac: 'online',
            url: '?ct=session&ac=online'
          },
          {
            id: '150',
            parentid: '148',
            topid: '123',
            name: '历史会话',
            lang: 'menu_session_offline',
            ct: 'session',
            ac: 'offline',
            url: '?ct=session&ac=offline'
          }
        ]
      },
      {
        id: '151',
        parentid: '123',
        topid: '123',
        name: '系统管理',
        lang: 'menu_system_manage',
        admin: '2',
        class: 'fa fa-wrench',
        children: [
          {
            id: '152',
            parentid: '151',
            topid: '123',
            name: '数据表文档',
            lang: 'menu_debug_database',
            ct: 'debug',
            ac: 'database_doc',
            url: '?ct=debug&ac=database_doc'
          },
          {
            id: '153',
            parentid: '151',
            topid: '123',
            name: '浏览错误日志',
            lang: 'menu_debug_log',
            ct: 'debug',
            ac: 'show_log',
            url: '?ct=debug&ac=show_log'
          },
          {
            id: '154',
            parentid: '151',
            topid: '123',
            name: '远程接口调试',
            lang: 'menu_debug_remote',
            ct: 'debug',
            ac: 'remote',
            url: '?ct=debug&ac=remote'
          },
          {
            id: '155',
            parentid: '151',
            topid: '123',
            name: '数据库对比',
            lang: 'menu_debug_database_compare',
            ct: 'debug',
            ac: 'database_compare',
            url: '?ct=debug&ac=database_compare'
          },
          {
            id: '156',
            parentid: '151',
            topid: '123',
            name: '配置管理',
            lang: 'menu_configuration_manage',
            ct: 'config',
            ac: 'index',
            url: '?ct=config&ac=index'
          },
          {
            id: '157',
            parentid: '151',
            topid: '123',
            name: '配置添加',
            lang: 'menu_configuration_add',
            ct: 'config',
            ac: 'add',
            display: 'none',
            url: '?ct=config&ac=add'
          },
          {
            id: '158',
            parentid: '151',
            topid: '123',
            name: '配置修改',
            lang: 'menu_configuration_update',
            ct: 'config',
            ac: 'edit',
            display: 'none',
            url: '?ct=config&ac=edit'
          },
          {
            id: '159',
            parentid: '151',
            topid: '123',
            name: '配置删除',
            lang: 'menu_configuration_delete',
            ct: 'config',
            ac: 'del',
            display: 'none',
            url: '?ct=config&ac=del'
          },
          {
            id: '160',
            parentid: '151',
            topid: '123',
            name: 'Spam管理',
            lang: 'menu_spam_manage',
            ct: 'spam',
            ac: 'index',
            url: '?ct=spam&ac=index'
          },
          {
            id: '161',
            parentid: '151',
            topid: '123',
            name: 'Redis键值管理',
            lang: 'menu_redis_keys',
            ct: 'cache',
            ac: 'redis_keys',
            url: '?ct=cache&ac=redis_keys'
          },
          {
            id: '162',
            parentid: '151',
            topid: '123',
            name: 'Redis服务器信息',
            lang: 'menu_redis_info',
            ct: 'cache',
            ac: 'redis_info',
            url: '?ct=cache&ac=redis_info'
          }
        ]
      },
      {
        id: '163',
        parentid: '123',
        topid: '123',
        name: '计划任务',
        admin: '2',
        lang: 'menu_crond_manage',
        class: 'fa fa-coffee',
        children: [
          {
            id: '164',
            parentid: '163',
            topid: '123',
            name: '任务列表',
            lang: 'menu_crond_list',
            ct: 'crond',
            ac: 'index',
            url: '?ct=crond&ac=index'
          }
        ]
      }
    ]
  }
]

// 当前用户已有权限
export const MenuCheck =
  'portal-index,myflow-record_list,myreview-approve_list,myreview-cc_list,circulate-index,schedule-lists,document-received,message-index,document-published,doc_type-index,form-add,form-index,form_type-index,portal-get_user_docs,tisi-member_select,tisi-member_search,tisi-member_select_whole,myflow-index,myflow-apply,myflow-apply_h5_save,myflow-edit_apply,myflow-cancel_approve,myflow-record_detailed,my_myflow-ajax_get_myforms,form-edit,form-enable,form-load_organization,form-load_organization_sub,form-set_user,form-view,form_type-add,form_type-edit,form_type-hide,tds-add,tds-edit,tds-del,circulate-detail,circulate-add,circulate-ajax_add_circulate,circulate-ajax_add_comment,circulate-ajax_confirm,circulate-ajax_get_detail,circulate-ajax_invite,circulate-ajax_search_lists,circulate-ajax_get_creator,myreview-approve,myreview-cc,myreview-count,myreview-reviews,myreview-ccs,myflow-myrecords,myreview-get_approve_users,myreview-save_suggestion,myflow-myinfo,myflow-get_departments,myflow-get_stations,myreview-save_approve,flow-edit,flow-get_form_configs,flow-more_condition,flow-node_add,flow-node_edit,flow-node_delete,flow-get_flow,flow-modify_rank,flow-delete_flow,flow-get_flow_detail,flow-get_username,document-detail,document-mail_notice,document-ajax_send_mail,document-confirm,document-ajax_confirm,document-delete,doc_type-save,doc_type-delete,document-get_docs_by_cate,document-is_sn_repeat,document-ajax_get_docs,document-add,schedule-search_schedule_by_day,schedule-status,schedule-get_schedule_by_id,schedule-save,schedule-details,schedule-get_days_from_month,schedule-get_child_detail,message-add,message-del,message-set_read,message-details,message-get_message_nums,message-get_message_lists,message-message_read,message-get_types,message-get_message_by_type,upload-upload,upload-upload_html5,upload-upload_chunked,upload-download,admin-editpwd,admin-mypurview,admin-index,admin-index_base,admin-add,admin-edit,admin-create_pwd,admin_group-index,admin_group-add,admin_group-edit,admin-oplog,admin-login_log,admin-active,session-terminate,tds-index,reviewer-index,reviewer-add,reviewer-delete,reviewer-edit,document-approver,document-edit,member-index,member-upload_head_img,member-personal_detail,member-personal_edit,member-system_info,member-system_info_edit,member-welfare,member-wage_info_edit,member-assets,member-works,member-examine,member_transfer_position-apply,member_transfer_position-detail,member_become_regular_worker-apply,member_become_regular_worker-detail,member-my_underling,member-my_department,index-undefined,hr_resume-create,hr_resume-make_list,hr_member-deploy_list,hr_member-quit_list,hr_member-leave_list,hr_member-working,hr_member-apply_deploy,hr_member-apply_quit,hr_member-apply_leave,hr_clique-organization_list,hr_clique-department_list,hr_clique-station_list,hr_clique-member_list,hr_member-detail,hr_member-on_job_list,hr_member-on_quit_list,hr_member-on_leave_list,hr_member-on_wait_leave_list,hr_resume-detail,hr_resume-detail_school,hr_resume-school_create,hr_resume-school_edit,hr_resume-school_delete,hr_resume-detail_work,hr_resume-work_create,hr_resume-work_edit,hr_resume-work_delete,hr_resume-training_create,hr_resume-training_edit,hr_resume-training_delete,hr_resume-book_create,hr_resume-book_edit,hr_resume-book_delete,hr_resume-award_create,hr_resume-award_edit,hr_resume-award_delete,salary-index,salary-detail,salary-edit,salary-save,salary-import_logs,salary-delete,salary_adjust-index,salary_adjust-detail,salary_adjust-edit,salary_adjust-save,salary_adjust-delete,assets-index,assets-detail,assets-edit,assets-save,assets-delete,assets-get_assets_log_detail,assets-save_assets_log,assets-del_assets_log,member_agreement-detail,member_agreement-save,member_agreement-edit,member_agreement-delete,member_lang-save,member_lang-edit,member_lang-delete,member_education_bg-detail,member_education_bg-save,member_education_bg-edit,member_education_bg-delete,member_work_history-detail,member_work_history-save,member_work_history-edit,member_work_history-delete,member_training_experience-detail,member_training_experience-save,member_training_experience-edit,member_training_experience-delete,member_credentials-detail,member_credentials-save,member_credentials-edit,member_credentials-delete,member_rewards_punishments-detail,member_rewards_punishments-save,member_rewards_punishments-edit,member_rewards_punishments-delete,member_examine-detail,member_examine-save,member_examine-edit,member_examine-delete,member_aorap-detail,member_aorap-save,member_aorap-edit,member_aorap-delete,ajax-get_city_list,ajax-get_organization_list,ajax-get_department_list,ajax-get_station_list,ajax-search_station,ajax-check_member_sn,ajax-search_prove,ajax-search_member,ajax-get_ug_contact,ajax-update_ug_contact,ajax-delete_ug_contact,admin-editpwd_fake,myflow-apply_save'
