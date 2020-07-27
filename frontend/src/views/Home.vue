<template>
  <div class="home">
    <v-btn depressed @click="gett" small>Normal</v-btn>

    <v-btn depressed @click="exp1" small>Normal</v-btn>
      
      <Dialog></Dialog>

      <EventList></EventList>


  </div>
</template>



<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import EventList from '@/components/events/EventList.vue'
import Dialog from '@/components/Dialog.vue'
import events from '@/store/modules/events'
import dialogs from '@/store/modules/dialogs'


@Component({
  name: 'Home',
  components: {
    Dialog, EventList
  },
})
export default class Home extends Vue {
    async gett() {
      await events.loadEventList()
    }
    exp1() {
      dialogs.changeActiveDialog('loginForm')
    }
}

</script>

