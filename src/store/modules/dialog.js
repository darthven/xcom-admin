import { SHOW_DIALOG, HIDE_DIALOG } from '../actions/dialog'

const state = {
    dialogStatus: false
}

const actions = {
    [SHOW_DIALOG]: ({ commit }) => {
        return new Promise(resolve => {
            commit(SHOW_DIALOG)
            resolve(state.dialogStatus)
        })
    },
    [HIDE_DIALOG]: ({ commit }) => {
        return new Promise(resolve => {
            commit(HIDE_DIALOG)
            resolve(state.dialogStatus)
        })
    }
}

const mutations = {
    [SHOW_DIALOG]: state => {
        state.dialogStatus = true
    },
    [HIDE_DIALOG]: state => {
        state.dialogStatus = false
    }
}

export default {
    state,
    actions,
    mutations
}
