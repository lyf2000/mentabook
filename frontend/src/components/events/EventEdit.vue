<template>
<v-dialog v-model="show" max-width="350px">
      <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Edit Event</v-toolbar-title>
                <v-spacer></v-spacer>
             
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    type="text"
                  ></v-text-field>

                  <v-textarea
          name="input-7-1"
          label="Default style"
          hint="Hint text"
        ></v-textarea>

               
        <v-dialog
        ref="dialog"
        v-model="modal1"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Pick the date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal1 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

<v-dialog
        ref="dialog2"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Pick the date"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="time"
          full-width
          format="24hr"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.dialog2.save(time)">OK</v-btn>
        </v-time-picker>
      </v-dialog>


                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
    </v-dialog>


</template>

<script>

export default {
  name: 'EventEdit',
  props: ['visible2'],
  data() {
      return {
        modal1: false,
        time: null,
        modal2: false,
        date: null,
      }
  },
  computed: {
    show: {
      get () {
        return this.visible2
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>