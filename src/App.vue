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
import NotFound from './components/NotFound'

export default {
    name: 'App',
    components: {
      NotFound
    }
}
</script>
