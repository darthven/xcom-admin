import axios from 'axios'

import { DISCOUNT_UPLOAD_REQUEST, DISCOUNT_UPLOAD_SUCCESS, DISCOUNT_UPLOAD_ERROR } from '../actions/uploadDiscount'

const state = {
    uploadStatus: '',
    uploadCode: 0
}

const actions = {
    [DISCOUNT_UPLOAD_REQUEST]: ({ commit }, fileData) => {
        return new Promise((resolve, reject) => {
            commit(DISCOUNT_UPLOAD_REQUEST)
            axios
                .get('/api', fileData)
                .then(response => {
                    commit(DISCOUNT_UPLOAD_SUCCESS, response)
                    resolve(response)
                })
                .catch(error => {
                    commit(DISCOUNT_UPLOAD_ERROR, error)
                    reject(error)
                })
        })
    }
}

const mutations = {
    [DISCOUNT_UPLOAD_REQUEST]: state => {
        state.uploadStatus = 'loading'
    },
    [DISCOUNT_UPLOAD_SUCCESS]: (state, response) => {
        state.uploadStatus = 'success'
        state.uploadCode = response.code
    },
    [DISCOUNT_UPLOAD_ERROR]: (state, error) => {
        state.uploadStatus = 'error'
        state.uploadCode = error.code
    }
}

export default {
    state,
    actions,
    mutations
}
