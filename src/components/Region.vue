<template>
  <v-container>
    <v-combobox
      v-model="selectedRegion"
      :items="availableRegions"
      :label="$vuetify.t('$vuetify.selectRegion')"
      chips
      clearable
      solo
    >
      <template slot="selection" slot-scope="data">
        <v-chip :selected="data.selected" @input="removeRegion(data.item)">
          <strong>{{ data.item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import { REGIONS_REQUEST, SELECT_REGION } from './../store/actions/xcom'

export default {
    created() {
        this.$store.dispatch(REGIONS_REQUEST)
    },
    computed: {
        selectedRegion: {
            get() {
                const selected = this.$store.getters.selectedRegion
                return selected === -1 ? 'Все' : this.$store.getters.selectedRegion
            },
            set(val) {
                this.$store.dispatch(SELECT_REGION, val).then(res => {
                    this.$emit('regionUpdated', res)
                })
            }
        },
        availableRegions: {
            get() {
                return ['Все', ...this.$store.getters.regionIds]
            }
        }
    },
    methods: {
        removeRegion() {
            this.$store.dispatch(SELECT_REGION, null).then(res => {
                this.$emit('regionUpdated', res)
            })
        }
    }
}
</script>
