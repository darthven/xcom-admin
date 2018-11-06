<template>
   <v-btn
        flat 
        @click="visible = true"
        >{{ buttonTitle }}
            <v-dialog v-model="visible" max-width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    {{ $vuetify.t('$vuetify.deleteBannerTitle') }}
                </v-card-title>
                <v-card-text>
                    {{ $vuetify.t('$vuetify.beforeDeletion') }}
                </v-card-text>
                <v-card-actions class="pa-3">
                    <v-btn color="primary" flat @click="remove">{{ $vuetify.t('$vuetify.yes') }}</v-btn>
                    <v-btn color="primary" flat @click="visible = false">{{ $vuetify.t('$vuetify.no') }} </v-btn>
                </v-card-actions>                
            </v-card>
        </v-dialog>
        </v-btn>
</template>

<script>
import { DELETE_BANNER_REQUEST } from './../store/actions/banner.js'

export default {
    props: {
        bannerId: String,
        buttonTitle: String
    },
    data: () => ({
        visible: false
    }),
    methods: {
        remove() {
            this.$store.dispatch(DELETE_BANNER_REQUEST, this.bannerId).then(res => (this.visible = false))
        }
    }
}
</script>
