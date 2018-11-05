import Vue from 'vue'
import axios from 'axios'

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user-token')}`
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
