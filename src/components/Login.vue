<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey">
                <v-toolbar-title>Ecom Admin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    :label="$vuetify.t('$vuetify.login')"
                    type="text"
                    v-model="email"
                    :error-messages="emailErrors"
                    :counter="25"
                    color="blue-grey"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    :label="$vuetify.t('$vuetify.password')"
                    type="password"
                    v-model="password"
                    :error-messages="passwordErrors"
                    :counter="30"
                    color="blue-grey"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submit" flat>
                  {{ $vuetify.t('$vuetify.loginAction') }}           
                </v-btn>                    
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

import { AUTH_REQUEST } from '../store/actions/auth.js'

export default {
    mixins: [validationMixin],
    validations: {
        email: { required, email, minLength: minLength(5), maxLength: maxLength(25) },
        password: { required, minLength: minLength(8), maxLength: maxLength(30) }
    },
    data: () => ({
        email: '',
        password: ''
    }),
    computed: {
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.minLength && errors.push('Password must be at least 8 characters long')
            !this.$v.password.maxLength && errors.push('Password must be at most 30 characters long')
            !this.$v.password.required && errors.push('Password is required')
            return errors
        }
    },
    methods: {
        submit() {
            this.$v.$touch()
            const { email, password } = this
            if (!this.$v.$invalid) {
                this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => this.$router.push({ path: 'home' }))
            }
        }
    }
}
</script>
