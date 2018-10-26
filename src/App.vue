<template>
  <v-app>
    <router-view/>
    <v-footer app class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
    name: 'App',
    created() {
        if (!this.$store.getters.isAuthenticated) {
            this.$router.push('/')
        }
    },
    data() {
        return {}
    }
}
</script>
