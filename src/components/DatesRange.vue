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
                        v-model="startDate"
                        :label="$vuetify.t('$vuetify.startDate')"
                        name="startDate"
                        :error-messages="startDateErrors"
                        prepend-icon="event"                        
                    ></v-text-field>
                    <v-date-picker v-model="startDate" no-title @input="updateStartDate"></v-date-picker>
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
                        v-model="endDate"
                        :label="$vuetify.t('$vuetify.endDate')"
                        name="endDate"
                        :error-messages="endDateErrors"
                        prepend-icon="event"
                    ></v-text-field>
                    <v-date-picker v-model="endDate" no-title @input="updateEndDate"></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    data: () => ({
        startDate: null,
        endDate: null,
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
            this.$emit('updateStartDate', this.startDate)
        },
        updateEndDate() {
            this.end = false
            this.$emit('updateEndDate', this.endDate)
        }
    }
}
</script>
