import axios from 'axios'

import { DISCOUNT_UPLOAD_REQUEST, DISCOUNT_UPLOAD_SUCCESS, DISCOUNT_UPLOAD_ERROR } from '../actions/uploadDiscount'
import { XCOM_URL, XCOM_USER, XCOM_PASS } from '../../config/env.config'

const state = {
    uploadStatus: '',
    uploadCode: 0
}

const actions = {
    [DISCOUNT_UPLOAD_REQUEST]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            console.log(data)
            commit(DISCOUNT_UPLOAD_REQUEST)
            axios
                .post(`${XCOM_URL}/api/shares`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    auth: {
                        username: XCOM_USER,
                        password: XCOM_PASS
                    }
                })
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
