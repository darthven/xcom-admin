<template>
    <v-container>
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                {{ title }}
            </v-card-title>
        </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>
