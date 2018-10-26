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
        <v-layout justify-center align-center>
            <create-banner buttonTitle="Create New Banner"/>
            <upload-file title="Upload discounts (CSV)" fileType="text/csv"/>
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

export default {
    components: {
        CreateBanner,
        UploadFile
    },
    data: () => ({}),
    props: {
        source: String
    }
}
</script>
