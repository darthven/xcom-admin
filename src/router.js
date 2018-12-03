import Vue from 'vue'
import Router from 'vue-router'

import store from './store'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import BannersToolbar from './components/BannersToolbar'
import BannerList from './components/BannerList'
import BlocksToolbar from './components/BlocksToolbar'
import BlockList from './components/BlockList'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: 'admin',
            beforeEnter: ifAuthenticated
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            redirect: '/admin/banners',
            name: 'admin',
            component: Home,
            beforeEnter: ifAuthenticated,
            children: [
                {
                    path: 'banners',
                    name: 'banners',
                    components: {
                        default: BannerList,
                        toolbar: BannersToolbar
                    }
                },
                {
                    path: 'blocks',
                    name: 'blocks',
                    components: {
                        default: BlockList,
                        toolbar: BlocksToolbar
                    }
                }
            ]
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ]
})
