<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
 
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
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


@Component({
  name: 'AppNavbar',
})
export default class AppNavbar extends Vue {
  openDialog(dialog: string) {
    dialogs.changeActiveDialog(dialog)
  }
}

</script>

