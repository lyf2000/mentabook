<template>
        <v-row>
      <v-col v-for="n in eventList" :key="n.id" cols="6">
        <EventPreview
          :eventItem="n"
        ></EventPreview>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppNavbar from '@/components/AppNavbar.vue'
import events from '@/store/modules/events'
import EventPreview from '@/components/events/EventPreview.vue'

@Component({
  name: 'EventList',
  components: {
    AppNavbar, EventPreview
  },
})
export default class App extends Vue {
   data() {
    return {
      eventList: [],
    }
  }
  created() {
    const self = this
    events.loadEventList().then(() => {
      console.log('mut');
      console.log(events.getEventList );
      
      self.eventList = events.getEventList
    })
  }
}

</script>l