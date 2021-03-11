<template lang="pug">
.q-gutter-md
  q-inner-loading(
    :showing="visibleLoading"
    style="z-index: 20;"
  )

  q-form(@submit="onSubmit")
    q-input(
      filled
      v-model="form.username"
      label="Login *"
      hint="Name and surname"
      lazy-rules
      :rules="validateUsername"
    )

    q-input(
      filled
      type="password"
      v-model="form.password"
      label="Password *"
      lazy-rules
      :rules="validatePassword"
    )

    div
      q-btn(label="Submit" type="submit" color="primary")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'FormAuthenticate',
  data () {
    return {
      form: {
        password: '',
        username: ''
      },
      visibleLoading: false
    }
  },
  computed: {
    validateUsername: () => [(val: string) => val.length > 0 || 'Please type login'],
    validatePassword: () => [
      (val: string) => val !== '' || 'Please type password',
      (val: string) => val.length > 7 || 'Minimum 8 symbols'
    ]
  },
  methods: {
    onSubmit () {
      this.visibleLoading = true
      this.$store.dispatch('account/localLogin', this.form)
        .finally(() => {
          this.$emit('done')
          this.visibleLoading = false
        })
    }
  }
})
</script>
