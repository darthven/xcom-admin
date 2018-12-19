<template>
  <v-btn flat @click="open">
    {{ buttonTitle }}
    <v-dialog v-model="visible" max-width="500px">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >{{ $vuetify.t('$vuetify.updateBlockTitle') }}</v-card-title>
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
            <region v-on:regionUpdated="onRegionUpdated"></region>
            <!-- <store v-on:storeUpdated="onStoreUpdated"></store> -->
            <products v-on:productsUpdated="onProductsUpdated"></products>
            <v-checkbox :label="$vuetify.t('$vuetify.active')" v-model="active"></v-checkbox>
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

import { PRODUCTS_REQUEST, SELECT_REGION, SELECT_STORE, SELECT_PRODUCTS, STORES_REQUEST } from './../store/actions/xcom'
import { BLOCKS_REQUEST, BLOCK_REQUEST, UPDATE_BLOCK_REQUEST } from './../store/actions/block'
import Region from './Region'
import Store from './Store'
import Products from './Products'

export default {
    components: {
        Region,
        Store,
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
        },
        region() {
            return this.regionId === -1 ? 'Все' : this.regionId
        }
    },
    methods: {
        async onRegionUpdated(value) {
            if (value) {
                this.regionId = value
                // await this.$store.dispatch(STORES_REQUEST, this.regionId)
                await this.$store.dispatch(PRODUCTS_REQUEST, this.regionId === -1 ? 'Все' : this.regionId)
            }
        },
        onStoreUpdated(value) {
            this.storeId = value
        },
        onProductsUpdated(value) {
            this.productIds = value
        },
        open() {
            this.$store.dispatch(BLOCK_REQUEST, this.blockId).then(async res => {
                const { title, regionId, storeId, productIds, active } = res.data
                this.title = title
                this.regionId = regionId
                this.storeId = storeId
                this.productIds = productIds
                this.active = active
                this.visible = true
                await this.$store.dispatch(SELECT_REGION, this.regionId)
                // await this.$store.dispatch(STORES_REQUEST, this.regionId)
                await this.$store.dispatch(PRODUCTS_REQUEST, this.regionId)
                await this.$store.dispatch(SELECT_STORE, this.storeId)
                await this.$store.dispatch(SELECT_PRODUCTS, this.productIds)
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
                    .then(res => {
                        this.$emit('blockUpdated')
                        this.close()
                    })
            }
        },
        async close() {
            await this.$store.dispatch(SELECT_REGION, null)
            await this.$store.dispatch(SELECT_STORE, null)
            await this.$store.dispatch(SELECT_PRODUCTS, [])
            this.visible = false
        }
    }
}
</script>
