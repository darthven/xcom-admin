import axios from 'axios'

import { IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR } from '../actions/uploadImage'

const state = {
    uploadStatus: '',
    uploadCode: 0
}

const actions = {
    [IMAGE_UPLOAD_REQUEST]: ({ commit }, fileData) => {
        return new Promise((resolve, reject) => {
            commit(IMAGE_UPLOAD_REQUEST)
            axios
                .post('/api', fileData)
                .then(response => {
                    commit(IMAGE_UPLOAD_SUCCESS, response)
                    resolve(response)
                })
                .catch(error => {
                    commit(IMAGE_UPLOAD_ERROR, error)
                    reject(error)
                })
        })
    }
}

const mutations = {
    [IMAGE_UPLOAD_REQUEST]: state => {
        state.uploadStatus = 'loading'
    },
    [IMAGE_UPLOAD_SUCCESS]: (state, response) => {
        state.uploadStatus = 'success'
        state.uploadCode = response.code
    },
    [IMAGE_UPLOAD_ERROR]: (state, error) => {
        state.uploadStatus = 'error'
        state.uploadCode = error.code
    }
}

export default {
    state,
    actions,
    mutations
}
