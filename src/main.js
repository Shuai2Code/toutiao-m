import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

// 创建vue根实例，将router store 配置到根实例中
// 把 App根组件渲染到#app节点上
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
