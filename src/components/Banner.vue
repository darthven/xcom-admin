<template>
    <v-container>
        <v-card>
            <v-card-title @click="showContent" class="headline grey lighten-2" primary-title>
                {{ title }}
                <v-spacer></v-spacer>
                <div class="text-xs-center">
                    <v-chip v-if="endDate < new Date()" color="red" text-color="white">Overdue</v-chip>
                    <v-chip v-else color="green" text-color="white">Active</v-chip>
                </div>
            </v-card-title>
            <template v-if="!hidden">
                <v-layout flex xs6>
                    <v-img class="imageClass" v-if="image" :src="image"/>
                </v-layout>
                <v-card-text>
                    {{ body }}
                </v-card-text>
                <v-card-text>
                    <v-chip selected :key=id v-for="id in productIds">
                        <strong>{{ id }}</strong>
                    </v-chip>                   
                </v-card-text>               
            </template>
            <v-card-actions>
                <v-flex justify-start>
                    <edit-banner
                        v-on:bannerUpdated="onBannerUpdated"
                        :buttonTitle="$vuetify.t('$vuetify.edit')"
                        :bannerId="_id"
                    />
                    <delete-banner
                        :buttonTitle="$vuetify.t('$vuetify.delete')"
                        :bannerId="_id"
                    />
                </v-flex>
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
        productIds: Array,
        show: Boolean,
        image: String
    },
    data: () => ({
        hidden: true
    }),
    methods: {
        onBannerUpdated(val) {
            this.$emit('bannersUpdated')
        },
        showContent() {
            if (this.show) {
                this.hidden = !this.hidden
            }
        }
    }
}
</script>

<style scoped>
.imageClass {
    padding-top: 20px;
    padding-left: 16px;
}
.dates {
    margin-right: 40px;
}
</style>
