// 导入axios
import axios from 'axios';

// 进行一些全局配置
// 公共路由(网络请求地址)
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1';
// 请求响应超时时间
axios.defaults.timeout = 5000;
axios.interceptors.request.use(
        config => {
            // 每次发送请求之前判断vuex中是否存在token        
            // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
            // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
            const token = window.sessionStorage.getItem('token');
            config.headers.Authorization = token;
            return config;
        })
    // 封装自己的get/post方法
export default {
    get: function(path = '', data = {}) {
        return new Promise(function(resolve, reject) {
            axios.get(path, {
                    params: data
                })
                .then(function(response) {
                    // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },

    post: function(path = '', data = {}) {
        return new Promise(function(resolve, reject) {
            axios.post(path, data)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    put: function(path = '', data = {}) {
        return new Promise(function(resolve, reject) {
            axios.put(path, data)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
    delete: function(path = '', data = {}) {
        return new Promise(function(resolve, reject) {
            axios.delete(path, data)
                .then(function(response) {
                    resolve(response.data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    },
};