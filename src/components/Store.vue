<template>
    <v-container>
        <v-combobox
            v-model="selectedStore"
            :items="availableStores"
            :label="$vuetify.t('$vuetify.selectStore')"
            name="selectedStore"
            :error-messages="storeErrors"
            chips
            clearable
            solo
        >
            <template slot="selection" slot-scope="data">
                <v-chip
                    :selected="data.selected"               
                    @input="removeStore(data.item)"
                >
                    <strong>{{ data.item }}</strong>
                </v-chip>
            </template>
        </v-combobox>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import { SELECT_STORE } from './../store/actions/xcom'

export default {
    computed: {
        storeErrors() {
            const errors = []
            !this.selectedStore && errors.push('Store is required')
            return errors
        },
        selectedStore: {
            get() {
                return this.$store.getters.selectedStore
            },
            set(val) {
                this.$store.dispatch(SELECT_STORE, val).then(res => {
                    this.$emit('storeUpdated', res)
                })  
            }
        },
        availableStores: {
            get() {
                return this.$store.getters.storeIds
            }
        }

    },
    methods: {
        removeStore() {
            this.$store.dispatch(SELECT_STORE, null).then(res => {
                this.$emit('storeUpdated', res)
            })            
        }
    }
}
</script>
