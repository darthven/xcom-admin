import axios from 'axios'

import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
}

const actions = {
    [AUTH_REQUEST]: ({ commit }, user) => {
        return new Promise(resolve => {
            commit(AUTH_REQUEST)
            axios
                .post('/api/auth', {
                    email: user.email,
                    password: user.password
                })
                .then(response => {
                    console.log(response)
                    localStorage.setItem('user-token', response.token)
                    axios.defaults.headers.common['Authorization'] = response.token
                    commit(AUTH_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token')
            resolve()
        })
    }
}

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, response) => {
        state.status = 'success'
        state.token = response.token
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: state => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: state => {
        state.token = ''
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
