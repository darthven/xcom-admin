<template>
    <v-container>
        <v-combobox
            v-model="selectedProducts"
            :items="products"
            label="Select products"
            chips
            clearable
            solo
            multiple
            @blur="selectProduct()"
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
export default {
    data () {
      return {
        products: [1, 2, 3, 4, 5],
        selectedProducts: []
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
