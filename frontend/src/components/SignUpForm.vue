<template>
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                :rules="rules.username  "
              ></v-text-field>

              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="email"
                v-model="email"
                :rules="rules.email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                :rules="rules.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              color="primary"
              @click="signUp"
              >SignUp</v-btn>
          </v-card-actions>
      
<v-snackbar
      v-model="snackbar"
      top
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="error"
          text
          multi-line
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

      </v-card>
      
    </template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { UserSignUp } from '@/store/models'
import { signUp } from '@/store/api'
import { loginUser } from '../store/api'
import dialogs from '../store/modules/dialogs'



@Component({
  name: 'SignUpForm',
})
export default class SignUpForm extends Vue {
  username = ''
  password = ''
  email = ''
  snackbar = false
  errorMessage = ''

  errors = {
    email: null
  }

  rules = {
    email: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    username: [
        v => !!v || 'E-mail is required',
      ],
    password: [
        v => !!v || 'E-mail is required',
      ],
      
  }

  alertError(data: {}) {
    this.errorMessage = ''
    for (const [key, value] of Object.entries(data)) {
         this.errorMessage += `${key}: ${value}\n`
    }
    this.snackbar = true
  }

  signUp() {
    signUp({
      username: this.username,
      password: this.password,
      email: this.email
    }).then(data => {
        dialogs.changeActiveDialog('LoginForm')
    }).catch(data => {
      this.alertError(data)
    })
  }
}
</script>

