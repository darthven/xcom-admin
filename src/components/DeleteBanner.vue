<template>
   <v-btn
        flat 
        @click="visible = true"
        >{{ buttonTitle }}
            <v-dialog v-model="visible" max-width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Delete Banner
                </v-card-title>
                <v-card-text>
                    Are you sure to delete this banner?
                </v-card-text>
                <v-card-actions class="pa-3">
                    <v-btn color="primary" flat @click="remove">Delete</v-btn>
                    <v-btn color="primary" flat @click="visible = false">Close</v-btn>
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
