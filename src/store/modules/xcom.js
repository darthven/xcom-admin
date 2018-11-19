import axios from 'axios'

import {
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_ERROR,
    REGIONS_REQUEST,
    REGIONS_SUCCESS,
    REGIONS_ERROR
} from '../actions/xcom'
import { XCOM_URL } from '../../config/env.config'

const state = { productIds: [], regionIds: [] }

const getters = {
    productIds: state => state.productIds,
    regionIds: state => state.regionIds,
    status: state => state.status
}

const actions = {
    [REGIONS_REQUEST]: ({ commit }) => {
        return new Promise(async (resolve, reject) => {
            commit(REGIONS_REQUEST)
            try {
                const regions = (await axios.get(`${XCOM_URL}/regions`)).data.map(reg => reg.id)
                commit(REGIONS_SUCCESS, regions)
                resolve(regions)
            } catch (err) {
                commit(REGIONS_ERROR)
                reject(err)
            }
        })
    },
    [PRODUCTS_REQUEST]: ({ commit }, regionId) => {
        return new Promise(async (resolve, reject) => {
            commit(PRODUCTS_REQUEST, regionId)
            try {
                const productIds = (await axios.get(`${XCOM_URL}/goods?region=${regionId}`)).data.data.map(pr => pr.id)
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
    [REGIONS_REQUEST]: state => {
        state.status = 'loading'
    },
    [REGIONS_SUCCESS]: (state, data) => {
        state.status = 'success'
        state.regionIds = data
    },
    [REGIONS_ERROR]: state => {
        state.status = 'error'
    },
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
