import { message } from 'ant-design-vue';
import axios from 'axios'
const baseURL = import.meta.env.VITE_APP_API_BASE
// console.log(baseURL)
const Api = axios.create({
  baseURL,
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded;chartset=utf-8',
  },
  withCredentials: true,
  timeout: 10000,
})

// 请求拦截器
Api.interceptors.request.use(
  config=>{
    const token = localStorage.getItem('token') || null; 
    token && (config.headers.Authorization = token)
    if(config.headers.post){
      config.headers.post['Content-Type'] = 'application/json'
    }
    return config
  },
  error =>{
    return Promise.error(error)
  }
)

const toLogin = ()=>{
  this.$router.replace({
    path: '/login',
    params: {
      redirect: this.$route.fullPath
    }
  })
}

// 响应拦截器
Api.interceptors.response.use(
  response=> {
    switch (response.status){
      case 200 : 
        return Promise.resolve(response);
      default:
        return Promise.reject(response);
    }
  },
  error => {
    const { response } = error.response;
    if(response.status){
      switch (response.status){
        case 400 : 
          break;
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。   
        case 401 : 
          toLogin()
          break;
  
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面 
          
        case 403:
          message.error('登录过期，请重新登录',2000)
          localStorage.removeItem('token');   
          toLogin()
          break;
  
        // 请求不存在
        case 404 : 
          message.error('请求地址不存在',2000)
          break;
        default:
          message.error(error.response.data)
      }
    }
    return Promise.reject(error.response)

  }
)


export default Api




