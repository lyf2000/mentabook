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
import events from '@/store/modules/events'
import EventPreview from '@/components/events/EventPreview.vue'


@Component({
  name: 'EventList',
  components: {
    EventPreview
  },
})
export default class App extends Vue {

  get eventList() {
    return events.eventList
  }
}

</script>l