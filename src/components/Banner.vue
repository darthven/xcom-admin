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
                <delete-banner buttonTitle="Delete Banner" :bannerId="_id"/>
                <create-banner buttonTitle="Update Banner" :bannerId="_id"/>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import DeleteBanner from './DeleteBanner'
import CreateBanner from './CreateBanner'

export default {
    components: {
        DeleteBanner,
        CreateBanner
    },
    props: {
        _id: String,
        title: String,
        body: String,
        startDate: Date,
        endDate: Date,
        show: Boolean
    }
}
</script>
