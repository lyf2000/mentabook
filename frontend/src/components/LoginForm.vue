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
    
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import { loginUser } from '@/store/api'
import { User } from '../store/models';
import users from '@/store/modules/users'
import events from '@/store/modules/events'
import dialogs from '@/store/modules/dialogs'


@Component({
  name: 'LoginForm',
})
export default class LoginForm extends Vue {
  username = ''
  password = ''

  login() {
    loginUser({
      username: this.username,
      password: this.password
    }).then((data) => {
      const user = data as User
      this.$store.dispatch('users/login', user).then(() => {
          events.loadEventList()
          dialogs.changeActiveDialog(null)
      })
      
    }).catch((err) => {
      alert('Credits are worng!')
    });
    
  }
}

</script>