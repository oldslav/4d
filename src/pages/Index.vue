<template>
  <q-page class="row items-center justify-evenly">
    <div style="width: 500px">
      <form-authenticate v-if="!isAuthenticated"/>
      <div v-if="isAuthenticated">
        <h4>Вы авторизованы как:</h4>
        <pre>{{ getAccount }}</pre>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {mapGetters} from 'vuex'

import FormAuthenticate from 'components/forms/FormAuthenticate.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { FormAuthenticate },
  computed:{
    ...mapGetters('account',['getAccount', 'isAuthenticated'])
  }
})
</script>
