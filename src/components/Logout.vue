<template>
    <v-btn flat @click="logout">
        {{ buttonTitle }}
    </v-btn>
</template>

<script>
import { AUTH_LOGOUT } from './../store/actions/auth'

export default {
    props: {
        buttonTitle: String
    },
    methods: {
        logout() {
            this.$store.dispatch(AUTH_LOGOUT).then(res => this.$router.push({ path: '/login' }))
        }
    }
}
</script>
