<template>
  <v-app>
    <AppNavbar></AppNavbar>

    <v-main>

  
      <v-container   fill-height>
      <router-view></router-view>
      </v-container>
  

  </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppNavbar from '@/components/AppNavbar.vue'

@Component({
  components: {
    AppNavbar
  }
})
export default class App extends Vue {

}

</script>
