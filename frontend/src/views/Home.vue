<template>
  <div class="home">
     <v-btn color="accent" large @click.stop="showScheduleForm=true"></v-btn>   
   <LoginForm :visible="showScheduleForm" @close="showScheduleForm=false" />

   <v-btn color="accent" large @click.stop="showSignUpForm=true"></v-btn>   
   <SignUpForm :visible="showSignUpForm" @close="showSignUpForm=false" />

      <EventDetail :visible2="showEventDetailForm" @close="showEventDetailForm=false" />
  
      
    <v-row>
      <v-col v-for="n in 17" :key="n" cols="6">
        <v-card>
          <v-card-text
          @click.stop="showEventDetail"
          >
            <div>Date</div>
            <p class="display-1 text--primary">
              date
            </p>

          <div class="text--primary">
        well meaning and kindly.
        "a benevolent smile"
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn icon
                        @click="showEventDetailForm=true"
                    >
                        <v-icon class="mr-1">mdi-fountain-pen</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
      <v-btn icon
                       
                    >
                        <v-icon class="mr-1">mdi-delete</v-icon>
                    </v-btn>
    </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import EventDetail from '@/components/events/EventDetail.vue'

export default {
  name: 'Home',
  data() {
      return {
        showScheduleForm: false,
        showEventDetailForm: false,
        showSignUpForm: false,
        drawer: true,
        editId: 0,

      }
  },
  methods: {
    exp() {
      console.log(42);
    },
    showEventDetail(id) {
      this.showScheduleForm = true
    }
  },
  components: {
    LoginForm, EventDetail, SignUpForm, 
  }
}
</script>
