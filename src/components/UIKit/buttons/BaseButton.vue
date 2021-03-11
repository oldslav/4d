<template lang="pug">
  q-btn.base-button.text-button(
    color="primary"
    :disable="disable"
    :label="label"
  )
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="stylus" scoped>
.base-button.q-btn
  &.disabled
    color rgba(255, 255, 255, 0.8) !important
    background $grey !important

  &:hover:not(.disabled)
    background $medium-blue !important

  &:focus
    background $dark-blue !important
</style>
