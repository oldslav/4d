<template lang="pug">
  q-btn.text-button.text-button(
    :disable="disable"
    :label="label"
  )
</template>

<script>
  import { defineComponent } from "@vue/composition-api";

  export default defineComponent({
    name: "TextButton",
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
.text-button.q-btn
  color $primary

  &.disabled
    color rgba(102, 102, 102, 0.4) !important

  &:hover:not(.disabled)
    background rgba(0, 122, 221, 0.1) !important

  &:focus
    background rgba(0, 107, 133, 0.1) !important
</style>
