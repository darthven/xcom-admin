import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/modules/auth'
import dialog from './store/modules/dialog'
import uploadDiscount from './store/modules/uploadDiscount'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        dialog,
        uploadDiscount
    },
    strict: debug
})
