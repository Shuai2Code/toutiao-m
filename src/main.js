import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载iconfont 图标样式
// import './styles/iconfont.css'

// 引入vant及其样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式(最好放到最后，方便覆盖第三方样式)
import './styles/index.less'

// 自动设置rem 的基准值，设置字体大小
import 'amfe-flexible'

// 全局注册vant组件
Vue.use(Vant)

Vue.config.productionTip = false

// 创建vue根实例，将router store 配置到根实例中
// 把 App根组件渲染到#app节点上
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
