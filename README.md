#### 说明手册
- 页面默认`layout: 'default'`是带顶部和左侧菜单的，如果不需要这些ui，vue文件里要声明`layout：'page'`
- 考虑build后js的体积，不再全量引入`element-ui`组件，目前默认引入这几个组件，`Loading`, `MessageBox`, `Notification`, `Message`；其他组件请各自再页面引入
- `localStorage` 操作请使用 `this.$storage`, 具体方法请参考`@/utils/caches/index.js`
- `sessionStorage` 操作请使用 `this.$session`, 具体方法请参考`@/utils/caches/index.js`
- `document.cookie` 操作请使用 `this.$cookie`, 具体方法请参考`@/utils/caches/index.js`


{
  "label": "我的事务",
  "path": "/myflow",
  "ct": "myflow",
  "ac": "index",
  "display": 0
},


##

