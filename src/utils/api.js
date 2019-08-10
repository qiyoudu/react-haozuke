import axios from 'axios'
import { BASE_URL } from './config'
const API = axios.create({
  baseURL: BASE_URL
})

// 配置响应的拦截器
API.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)
// 这里为什么有{}
export { API }
