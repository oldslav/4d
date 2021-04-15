<template lang="pug">
  div(style="position: relative")
    q-input(
      :value="value"
      @input="$emit('input', $event)"
      :placeholder="placeholder"
      :disable="disable"
      :debounce="debounce"
      dark
      borderless
      autogrow
      :dense="dense"
      class="textarea text-medium"
      :class="{ 'textarea_error': !valid }"
    )
      template(v-slot:append)
        q-icon(name="matArrowDropDown" style="color: #C0C8CF")

    .row.justify-center
    .textarea__tooltip.text-caption.text-center(v-show="max && value.length >= max")
      | Максимум {{max}} символов
</template>

<script lang="ts">
  export default {
    name: "Textarea",
    props: {
      value: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "Введите текст"
      },
      disable: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: true
      },
      debounce: {
        type: Number,
        default: 0
      },
      valid: {
        type: Boolean,
        default: true
      },
      max: {
        type: Number,
        default: 0
      }
    }
  };
</script>

<style lang="stylus" scoped>
.textarea.q-textarea
  padding-left 8px
  border 1px solid rgba(255, 255, 255, 0.6)
  border-radius 4px

  ::placeholder
    opacity 0.4

  :not(.q-field--disabled)
    :hover
      ::placeholder
        opacity 0.7

  &.textarea_error
    border-color #FF0000

.textarea__tooltip
  position absolute
  margin-top 13px
  padding 9px 10px 4px
  width 142px
  color white
  background $grey
  border-radius 3px
  transition all 2s linear
  z-index 99

  &:after
    content ''
    position absolute
    display block
    width 0
    height 0
    border-width 10px
    border-style solid
    border-color transparent transparent $grey transparent
    top -18px
    left 61px
</style>
