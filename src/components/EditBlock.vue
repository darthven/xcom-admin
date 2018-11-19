<template>
    <v-btn 
        flat
        @click="open"
        >
        {{ buttonTitle }}
        <v-dialog v-model="visible" max-width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    {{ $vuetify.t('$vuetify.updateBlockTitle') }}
                </v-card-title>
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
                            ></v-text-field>  
                        <v-text-field
                            name="storeId"
                            :label="$vuetify.t('$vuetify.store')"
                            type="text"
                            v-model="storeId"
                        ></v-text-field> 
                        <region v-on:regionUpdated="onRegionUpdated"></region>
                        <products v-on:productsUpdated="onProductsUpdated"></products>
                        <v-checkbox :label="$vuetify.t('$vuetify.active')" v-model="active"></v-checkbox>
                    </v-form>
                </v-card-text>
                <v-card-actions class="pa-3">
                    <v-btn color="primary" flat @click="update">{{ $vuetify.t('$vuetify.update') }}</v-btn>
                    <v-btn color="primary" flat @click="visible = false">{{ $vuetify.t('$vuetify.close') }}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

import { PRODUCTS_REQUEST } from './../store/actions/xcom'
import {
    BLOCKS_REQUEST,
    BLOCK_REQUEST,
    UPDATE_BLOCK_REQUEST
} from './../store/actions/block'
import Region from './Region'
import Products from './Products'

export default {
    components: {
        Region,
        Products
    },
    mixins: [validationMixin],
    validations: {
        title: { required, minLength: minLength(1), maxLength: maxLength(128) },
        productIds: { required }
    },
    props: {
        blockId: String,
        buttonTitle: String
    },
    data: () => ({
        title: '',
        regionId: '',
        storeId: '',
        productIds: [],
        active: true,
        sortCriteria: '',
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
        }
    },
    methods: {
        onRegionUpdated(value) {
            if (value) {
                this.regionId = value
                this.$store.dispatch(PRODUCTS_REQUEST, this.regionId)
            }
        },
        onProductsUpdated(value) {
            this.productIds = value
        },
        open() {
            this.$store.dispatch(BLOCK_REQUEST, this.blockId).then(res => {
                console.log(res.data)
                const { title, regionId, storeId, productIds, active } = res.data
                this.title = title
                this.regionId = regionId
                this.storeId = storeId
                this.productIds = productIds
                this.active = active
                this.visible = true
            })
        },
        update() {
            const { title, regionId, storeId, productIds, active } = this
            if (!this.$v.$invalid) {
                this.$store
                    .dispatch(UPDATE_BLOCK_REQUEST, {
                        blockId: this.blockId,
                        block: {
                            title,
                            regionId,
                            storeId,
                            productIds,
                            active
                        }
                    })
                    .then(async res => {
                        this.$emit('blockUpdated')
                        this.visible = false
                    })
            }
        }
    }
}
</script>
