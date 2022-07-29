// 项目的请求模块
import axios from 'axios'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
  baseURL: 'http://www.liulongbin.top:8000' // 基础路径
})

//  请求拦截
// 响应拦截

// 导出
export default request
