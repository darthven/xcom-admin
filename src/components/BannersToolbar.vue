<template>
    <v-toolbar-items class="hidden-sm-and-down">
        <create-banner :buttonTitle="$vuetify.t('$vuetify.createBanner')"></create-banner>
        <upload-file
            :action="'IMPORT_VIRTUAL_CARDS_REQUEST'" 
            :buttonTitle="$vuetify.t('$vuetify.importVirtualCardsCSV')"
            fileType="text/csv">
        </upload-file>
        <upload-file
            :action="'DISCOUNT_UPLOAD_REQUEST'"
            :buttonTitle="$vuetify.t('$vuetify.uploadCSVFile')"
            fileType="text/csv">
        </upload-file>
        <logout :buttonTitle="$vuetify.t('$vuetify.logout')"></logout>
    </v-toolbar-items>
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
        Logout
    }
}
</script>

