<template lang="pug">
  q-input.text.text-medium(
    :value="value" dark borderless
  label-slot :dense="dense"
    :placeholder="placeholder"
    :class="{ text_error: !valid}"
    :debounce="debounce"
    :disable="disable"
    @input="$emit('input', $event)"
  )
    template(v-slot:label)
      .text-center {{ label }}
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Textarea',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: true
    },
    dense: {
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
.text.q-input
  border-bottom 1px solid rgba(102, 102, 102, 0.4)
  transition all 0.36s linear

  .q-field__label > div
    opacity 0.4

  :not(.q-field--disabled)
    :hover
      cursor pointer

      .q-field__label > div
        opacity 0.7

  &.q-field--focused, &.q-field--float
    .q-field__label > div
      opacity 1

  &.text_error
    border-bottom-color rgba(255, 0, 0, 0.4)

    .q-field__label > div
      color #FF0000
</style>
