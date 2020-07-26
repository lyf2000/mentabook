<template>
    <v-card>
        <v-card-text
            @click.stop="showEventEdit"
        >
            <div>{{ eventItem.date }}</div>
            <p class="display-1 text--primary">
              {{ eventItem.title }}
            </p>

          <div class="text--primary" >{{ eventItem.text}}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn icon
                @click="showEventEditForm=true"
            >
                <v-icon class="mr-1">mdi-fountain-pen</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon class="mr-1">mdi-delete</v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import events from '@/store/modules/events'
import { EventItem } from "@/store/models";

@Component({
  name: 'EventPreview',
  components: {

  },
})
export default class App extends Vue {
    @Prop() eventItem!: EventItem
   data() {
    return {
    //   eventPreview: [=
    }
  }
}
</script>