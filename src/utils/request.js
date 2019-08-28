import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout = 5000

// request interceptor
axios.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  response => {
    const res = response.data
    return Promise.resolve(res)
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default {
  post: function(url, params) {
    return axios({
      url: url,
      method: 'post',
      data: params
    })
  },
  get: function(url, params) {
    return axios({
      url: url,
      method: 'get',
      params
    })
  },
  put: function(url, params) {
    return axios({
      url: url,
      method: 'put',
      params
    })
  },
  delete: function(url, params) {
    return axios({
      method: 'delete',
      url: url,
      params
    })
  }
}
