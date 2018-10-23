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
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                {
                    icon: 'bubble_chart',
                    title: 'Inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    }
}
</script>
