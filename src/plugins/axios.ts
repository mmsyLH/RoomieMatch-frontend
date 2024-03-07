import axios from "axios";
// 创建axios实例
const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 6000
});

myAxios.defaults.withCredentials=true;// 表示向后台发送请求的时候要携带请求的凭证 cookies
// 响应拦截器
myAxios.interceptors.response.use(
    (response) => {
        console.log(response)
        let res=response.data;
        //如果返回的是文件
        if(response.config.responseType==='blob' ){
            return res;
        }
        //如果返回是字符串
        if(typeof res==='string' ){
            //如果res不为空 就转成json对象
            res=res?JSON.parse(res):res;
        }
        //打印请求错误错误提示信息
        if (response.data.code !== 200) {

        }
        return response.data;
    }
);

// 请求拦截器
myAxios.interceptors.request.use(
    (config) => {
        console.log("我要发请求啦")
        console.log(config)
        config.headers["Content-Type"]='application/json;charset=utf-8';
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default myAxios;
