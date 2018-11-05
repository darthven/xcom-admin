import Vue from 'vue'

import i18n from './i18n'

import {
    Vuetify,
    VApp,
    VAlert,
    VAvatar,
    VChip,
    VCheckbox,
    VCombobox,
    VDatePicker,
    VDialog,
    VExpansionPanel,
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
        VAvatar,
        VChip,
        VCheckbox,
        VCombobox,
        VDatePicker,
        VExpansionPanel,
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
    iconfont: 'md',
    lang: {
        t: (key, ...params) => i18n.t(key, params)
    }
})
