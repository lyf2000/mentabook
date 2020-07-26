<template>
<v-dialog v-model="show" persistent max-width="350px">
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
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
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
                <v-btn color="primary" @click="login()" >Login</v-btn>
              </v-card-actions>
            </v-card>
    </v-dialog>


</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import users from '@/store/modules/users'


@Component
export default class LoginForm extends Vue {
  username?: string = ''
  password?: string = ''

  @Prop(Boolean) visible: boolean | null = null

  login() {
    users.login({
      username!: this.username,
      password!: this.password
    })
  }

  
  get show() {
    return this.visible
  }
  set show(value) {
    if (!value) {
      this.$emit('close')
    }
  }

}

</script>