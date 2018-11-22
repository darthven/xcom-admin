import { SELECT_DATES } from '../actions/dates'

const state = {
    dates: {
        startDate: null,
        endDate: null
    }
}

const getters = {
    dates: state => state.dates
}

const actions = {
    [SELECT_DATES]: ({ commit }, data) => {
        commit(SELECT_DATES, data)
    }
}

const mutations = {
    [SELECT_DATES]: (state, data) => {
        state.uploadStatus = 'success'
        state.dates = {
            ...state.dates,
            ...data
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
