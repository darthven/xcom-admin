import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/modules/auth'
import banner from './store/modules/banner'
import products from './store/modules/products'
import uploadDiscount from './store/modules/uploadDiscount'
import uploadImage from './store/modules/uploadImage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        banner,
        products,
        uploadDiscount,
        uploadImage
    },
    strict: debug
})
