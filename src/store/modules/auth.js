import axios from 'axios'

import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
}

const actions = {
    [AUTH_REQUEST]: ({ commit }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            axios
                .post('/admin-api/auth', {
                    email: user.email,
                    password: user.password
                })
                .then(response => {
                    commit(AUTH_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(AUTH_ERROR, err)
                    localStorage.removeItem('user-token')
                    reject(err)
                })
        })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization']
    }
}

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, response) => {
        state.status = 'success'
        localStorage.setItem('user-token', response.data.token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user-token')
        state.token = 'Bearer ' + response.data.token
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
