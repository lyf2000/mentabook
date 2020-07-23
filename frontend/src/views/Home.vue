<template>
  <div class="home">
     <v-btn color="accent" large @click.stop="showScheduleForm=true"></v-btn>   
   <LoginForm :visible="showScheduleForm" @close="showScheduleForm=false" />
    
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Home',
  data() {
      return {
        showScheduleForm: false
      }
  },
  components: {
    LoginForm,
  }
}
</script>
