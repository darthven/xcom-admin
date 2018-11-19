import axios from 'axios'

import {
    BLOCK_REQUEST,
    BLOCK_SUCCESS,
    BLOCK_ERROR,
    BLOCKS_REQUEST,
    BLOCKS_SUCCESS,
    BLOCKS_ERROR,
    CREATE_BLOCK_REQUEST,
    CREATE_BLOCK_SUCCESS,
    CREATE_BLOCK_ERROR,
    UPDATE_BLOCK_REQUEST,
    UPDATE_BLOCK_SUCCESS,
    UPDATE_BLOCK_ERROR,
    DELETE_BLOCK_REQUEST,
    DELETE_BLOCK_SUCCESS,
    DELETE_BLOCK_ERROR
} from '../actions/block'

const state = { blocks: [], selectedBlock: null, blockStatus: '' }

const getters = {
    blocks: state => state.blocks,
    selectedBlock: state => state.selectedBlock
}

const actions = {
    [BLOCK_REQUEST]: ({ commit }, blockId) => {
        return new Promise((resolve, reject) => {
            commit(BLOCKS_REQUEST)
            axios
                .get(`/api/block/${blockId}`)
                .then(response => {
                    commit(BLOCK_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(BLOCK_ERROR, err)
                    reject(err)
                })
        })
    },
    [BLOCKS_REQUEST]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(BLOCKS_REQUEST)
            axios
                .get(`/api/block`)
                .then(response => {
                    commit(BLOCKS_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(BLOCKS_ERROR, err)
                    reject(err)
                })
        })
    },
    [CREATE_BLOCK_REQUEST]: ({ commit }, block) => {
        return new Promise((resolve, reject) => {
            commit(CREATE_BLOCK_REQUEST)
            axios
                .post('/api/block', block)
                .then(response => {
                    commit(CREATE_BLOCK_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(CREATE_BLOCK_ERROR, err)
                    reject(err)
                })
        })
    },
    [UPDATE_BLOCK_REQUEST]: ({ commit }, { blockId, block }) => {
        return new Promise((resolve, reject) => {
            commit(UPDATE_BLOCK_REQUEST)
            axios
                .put(`/api/block/${blockId}`, block)
                .then(response => {
                    commit(UPDATE_BLOCK_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(UPDATE_BLOCK_ERROR, err)
                    reject(err)
                })
        })
    },
    [DELETE_BLOCK_REQUEST]: ({ commit }, blockId) => {
        return new Promise((resolve, reject) => {
            commit(DELETE_BLOCK_REQUEST)
            axios
                .delete(`/api/block/${blockId}`)
                .then(response => {
                    commit(DELETE_BLOCK_SUCCESS, response)
                    resolve(response)
                })
                .catch(err => {
                    commit(DELETE_BLOCK_ERROR, err)
                    reject(err)
                })
        })
    }
}

const mutations = {
    [BLOCK_REQUEST]: state => {
        state.blockStatus = 'loading'
    },
    [BLOCK_SUCCESS]: (state, response) => {
        state.blockStatus = 'success'
        state.selectedBlock = response.data
    },
    [BLOCK_ERROR]: state => {
        state.blockStatus = 'error'
    },
    [BLOCKS_REQUEST]: state => {
        state.blockStatus = 'loading'
    },
    [BLOCKS_SUCCESS]: (state, response) => {
        state.blockStatus = 'success'
        state.blocks = response.data
    },
    [BLOCKS_ERROR]: state => {
        state.blockStatus = 'error'
    },
    [CREATE_BLOCK_REQUEST]: state => {
        state.blockStatus = 'loading'
    },
    [CREATE_BLOCK_SUCCESS]: (state, response) => {
        state.blockStatus = 'success'
        state.blocks.push(response.data)
    },
    [CREATE_BLOCK_SUCCESS]: state => {
        state.blockStatus = 'error'
    },
    [UPDATE_BLOCK_REQUEST]: state => {
        state.blockStatus = 'loading'
    },
    [UPDATE_BLOCK_SUCCESS]: (state, response) => {
        state.blockStatus = 'success'
        const updatedBlock = response.data
        const index = state.blocks.findIndex(bl => bl._id === updatedBlock._id)
        state.blocks[index] = updatedBlock
    },
    [UPDATE_BLOCK_ERROR]: state => {
        state.blockStatus = 'error'
    },
    [DELETE_BLOCK_REQUEST]: state => {
        state.blockStatus = 'loading'
    },
    [DELETE_BLOCK_SUCCESS]: (state, response) => {
        state.blockStatus = 'success'
        const index = state.blocks.findIndex(bl => bl._id === response.data)
        state.blocks.splice(index, 1)
    },
    [DELETE_BLOCK_ERROR]: state => {
        state.blockStatus = 'error'
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
