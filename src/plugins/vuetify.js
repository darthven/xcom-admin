import Vue from 'vue'
import {
    Vuetify,
    VApp,
    VAlert,
    VChip,
    VCheckbox,
    VCombobox,
    VDatePicker,
    VDialog,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCard,
    VTooltip,
    VMenu,
    VForm,
    VTextField,
    VTextarea,
    transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
    components: {
        VApp,
        VAlert,
        VChip,
        VCheckbox,
        VCombobox,
        VDatePicker,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        VCard,
        VTooltip,
        VDialog,
        VForm,
        VTextField,
        VMenu,
        VTextarea,
        transitions
    },
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    iconfont: 'md'
})
