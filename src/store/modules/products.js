import axios from 'axios'

import { PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_ERROR } from '../actions/products'
import { XCOM_URL } from '../../config/env.config'
import { REGIONS } from '../../config/regions'

const state = { productIds: [] }

const getters = {
    productIds: state => state.productIds,
    status: state => state.status
}

const actions = {
    [PRODUCTS_REQUEST]: ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            commit(PRODUCTS_REQUEST)
            try {
                const products = []
                let productIds = []
                for (const reg of REGIONS) {
                    const prod = await axios.get(`${XCOM_URL}/goods?region=${reg.id}`)
                    products.push(prod.data)
                    productIds = products
                        .map(pr => pr.data)
                        .reduce((a, b) => a.concat(b))
                        .map(pr => pr.id)
                }
                commit(PRODUCTS_SUCCESS, productIds)
                resolve(productIds)
            } catch (err) {
                commit(PRODUCTS_ERROR)
                reject(err)
            }
        })
    }
}

const mutations = {
    [PRODUCTS_REQUEST]: state => {
        state.status = 'loading'
    },
    [PRODUCTS_SUCCESS]: (state, data) => {
        state.status = 'success'
        state.productIds = data
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
