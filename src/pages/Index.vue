<template>
  <q-page class="row items-center justify-evenly">
    <div style="width: 500px">
      <form-authenticate/>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api'

import FormAuthenticate from 'components/forms/FormAuthenticate.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {FormAuthenticate}
})
</script>
