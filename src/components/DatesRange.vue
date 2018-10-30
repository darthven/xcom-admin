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
                        label="Start date"
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
                        label="End date"
                        prepend-icon="event"
                        readonly
                    ></v-text-field>
                    <v-date-picker v-model="endDate" no-title @input="updateEndDate"></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        start: false,
        end: false
    }),
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
