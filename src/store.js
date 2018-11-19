import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/modules/auth'
import banner from './store/modules/banner'
import block from './store/modules/block'
import products from './store/modules/products'
import virtualCards from './store/modules/importVirtualCards'
import uploadDiscount from './store/modules/uploadDiscount'
import uploadImage from './store/modules/uploadImage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        banner,
        block,
        products,
        uploadDiscount,
        virtualCards,
        uploadImage
    },
    strict: debug
})
