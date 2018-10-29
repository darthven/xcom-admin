<template>
   <v-app id="home">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-title>Admin Panel</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
        <v-container fluid fill-height>
            <create-banner buttonTitle="Create New Banner"/>
            <upload-file title="Upload discounts (CSV)" fileType="text/csv"/>
            <v-layout justify-center align-center>  
                <banner title="Amazing Banner"></banner>
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
import Banner from './Banner'

export default {
    components: {
        CreateBanner,
        UploadFile,
        Banner
    },
    data: () => ({}),
    props: {
        source: String
    }
}
</script>
