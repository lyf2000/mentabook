<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
 
      <v-spacer></v-spacer>

      <v-btn
        @click="logout"
      >
        <span class="mr-2">LOGOUT</span>
      </v-btn>
      <v-btn
           @click="openDialog('SignUpForm')"
            >
        <span class="mr-2">SIGNUP</span>
      </v-btn>
      <v-btn
        @click="openDialog('LoginForm')"
      >
        <span class="mr-2">LOGIN</span>
      </v-btn>
    </v-app-bar>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import dialogs from '@/store/modules/dialogs'
import users from '../store/modules/users'
import events from '../store/modules/events'


@Component({
  name: 'AppNavbar',
})
export default class AppNavbar extends Vue {
  openDialog(dialog: string) {
    dialogs.changeActiveDialog(dialog)
  }
  logout() {
    users.logout()
    events.clearEventList()
  }
}

</script>

