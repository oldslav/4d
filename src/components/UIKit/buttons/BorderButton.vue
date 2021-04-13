<template lang="pug">
  q-btn.border-button.text-button(
    :disable="disable"
    :label="label"
    rounded
  )
</template>

<script>
  import { defineComponent } from "@vue/composition-api";

  export default defineComponent({
    name: "BorderButton",
    props: {
      label: {
        type: String,
        default: "Label"
      },
      disable: {
        type: Boolean,
        default: false
      }
    }
  });
</script>

<style lang="stylus" scoped>
.border-button.q-btn
  color $primary
  border 2px solid $primary

  &.disabled
    color rgba(102, 102, 102, 0.8) !important
    border-color $grey

  &:hover:not(.disabled)
    background rgba(0, 122, 221, 0.1) !important

  &:focus
    background rgba(0, 107, 133, 0.1) !important
</style>
