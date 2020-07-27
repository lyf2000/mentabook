<template>
<div class="home">
<v-dialog v-if="show" v-model="show" max-width="350px">

  <component :is="show"></component>
</v-dialog>

</div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import dialogs from '@/store/modules/dialogs' 
import LoginForm from '@/components/LoginForm.vue'
import EventEdit from '@/components/events/EventEdit.vue'
import SignUpForm from '@/components/SignUpForm.vue'



@Component({
  name: 'Dialog',
  components: {
    SignUpForm, EventEdit, LoginForm
  },
})
export default class Dialog extends Vue {
   get show() {
     return dialogs.activeDialog
   }

   set show(value) {
      dialogs.changeActiveDialog(null)
   }
}

</script>

