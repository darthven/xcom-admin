<template>
    <v-container>
        <v-combobox
            v-model="selectedProducts"
            :items="availableProducts"
            :label="$vuetify.t('$vuetify.selectProducts')"
            name="selectedProducts"
            :error-messages="productsErrors"
            chips
            clearable
            solo
            multiple
            @blur="selectProduct"
        >
            <template slot="selection" slot-scope="data">
                <v-chip
                    :selected="data.selected"
                    close                   
                    @input="removeProduct(data.item)"
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

export default {
    data() {
        return {
            availableProducts: [1, 2, 3, 4, 5],
            selectedProducts: []
        }
    },
    computed: {
        productsErrors() {
            const errors = []
            this.selectedProducts.length === 0 && errors.push('Products are required')
            return errors
        }
    },
    methods: {
        selectProduct() {
            this.$emit('productsUpdated', this.selectedProducts)
        },
        removeProduct(item) {
            this.selectedProducts.splice(this.selectedProducts.indexOf(item), 1)
            this.selectedProducts = [...this.selectedProducts]
            this.$emit('productsUpdated', this.selectedProducts)
        }
    }
}
</script>
