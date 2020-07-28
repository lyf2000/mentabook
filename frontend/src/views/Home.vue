<template>
  <div class="home">
      <Dialog></Dialog>

      <EventList v-if="currentUser"></EventList> 
      <div>
        SRY NTHN

      </div>

      


  </div>
</template>



<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import EventList from '@/components/events/EventList.vue'
import Dialog from '@/components/Dialog.vue'
import events from '@/store/modules/events'
import users from '@/store/modules/users'
import dialogs from '@/store/modules/dialogs'


@Component({
  name: 'Home',
  components: {
    Dialog, EventList
  },
})
export default class Home extends Vue {
  

    get currentUser() {
      return users.user
    }
}

</script>

