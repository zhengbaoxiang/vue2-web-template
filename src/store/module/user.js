/*
 * @Date: 2023-12-13 16:17:26
 * @LastEditors: zbx
 * @LastEditTime: 2023-12-22 17:39:18
 * @descript: 文件描述
 */
import { login, logout, getUserAuth,} from '@/api/user'
import { setToken, getToken, setLocal, getLocal } from '@/libs/util'
export default {
    state: {
        token: '',
        userName: '',
        userInfo: {},
        access: [],
        auth: {},
        roleList: [],
    },
    getters: {
        access: (state, getters, rootState) => {
            return state.access
        },
        auth: (state, getters, rootState) => {
            return state.auth
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setUserName(state, value) {
            state.userName = value
            setLocal('userName', value)
        },
        setUserInfo(state, value) {
            state.userInfo = value;
        },
        setRole(state, value) {
            state.roleList = value
        },
        setAccess(state, value) {
            state.access = value
        },
        setUserAuth(state, value) {
            state.auth = value;
        },

    },
    actions: {
        login ({ state, commit },data){
            return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    setToken('admin')
                    resolve(123)
                }, 500);
            })
        },
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                // 调鉴权接口
                getUserAuth({ token: getToken() }).then(res => {
                    const userInfo = {}
                    commit('setUserName', userInfo.userName);
                    commit('setRole', userInfo.roleList || []);
                    commit('setUserInfo', userInfo);

                    const access = ['admin']
                    const auth = { admin: true }
                    commit('setAccess', access);
                    commit('setUserAuth', auth);
                    resolve(access)
                }).catch(err => {
                    console.log(err)

                    // debug
                    const access = ['admin']
                    const auth = { admin: true }
                    commit('setAccess', access);
                    commit('setUserAuth', auth);
                    resolve(access)

                    // reject(err)
                })

            })
        }
    }
}