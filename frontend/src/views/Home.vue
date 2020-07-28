<template>
  <div class="home">
      <Dialog></Dialog>
      <EventFilter v-if="currentUser"> </EventFilter>
      <EventList v-if="currentUser"></EventList> 
      <div v-if="!currentUser">
        U're not logged

      </div>

      


  </div>
</template>



<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import EventList from '@/components/events/EventList.vue'
import EventFilter from '@/components/events/EventFilter.vue'
import Dialog from '@/components/Dialog.vue'
import events from '@/store/modules/events'
import users from '@/store/modules/users'
import dialogs from '@/store/modules/dialogs'


@Component({
  name: 'Home',
  components: {
    Dialog, EventList, EventFilter
  },
})
export default class Home extends Vue {


    get currentUser() {
      return users.user
    }
}

</script>

