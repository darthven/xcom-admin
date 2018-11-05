import axios from 'axios'

import {
    BANNER_REQUEST,
    BANNER_SUCCESS,
    BANNER_ERROR,
    BANNERS_REQUEST,
    BANNERS_SUCCESS,
    BANNERS_ERROR,
    CREATE_BANNER_REQUEST,
    CREATE_BANNER_SUCCESS,
    CREATE_BANNER_ERROR,
    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_ERROR,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_ERROR
} from '../actions/banner'

const state = { banners: [], selectedBanner: null, bannerStatus: '' }

const getters = {
    banners: state => state.banners,
    selectedBanner: state => state.selectedBanner
}

const actions = {
    [BANNER_REQUEST]: ({ commit }, bannerId) => {
        return new Promise((resolve, reject) => {
            commit(BANNER_REQUEST)
            axios
                .get(`/api/banner/${bannerId}`)
                .then(response => {
                    commit(BANNER_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(BANNER_ERROR, err)
                    reject(err)
                })
        })
    },
    [BANNERS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(BANNER_REQUEST)
            axios
                .get(`/api/banner`)
                .then(response => {
                    commit(BANNERS_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(BANNERS_ERROR, err)
                    reject(err)
                })
        })
    },
    [CREATE_BANNER_REQUEST]: ({ commit }, banner) => {
        return new Promise((resolve, reject) => {
            commit(CREATE_BANNER_REQUEST)
            axios
                .post('/api/banner', banner)
                .then(response => {
                    commit(CREATE_BANNER_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(CREATE_BANNER_ERROR, err)
                    reject(err)
                })
        })
    },
    [UPDATE_BANNER_REQUEST]: ({ commit }, { bannerId, banner }) => {
        return new Promise((resolve, reject) => {
            commit(UPDATE_BANNER_REQUEST)
            axios
                .put(`/api/banner/${bannerId}`, banner)
                .then(response => {
                    commit(UPDATE_BANNER_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(UPDATE_BANNER_ERROR, err)
                    reject(err)
                })
        })
    },
    [DELETE_BANNER_REQUEST]: ({ commit }, bannerId) => {
        return new Promise((resolve, reject) => {
            commit(CREATE_BANNER_REQUEST)
            axios
                .delete(`/api/banner/${bannerId}`)
                .then(response => {
                    commit(DELETE_BANNER_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(DELETE_BANNER_ERROR, err)
                    reject(err)
                })
        })
    }
}

const mutations = {
    [BANNER_REQUEST]: state => {
        state.bannerStatus = 'loading'
    },
    [BANNER_SUCCESS]: (state, response) => {
        state.bannerStatus = 'success'
        state.selectedBanner = response.data
    },
    [BANNERS_ERROR]: state => {
        state.bannerStatus = 'error'
    },
    [BANNERS_REQUEST]: state => {
        state.bannerStatus = 'loading'
    },
    [BANNERS_SUCCESS]: (state, response) => {
        state.bannerStatus = 'success'
        state.banners = response.data
    },
    [BANNER_ERROR]: state => {
        state.bannerStatus = 'error'
    },
    [CREATE_BANNER_REQUEST]: state => {
        state.bannerStatus = 'loading'
    },
    [CREATE_BANNER_SUCCESS]: (state, response) => {
        state.bannerStatus = 'success'
        state.banners.push(response.data)
    },
    [CREATE_BANNER_ERROR]: state => {
        state.bannerStatus = 'error'
    },
    [UPDATE_BANNER_REQUEST]: state => {
        state.bannerStatus = 'loading'
    },
    [UPDATE_BANNER_SUCCESS]: (state, response) => {
        state.bannerStatus = 'success'
        const updatedBanner = response.data
        console.log(updatedBanner)
        const index = state.banners.findIndex(ban => ban._id === updatedBanner._id)
        state.banners[index] = updatedBanner
    },
    [UPDATE_BANNER_ERROR]: state => {
        state.bannerStatus = 'error'
    },
    [DELETE_BANNER_REQUEST]: state => {
        state.bannerStatus = 'loading'
    },
    [DELETE_BANNER_SUCCESS]: (state, response) => {
        console.log(response.data)
        state.bannerStatus = 'success'
        const index = state.banners.findIndex(ban => ban._id === response.data)
        console.log(state.banners, response.data, index)
        state.banners.splice(index, 1)
    },
    [DELETE_BANNER_ERROR]: state => {
        state.bannerStatus = 'error'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
