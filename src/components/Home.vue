<template>
   <v-app id="home">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
        <v-toolbar-title>ADMIN PANEL</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <create-banner :buttonTitle="$vuetify.t('$vuetify.createBanner')"></create-banner>
            <upload-file :buttonTitle="$vuetify.t('$vuetify.uploadCSVFile')" fileType="text/csv"></upload-file>
            <logout :buttonTitle="$vuetify.t('$vuetify.logout')"></logout>
        </v-toolbar-items>
    </v-toolbar>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>  
                <banner-list></banner-list>
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
import CreateBanner from './CreateBanner'
import UploadFile from './UploadFile'
import BannerList from './BannerList'
import Logout from './Logout'
import { BANNERS_REQUEST } from './../store/actions/banner'

export default {
    components: {
        CreateBanner,
        UploadFile,
        Logout,
        BannerList
    },
    data: () => ({}),
    props: {
        source: String
    }
}
</script>
