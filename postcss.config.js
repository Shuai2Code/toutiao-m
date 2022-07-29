// postcss的配置文件
// postcss是基于node.js 的用来处理css 的工具

// 需要导出一个对象
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
