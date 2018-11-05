<template>
    <v-btn 
        flat
        @click="visible = true"
        >
        {{ buttonTitle }}
        <v-dialog v-model="visible" max-width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Create New Banner
                </v-card-title>
                <image-selector v-on:selectImage="onImageSelected"></image-selector>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            name="title"
                            label="Title"
                            type="text"
                            v-model="title"
                            :error-messages="titleErrors"
                            :counter="128"
                            required
                            @input="$v.title.$touch()"
                            @blur="$v.title.$touch()"
                            ></v-text-field>
                        <v-textarea
                            name="body"
                            label="Body"
                            type="text"
                            v-model="body"
                            :error-messages="bodyErrors"
                            :counter="4096"
                            required
                            @input="$v.body.$touch()"
                            @blur="$v.body.$touch()"
                            ></v-textarea>
                        <products v-on:productsUpdated="onProductsUpdated"></products>
                        <dates-range
                            v-on:updateStartDate="onStartDateUpdated"
                            v-on:updateEndDate="onEndDateUpdated"
                            ></dates-range>
                        <v-checkbox label="Private" input-value="show"></v-checkbox>
                    </v-form>
                </v-card-text>
                <v-card-actions class="pa-3">
                    <v-btn color="primary" flat @click="create">Create</v-btn>
                    <v-btn color="primary" flat @click="visible = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

import { AUTH_REQUEST } from '../store/actions/auth'
import { CREATE_BANNER_REQUEST } from './../store/actions/banner'
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
        body: { required, minLength: minLength(1), maxLength: maxLength(4096) }
    },
    props: {
        buttonTitle: String
    },
    data: () => ({
        title: '',
        body: '',
        startDate: null,
        endDate: null,
        image: null,
        productIds: [],
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
            this.image = value
        },
        onProductsUpdated(value) {
            this.productIds = value
        },
        create() {
            this.$v.$touch()
            const { title, body, startDate, endDate, show } = this
            if (!this.$v.$invalid) {
                this.$store
                    .dispatch(CREATE_BANNER_REQUEST, {
                        title,
                        body,
                        startDate,
                        endDate,
                        show
                    })
                    .then(res => {
                        this.visible = false
                    })
            }
        }
    }
}
</script>
