import axios from 'axios'

import {
    IMPORT_VIRTUAL_CARDS_REQUEST,
    IMPORT_VIRTUAL_CARDS_SUCCESS,
    IMPORT_VIRTUAL_CARDS_ERROR
} from '../actions/importVirtualCards'
import { XCOM_URL } from '../../config/env.config'

const state = {
    uploadStatus: '',
    uploadCode: 0
}

const actions = {
    [IMPORT_VIRTUAL_CARDS_REQUEST]: ({ commit }, fileData) => {
        return new Promise((resolve, reject) => {
            commit(IMPORT_VIRTUAL_CARDS_REQUEST)
            axios
                .post(`${XCOM_URL}/virtCards`, fileData, {
                    auth: {
                        user: 'admin',
                        password: '684585'
                    }
                })
                .then(response => {
                    commit(IMPORT_VIRTUAL_CARDS_SUCCESS, response)
                    resolve(response)
                })
                .catch(error => {
                    commit(IMPORT_VIRTUAL_CARDS_ERROR, error)
                    reject(error)
                })
        })
    }
}

const mutations = {
    [IMPORT_VIRTUAL_CARDS_REQUEST]: state => {
        state.uploadStatus = 'loading'
    },
    [IMPORT_VIRTUAL_CARDS_SUCCESS]: (state, response) => {
        state.uploadStatus = 'success'
        state.uploadCode = response.code
    },
    [IMPORT_VIRTUAL_CARDS_ERROR]: (state, error) => {
        state.uploadStatus = 'error'
        state.uploadCode = error.code
    }
}

export default {
    state,
    actions,
    mutations
}
