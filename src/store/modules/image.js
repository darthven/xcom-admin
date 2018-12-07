import axios from 'axios'

import { IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_ERROR, SELECT_IMAGE } from '../actions/image'

const state = {
    uploadStatus: '',
    uploadCode: 0,
    imageUrl: null
}

const getters = {
    imageUrl: state => state.imageUrl
}

const actions = {
    [IMAGE_UPLOAD_REQUEST]: ({ commit }, { bannerId, image }) => {
        return new Promise((resolve, reject) => {
            commit(IMAGE_UPLOAD_REQUEST)
            axios
                .post(`/admin-api/banner/${bannerId}/image`, image, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    commit(IMAGE_UPLOAD_SUCCESS, response)
                    resolve(response)
                })
                .catch(error => {
                    commit(IMAGE_UPLOAD_ERROR, error)
                    reject(error)
                })
        })
    },
    [SELECT_IMAGE]: ({ commit }, url) => {
        return new Promise(resolve => {
            commit(SELECT_IMAGE, url)
            resolve(url)
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
        state.imageUrl = response.data.url
    },
    [IMAGE_UPLOAD_ERROR]: (state, error) => {
        state.uploadStatus = 'error'
        state.uploadCode = error.code
    },
    [SELECT_IMAGE]: (state, url) => {
        state.imageUrl = url
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
