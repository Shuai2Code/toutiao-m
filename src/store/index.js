import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storege'
Vue.use(Vuex)

// 定义存储用户的登录信息
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 存储当前登录用户的登录状态
    user: getItem(USER_KEY)
  },
  getters: {},
  mutations: {
    setUser(state, data) {
      state.user = data
      // 永久本地化存储
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {},
  modules: {}
})
