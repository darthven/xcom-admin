<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 lg6>
                <v-menu
                    ref="start"
                    :close-on-content-click="false"
                    v-model="start"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        :label="$vuetify.t('$vuetify.startDate')"
                        name="startDate"
                        v-model="startDate"
                        :error-messages="startDateErrors"
                        prepend-icon="event"                        
                    ></v-text-field>
                    <v-date-picker v-model="selectedStartDate" no-title @input="updateStartDate"></v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs12 lg6>
                <v-menu
                    :close-on-content-click="false"
                    v-model="end"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                >
                    <v-text-field
                        slot="activator"
                        :label="$vuetify.t('$vuetify.endDate')"
                        name="endDate"
                        v-model="endDate"
                        :error-messages="endDateErrors"
                        prepend-icon="event"
                    ></v-text-field>
                    <v-date-picker v-model="selectedEndDate" no-title @input="updateEndDate"></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    props: {
        startDate: String,
        endDate: String
    },
    data: () => ({
        selectedStartDate: null,
        selectedEndDate: null,
        start: false,
        end: false
    }),
    mixins: [validationMixin],
    validations: {
        startDate: { required },
        endDate: { required }
    },
    computed: {
        startDateErrors() {
            const errors = []
            if (!this.$v.startDate.$dirty) return errors
            !this.$v.startDate.required && errors.push('Start date is required')
            this.endDate < this.startDate && errors.push('Start date cannot be larger than end date')
            return errors
        },
        endDateErrors() {
            const errors = []
            if (!this.$v.endDate.$dirty) return errors
            !this.$v.endDate.required && errors.push('End date is required')
            return errors
        }
    },
    methods: {
        updateStartDate() {
            this.start = false
            this.$emit('updateStartDate', this.selectedStartDate)
        },
        updateEndDate() {
            this.end = false
            this.$emit('updateEndDate', this.selectedEndDate)
        }
    }
}
</script>
