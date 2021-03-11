<template lang="pug">
  q-input.search.text-caption.rounded.dark.borderless.standout(
    :value="value"
    :placeholder="placeholder"
    :disable="disable"
    :debounce="debounce"
    @input="$emit('input', $event)"
  )
    template(v-slot:prepend)
      q-icon(name="search" style="font-size: 15px; color: #DADADA;")

    template(v-slot:append)
      q-icon.input__icon.cursor-pointer(
        v-if="value"
        name="close"
        @click="$emit('input', '')"
      )
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Search',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    disable: {
      type: Boolean,
      default: false
    },
    debounce: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="stylus" scoped>
.search.q-input
  padding-right 9px
  padding-left 11px
  height 28px
  color $background
  background-color $dark-theme-dark
  border 1px solid $dark-theme-light
  border-radius 20px
  box-sizing border-box
  transition all 0.36s linear

  ::placeholder
    opacity 0.4

  :not(.q-field--disabled)
    :hover
      cursor pointer

      ::placeholder
        opacity 0.6

.input__icon
  font-size 15px
  opacity 0.2
  z-index 2

  &:hover
    opacity 0.6
</style>
