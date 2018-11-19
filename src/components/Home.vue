<template>
   <v-app id="home">
        <admin-header></admin-header>
        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>  
                    <router-view/>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer color="blue-grey" class="white--text" app>
            <span>Vuetify</span>
            <v-spacer></v-spacer>
            <span>&copy; 2017</span>
        </v-footer>
  </v-app>
</template>

<script>
import AdminHeader from './AdminHeader'
import CreateBanner from './CreateBanner'
import UploadFile from './UploadFile'
import BannerList from './BannerList'
import Logout from './Logout'
import { BANNERS_REQUEST } from './../store/actions/banner'

export default {
    components: {
        AdminHeader,
        BannerList
    },
    data: () => ({}),
    props: {
        source: String
    }
}
</script>
