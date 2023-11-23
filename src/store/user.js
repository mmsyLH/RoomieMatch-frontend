import {defineStore} from 'pinia';
import {login, register, all} from '@/js/user';
import {getToken, setToken} from "@/utils/auth";


export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            // token: getToken(),
            "state": 1,
            "id": 0,
            "email": "",
            "userName": "",
            "userType": "",
            "token": getToken(),
            "binding": 0,
            "createTime": "",
            "updateTime": "",
        },
        usIDAndName:[],
    }),

    getters: {
        // 定义需要的 getters
        getId: (state) => {
            return state.user.id;
        },
        // 用于获取 userName
        getUserNameById: (state) => (id) => {
            const user = state.usIDAndName.find(user => user.id === id);
            return user ? user.userName : null;
        }
    },

    mutations: {
        //设置
        SET_TOKEN(token) {
            this.user.token = token;
        }, GET_USER() {
            return this.user;
        }, // 定义其他需要的 mutations
    },

    actions: {
        // 登录
        login(loginForm) {
            const data = {
                email: loginForm.email, password: loginForm.password
            };
            return new Promise((resolve, reject) => {
                login(data)
                    .then(res => {
                        if (!getToken()) {
                            setToken(res.data.userinfo.token)//存在cookies
                        }
                        console.log("res:", res.data.userinfo)
                        this.user = res.data.userinfo;
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        //注册
        register(registerForm) {
            // console.log("进入了user.js的register()参数为", registerForm);
            const data = {
                email: registerForm.email.trim(),
                userName: registerForm.userName.trim(),
                password: registerForm.password.trim(),
            };
            return new Promise((resolve, reject) => {
                register(data)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }, //得到全部用户信息
        all() {
            return new Promise((resolve, reject) => {
                all()
                    .then(res => {
                        console.log("得到的全部信息：",res.data)
                        //使用usIDAndName来储存id和userName
                        // 遍历用户信息，存储id和userName
                        const arr= res.data.userinfos;
                        arr.forEach(user => {
                            this.usIDAndName.push({ id: user.id, userName: user.userName });
                        });
                        console.log(" this.usIDAndName:", this.usIDAndName)
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
    },

}, {
    persist: true
});
