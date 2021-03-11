<template lang="pug">
  q-btn.icon-button.text-button(
    color="primary"
    :icon="icon"
    :disable="disable"
    :label="label"
    rounded
  )
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      default: ''
    },
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
.icon-button.q-btn
  &.disabled
    color rgba(102, 102, 102, 0.8) !important
    background $grey !important

  &:hover:not(.disabled)
    background $medium-blue !important

  &:focus
    background $dark-blue !important
</style>
