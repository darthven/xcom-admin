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
    >
      <template slot="selection" slot-scope="data">
        <v-chip :selected="data.selected" close @input="removeProduct(data.item)">
          <strong>{{ data.item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { SELECT_PRODUCTS, REMOVE_PRODUCT } from '../store/actions/xcom'

export default {
    computed: {
        productsErrors: {
            get() {
                const errors = []
                !this.selectedProducts && errors.push('Products are required')
                return errors
            }
        },
        availableProducts: {
            get() {
                return this.$store.getters.productIds || []
            }
        },
        selectedProducts: {
            get() {
                return this.$store.getters.selectedProducts
            },
            set(val) {
                if (val.length === 0) {
                    this.$store.dispatch(SELECT_PRODUCTS, []).then(res => {
                        this.$emit('productsUpdated', res)
                    })
                } else {
                    this.$store
                        .dispatch(
                            SELECT_PRODUCTS,
                            Array.from(
                                new Set(
                                    val.slice(0, val.length - 1).concat(
                                        val[val.length - 1]
                                            .toString()
                                            .split(' ')
                                            .map(v => parseInt(v, 10))
                                            .filter(v => !isNaN(v))
                                    )
                                )
                            )
                        )
                        .then(res => {
                            this.$emit('productsUpdated', res)
                        })
                }
            }
        }
    },
    methods: {
        removeProduct(item) {
            this.$store.dispatch(REMOVE_PRODUCT, item).then(res => {
                this.$emit('productsUpdated', res)
            })
        }
    }
}
</script>
