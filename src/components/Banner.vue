<template>
    <v-container>
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                {{ title }}
            </v-card-title>
            <v-card-text>
                {{ body }}
            </v-card-text>
            <v-card-actions>
                <edit-banner v-on:bannerUpdated="onBannerUpdated" buttonTitle="Edit Banner" :bannerId="_id"/>
                <delete-banner buttonTitle="Delete Banner" :bannerId="_id"/>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import DeleteBanner from './DeleteBanner'
import EditBanner from './EditBanner'
import { BANNER_REQUEST } from '../store/actions/banner'

export default {
    components: {
        DeleteBanner,
        EditBanner
    },
    props: {
        _id: String,
        title: String,
        body: String,
        startDate: Date,
        endDate: Date,
        show: Boolean
    },
    methods: {
        onBannerUpdated(val) {
            this.$emit('bannersUpdated')
        }
    }
}
</script>
