<template>

      <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Edit Event on {{ event.fullDate }}</v-toolbar-title>
                <v-spacer></v-spacer>
             
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Title"
                    name="title"
                    type="text"
                    :rules="rules.title"
                    v-model="event.title"
                  ></v-text-field>

                  <v-textarea
                    name="input-7-1"
                    label="Text"
                    hint="Hint text"
                    v-model="event.text"
                    :rules="rules.text"
                  ></v-textarea>

        <v-dialog
        ref="dialog"
        v-model="modal1"
        :return-value.sync="event.date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="event.date"
            label="Pick the date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="event.date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(event.date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

<v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="event.time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="event.time"
            label="Pick the time"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          full-width
          format="24hr"
          v-model="event.time"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog2.save(event.time)">OK</v-btn>
        </v-time-picker>
      </v-dialog>


                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="updateEvent">Save Changes</v-btn>
              </v-card-actions>

<v-snackbar
      v-model="snackbar"
      top
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="error"
          text
          multi-line
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

            </v-card>
</template>



<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import dialogs from '@/store/modules/dialogs'
import { updateEvent } from '@/store/api'
import { EventItemEdit, EventItem } from '@/store/models'
import events from '../../store/modules/events';

@Component({
  name: 'EventEdit',
})
export default class EventEdit extends Vue {

  private modal1 = false
  private time = null
  private modal2 = false
  private date = null
  private snackbar = false
  private errorMessage = ''


   rules = {
    title: [
        v => !!v || 'Title is required',
      ],
    text: [
        v => !!v || 'Text is required',
      ],
      
  }

  get event(): EventItemEdit | null {
    return dialogs.event
  }



  alertError(msg: string) {
    this.errorMessage = msg
    this.snackbar = true
  }

  async updateEvent() {
    const { id, text, title } = this.event
    const newDate = `${this.event.date} ${this.event.time}`
    let date = this.event.fullDate
    
    if (this.event.date.trim() !== '' || this.event.time.trim() !== ''){
      if (this.event.date.trim() !== '' && this.event.time.trim() !== '') {
          date = newDate
      }
      else {
        this.alertError('Date and Time are both required')
        return
      }
    } 
    
    const res = await updateEvent(id, {
        text, title,
        date: date
      }).then(data => {
          events.loadEventList()
          dialogs.changeActiveDialog(null)
      }).catch(data => {
        let msg = ''
        for (const [key, value] of Object.entries(data)) {
          msg += `${key}: ${value} `
        }
        this.alertError(msg)
      })
    
}

}

</script>