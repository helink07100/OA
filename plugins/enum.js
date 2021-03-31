// 加载enum 下的所有js文件，不包括子目录
const modules = require.context('~/enum', false, /\.js$/)

// 遍历文件，返回对象
const requireAll = (context) => context.keys().map(context)

const $enmu = {}

// 遍历文件挂载到$enmu上
requireAll(modules).forEach((module) => {
  Object.keys(module).forEach((key) => {
    $enmu[key] = Object.freeze(module[key])
  })
})
export default function({ app }, inject) {
  inject('enum', Object.freeze($enmu))
}
