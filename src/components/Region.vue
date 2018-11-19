<template>
    <v-container>
        <v-combobox
            v-model="selectedRegion"
            :items="availableRegions"
            :label="$vuetify.t('$vuetify.selectProducts')"
            name="selectedRegion"
            :error-messages="regionErrors"
            chips
            clearable
            solo
            @blur="selectRegion"
        >
            <template slot="selection" slot-scope="data">
                <v-chip
                    :selected="data.selected"
                    close                   
                    @input="removeRegion(data.item)"
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

import { REGIONS_REQUEST } from './../store/actions/xcom'

export default {
    created() {
        this.$store.dispatch(REGIONS_REQUEST)
    },
    data() {
        return {
            selectedRegion: null
        }
    },
    computed: {
        regionErrors() {
            const errors = []
            this.selectedRegion === null && errors.push('Region is required')
            return errors
        },
        availableRegions: {
            get() {
                return this.$store.getters.regionIds
            }
        }

    },
    methods: {
        selectRegion() {
            console.log(this.selectedRegion)
            this.$emit('regionUpdated', this.selectedRegion)
        },
        removeRegion(item) {
            this.selectedRegion = null
            this.$emit('regionUpdated', this.selectedRegion)
        }
    }
}
</script>
