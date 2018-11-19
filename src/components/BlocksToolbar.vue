<template>
    <v-toolbar-items class="hidden-sm-and-down">
        <create-block :buttonTitle="$vuetify.t('$vuetify.createBlock')"></create-block>
        <logout :buttonTitle="$vuetify.t('$vuetify.logout')"></logout>
    </v-toolbar-items>
</template>

<script>
import CreateBlock from './CreateBlock'
import Logout from './Logout'

export default {
    components: {
        CreateBlock,
        Logout
    }
}
</script>

