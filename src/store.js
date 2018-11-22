import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/modules/auth'
import banner from './store/modules/banner'
import block from './store/modules/block'
import xcom from './store/modules/xcom'
import dates from './store/modules/dates'
import image from './store/modules/image'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        banner,
        block,
        xcom,
        dates,
        image
    },
    strict: debug
})
