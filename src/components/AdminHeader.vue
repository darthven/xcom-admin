<template>
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
        <v-toolbar-title>ADMIN PANEL</v-toolbar-title>
        <template v-if="isAuthenticated">
            <v-btn flat @click="navigateTo('banners')">{{ $vuetify.t('$vuetify.banners') }}</v-btn>
            <v-btn flat @click="navigateTo('blocks')">{{ $vuetify.t('$vuetify.blocks') }}</v-btn>
            <v-spacer></v-spacer>
            <router-view name="toolbar"/>
        </template>    
    </v-toolbar>
</template>

<script>
import BannersToolbar from './BannersToolbar'
import BlocksToolbar from './BlocksToolbar'

export default {
    components: {
        BannersToolbar,
        BlocksToolbar
    },
    computed: {
        isAuthenticated: {
            get() {
                return this.$store.getters.isAuthenticated
            }
        }
    },
    methods: {
        navigateTo(path) {
            this.$router.push({ name: path })
        }
    }
}
</script>
