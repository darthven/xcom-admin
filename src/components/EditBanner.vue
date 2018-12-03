<template>
    <v-btn 
        flat
        @click="open"
        >
        {{ buttonTitle }}
        <v-dialog v-model="visible" max-width="550px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    {{ $vuetify.t('$vuetify.updateBannerTitle') }}
                </v-card-title>
                <image-selector :bannerId="bannerId" v-on:selectedImage="onImageSelected"></image-selector>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            name="title"
                            :label="$vuetify.t('$vuetify.title')"
                            type="text"
                            v-model="title"
                            :error-messages="titleErrors"
                            :counter="128"
                            required
                            @input="$v.title.$touch()"
                            @blur="$v.title.$touch()"
                            >{{ title }}</v-text-field>
                        <v-textarea
                            name="body"
                            :label="$vuetify.t('$vuetify.body')"
                            type="text"
                            v-model="body"
                            :error-messages="bodyErrors"
                            :counter="4096"
                            required
                            @input="$v.body.$touch()"
                            @blur="$v.body.$touch()"
                            > {{ body }}</v-textarea>
                        <products v-on:productsUpdated="onProductsUpdated"></products>
                        <dates-range
                            v-on:updateStartDate="onStartDateUpdated"
                            v-on:updateEndDate="onEndDateUpdated"
                        ></dates-range>
                        <v-checkbox :value="show" :label="$vuetify.t('$vuetify.public')" v-model="show"></v-checkbox>
                    </v-form>
                </v-card-text>
                <v-card-actions class="pa-3">
                    <v-btn color="primary" flat @click="update">{{ $vuetify.t('$vuetify.update') }}</v-btn>
                    <v-btn color="primary" flat @click="close">{{ $vuetify.t('$vuetify.close') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

import { AUTH_REQUEST } from '../store/actions/auth'
import { BANNERS_REQUEST, BANNER_REQUEST, UPDATE_BANNER_REQUEST } from './../store/actions/banner'
import { IMAGE_UPLOAD_REQUEST, SELECT_IMAGE } from '../store/actions/image'
import { SELECT_PRODUCTS } from '../store/actions/xcom'
import { SELECT_DATES } from '../store/actions/dates'
import DatesRange from './DatesRange'
import ImageSelector from './ImageSelector'
import Products from './Products'

export default {
    components: {
        DatesRange,
        ImageSelector,
        Products
    },
    mixins: [validationMixin],
    validations: {
        title: { required, minLength: minLength(1), maxLength: maxLength(128) },
        body: { required, minLength: minLength(1), maxLength: maxLength(4096) },
        startDate: { required },
        endDate: { required },
        productIds: { required }
    },
    props: {
        bannerId: String,
        buttonTitle: String
    },
    data: () => ({
        title: '',
        body: '',
        startDate: null,
        endDate: null,
        productIds: [],
        imageUpdated: false,
        image: null,
        show: false,
        visible: false
    }),
    computed: {
        titleErrors() {
            const errors = []
            if (!this.$v.title.$dirty) return errors
            !this.$v.title.required && errors.push('Title is required')
            !this.$v.title.minLength && errors.push('Title must be at least 1 characters long')
            !this.$v.title.maxLength && errors.push('Title must be at most 128 characters long')
            return errors
        },
        bodyErrors() {
            const errors = []
            if (!this.$v.body.$dirty) return errors
            !this.$v.body.required && errors.push('Body is required')
            !this.$v.body.minLength && errors.push('Body must be at least 1 characters long')
            !this.$v.body.maxLength && errors.push('Body must be at most 4096 characters long')
            return errors
        }
    },
    methods: {
        onStartDateUpdated(value) {
            this.startDate = value
        },
        onEndDateUpdated(value) {
            this.endDate = value
        },
        onImageSelected(value) {
            this.imageUpdated = true
            this.image = value
        },
        onProductsUpdated(value) {
            this.productIds = value
        },
        open() {
            this.$store.dispatch(BANNER_REQUEST, this.bannerId).then(async res => {
                const { title, body, image, startDate, endDate, productIds, show } = res.data
                this.title = title
                this.body = body
                this.startDate = startDate
                this.endDate = endDate
                this.productIds = productIds
                this.show = show
                this.image = image
                this.visible = true
                await this.$store.dispatch(SELECT_DATES, { startDate, endDate })
                await this.$store.dispatch(SELECT_PRODUCTS, this.productIds)
                await this.$store.dispatch(SELECT_IMAGE, this.image)
            })
        },
        update() {
            const { bannerId, title, body, image, startDate, endDate, productIds, show, imageUpdated } = this
            console.log(productIds)
            if (!this.$v.$invalid) {
                this.$store
                    .dispatch(UPDATE_BANNER_REQUEST, {
                        bannerId,
                        banner: {
                            title,
                            body,
                            startDate,
                            endDate,
                            productIds,
                            show
                        }
                    })
                    .then(res => {
                        if (imageUpdated) {
                            this.$store.dispatch(IMAGE_UPLOAD_REQUEST, { bannerId, image })
                        }
                    })
                    .then(res => {
                        this.$emit('bannerUpdated')
                        this.close()
                    })
            }
        },
        async close() {
            await this.$store.dispatch(SELECT_DATES, { startDate: null, endDate: null })
            await this.$store.dispatch(SELECT_PRODUCTS, [])
            await this.$store.dispatch(SELECT_IMAGE, null)
            this.imageUpdated = false
            this.visible = false
        }
    }
}
</script>
