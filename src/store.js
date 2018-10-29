import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/modules/auth'
import banner from './store/modules/banner'
import dialog from './store/modules/dialog'
import uploadDiscount from './store/modules/uploadDiscount'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        banner,
        dialog,
        uploadDiscount
    },
    strict: debug
})
