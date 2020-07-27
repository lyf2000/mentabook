<template>
      <v-card class="elevation-12">
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                  <v-btn
                    href="#"
                    icon
                    large
                    target="_blank"
                    v-on="on"
                  >
                  <v-icon>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
          </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
              ></v-text-field>

              <v-text-field
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
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
      </v-card>
    </template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { UserSignUp } from '@/store/models'
import { signUp } from '@/store/api'


@Component({
  name: 'SignUpForm',
})
export default class SignUpForm extends Vue {
  username = ''
  password = ''
  email = ''

  async signUp() {
    const res = await signUp({
      username: this.username,
      password: this.password,
      email: this.email
    })
  }
}
</script>

