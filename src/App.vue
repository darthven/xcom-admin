<template>
  <v-app>
    <admin-header></admin-header>
    <router-view/>
    <v-footer app class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import AdminHeader from './components/AdminHeader'

export default {
    name: 'App',
    components: {
      AdminHeader
    }
}
</script>
