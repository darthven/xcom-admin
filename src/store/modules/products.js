import axios from 'axios'

import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_ERROR } from '../actions/products'
import { XCOM_URL } from '../../config/env.config'

const state = { productIds: [] }

const getters = {
    productIds: state => state.productIds,
    status: state => state.status
}

const actions = {
    [PRODUCTS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(PRODUCTS_REQUEST)
            axios
                .get(`${XCOM_URL}/products`)
                .then(response => {
                    commit(PRODUCTS_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(PRODUCTS_ERROR, err)
                    reject(err)
                })
        })
    }
}

const mutations = {
    [PRODUCTS_REQUEST]: state => {
        state.status = 'loading'
    },
    [PRODUCTS_SUCCESS]: (state, response) => {
        state.status = 'success'
        state.productIds = response.data
    },
    [PRODUCTS_ERROR]: state => {
        state.status = 'error'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
