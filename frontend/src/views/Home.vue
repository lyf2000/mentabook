<template>
  <div class="home">
     <v-btn color="accent" large @click.stop="exp"></v-btn>   
   <LoginForm :visible="showScheduleForm" @close="showScheduleForm=false" />

   <v-btn color="accent" large @click.stop="showSignUpForm=true"></v-btn>   
   <SignUpForm :visible="showSignUpForm" @close="showSignUpForm=false" />
<v-btn color="accent" large @click="ev"></v-btn>   
      <EventEdit :visible2="showEventEditForm" @close="showEventEditForm=false" />
  
      <EventList />


  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import EventEdit from '@/components/events/EventEdit.vue'
import EventList from '@/components/events/EventList.vue'
import users from '@/store/modules/users'


export default {
  name: 'Home',
  data() {
      return {
        showScheduleForm: false,
        showEventEditForm: false,
        showSignUpForm: false,
        drawer: true,
        editId: 0,
      }
  },
  methods: {
    exp() {
      console.log('exp');
      users.openDialogSignUp()
    },

  },
  components: {
    LoginForm, EventEdit, SignUpForm, EventList
  },
  async created() {
    // events.getEventList()
  }
}
</script>
