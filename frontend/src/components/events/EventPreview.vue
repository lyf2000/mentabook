<template>
    <v-card>
        <v-card-text
        >
            <div>{{ eventItem.date }}</div>
            <p class="display-1 text--primary">
              {{ eventItem.title }}
            </p>

          <div class="text--primary" >{{ eventItem.text}}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn icon
                @click="showEdit"
            >
                <v-icon class="mr-1">mdi-fountain-pen</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
        <v-btn 
        icon
        @click="deleteEvent"
        >
            <v-icon class="mr-1">mdi-delete</v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import dialogs from '@/store/modules/dialogs'
import { EventItem } from "@/store/models";
import { deleteEvent } from '@/store/api'


@Component({
  name: 'EventPreview',
})
export default class App extends Vue {
    @Prop() eventItem!: EventItem
    showEdit() {
      dialogs.changeEvent(this.eventItem)
      dialogs.changeActiveDialog('EventEdit')
    }
    async deleteEvent() {
      const res = await deleteEvent(this.eventItem.id)
    }
}
</script>