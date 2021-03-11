<template>
  <div>
    <div class="text-h1 ui__title">TEXT FIELDS</div>

    <div class="text-fields__list">
      <Search v-model="search" />
      <TextField v-model="email" label="Ваш email" :valid="isEmailValid" />
      <Textarea v-model="description" :max="5" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import Search from 'components/UIKit/textFields/Search.vue'
import TextField from 'components/UIKit/textFields/TextField.vue'
import Textarea from 'components/UIKit/textFields/Textarea.vue'

const isEmail = (value = '') => new RegExp('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$').test(value)

export default defineComponent({
  components: {
    Search,
    TextField,
    Textarea
  },

  setup () {
    const search = ref('')
    const email = ref('')
    const description = ref('')

    const isEmailValid = computed(() => !email.value || isEmail(email.value))

    return {
      search,
      email,
      description,
      isEmailValid
    }
  }
})
</script>

<style lang="stylus" scoped>
.text-fields__list > *
  margin 15px
  width 212px
</style>
