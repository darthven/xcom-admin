import axios from 'axios'

import {
    PRODUCTS_REQUEST,
    PRODUCTS_SUCCESS,
    PRODUCTS_ERROR,
    REGIONS_REQUEST,
    REGIONS_SUCCESS,
    REGIONS_ERROR,
    SELECT_REGION,
    SELECT_STORE,
    SELECT_PRODUCTS,
    REMOVE_PRODUCT,
    STORES_REQUEST,
    STORES_SUCCESS,
    STORES_ERROR,
    DISCOUNT_UPLOAD_REQUEST,
    DISCOUNT_UPLOAD_SUCCESS,
    DISCOUNT_UPLOAD_ERROR,
    IMPORT_VIRTUAL_CARDS_REQUEST,
    IMPORT_VIRTUAL_CARDS_SUCCESS,
    IMPORT_VIRTUAL_CARDS_ERROR
} from '../actions/xcom'
import { XCOM_URL, XCOM_USER, XCOM_PASS } from '../../config/env.config'

const state = {
    productIds: [],
    regionIds: [],
    storeIds: [],
    selectedRegion: null,
    selectedStore: null,
    selectedProducts: null,
    status: '',
    code: 0
}

const getters = {
    productIds: state => state.productIds,
    regionIds: state => state.regionIds,
    storeIds: state => state.storeIds,
    selectedRegion: state => state.selectedRegion,
    selectedStore: state => state.selectedStore,
    selectedProducts: state => state.selectedProducts,
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
    [STORES_REQUEST]: ({ commit }, regionId) => {
        return new Promise(async (resolve, reject) => {
            commit(STORES_REQUEST)
            try {
                const storeIds = (await axios.get(`${XCOM_URL}/stores`, {
                    params: {
                        type: 'Аптека',
                        region: regionId
                    }
                })).data.map(st => st.id)
                commit(STORES_SUCCESS, storeIds)
                resolve(storeIds)
            } catch (err) {
                commit(STORES_ERROR)
                reject(err)
            }
        })
    },
    [PRODUCTS_REQUEST]: ({ commit }, regionId) => {
        return new Promise(async (resolve, reject) => {
            commit(PRODUCTS_REQUEST, regionId)
            try {
                const productIds = (await axios.get(`${XCOM_URL}/goods`, {
                    params: {
                        region: regionId
                    }
                })).data.data.map(pr => pr.id)
                commit(PRODUCTS_SUCCESS, productIds)
                resolve(productIds)
            } catch (err) {
                commit(PRODUCTS_ERROR)
                reject(err)
            }
        })
    },
    [REMOVE_PRODUCT]: ({ commit }, productId) => {
        return new Promise(resolve => {
            commit(REMOVE_PRODUCT, productId)
            resolve(state.selectedProducts)
        })
    },
    [SELECT_REGION]: ({ commit }, selectedRegion) => {
        return new Promise(resolve => {
            commit(SELECT_REGION, selectedRegion)
            resolve(selectedRegion)
        })
    },
    [SELECT_STORE]: ({ commit }, selectedStore) => {
        return new Promise(resolve => {
            commit(SELECT_STORE, selectedStore)
            resolve(selectedStore)
        })
    },
    [SELECT_PRODUCTS]: ({ commit }, products) => {
        return new Promise(resolve => {
            commit(SELECT_PRODUCTS, products)
            resolve(products)
        })
    },
    [DISCOUNT_UPLOAD_REQUEST]: ({ commit }, data) => {
        return new Promise((resolve, reject) => {
            commit(DISCOUNT_UPLOAD_REQUEST)
            axios
                .post(`${XCOM_URL}/shares`, data, {
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
    },
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
    [STORES_REQUEST]: state => {
        state.status = 'loading'
    },
    [STORES_SUCCESS]: (state, data) => {
        state.status = 'success'
        state.storeIds = data
    },
    [STORES_ERROR]: state => {
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
    },
    [SELECT_REGION]: (state, data) => {
        state.selectedRegion = data
    },
    [SELECT_STORE]: (state, data) => {
        state.selectedStore = data
    },
    [SELECT_PRODUCTS]: (state, data) => {
        state.selectedProducts = data
    },
    [REMOVE_PRODUCT]: (state, data) => {
        state.selectedProducts && state.selectedProducts.splice(state.selectedProducts.indexOf(data), 1)
    },
    [DISCOUNT_UPLOAD_REQUEST]: state => {
        state.status = 'loading'
    },
    [DISCOUNT_UPLOAD_SUCCESS]: (state, response) => {
        state.status = 'success'
        state.code = response.code
    },
    [DISCOUNT_UPLOAD_ERROR]: (state, error) => {
        state.status = 'error'
        state.code = error.code
    },
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
    getters,
    actions,
    mutations
}
