<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <q-input
      filled
      v-model="form.username"
      label="Login *"
      hint="Name and surname"
      lazy-rules
      :rules="validateUsername"
    />

    <q-input
      filled
      type="password"
      v-model="form.password"
      label="Password *"
      lazy-rules
      :rules="validatePassword"
    />

    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'FormAuthenticate',
  data () {
    return {
      form: { login: '', username: '' }
    }
  },
  computed: {
    validateUsername: () => [(val: string) => val.length > 0 || 'Please type login'],
    validatePassword: () => [
      (val: string) => val !== '' || 'Please type password',
      (val: string) => val.length > 8 || 'Please type a real password'
    ]
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('account/localLogin', this.form)
      // console.log('onSubmit')
    }
  }
})
</script>
