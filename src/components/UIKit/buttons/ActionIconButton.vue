<template lang="pug">
  q-btn.icon-button.text-small(
    :disable="disable"
  )
    q-icon(:name="icon")
      .icon-button__label {{ label }}
</template>

<script>
  import { defineComponent } from "@vue/composition-api";

  export default defineComponent({
    name: "ActionIconButton",
    props: {
      icon: {
        type: String,
        default: ""
      },
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
.icon-button.q-btn
  background rgba(14, 138, 253, 0.2)

  .q-icon
    color $primary

  .icon-button__label
    margin 0 auto 0 45px
    color #ffffff
    text-transform none

  &.disabled
    .q-icon, .icon-button__label
      color rgba(102, 102, 102, 0.4) !important
    background rgba(51, 51, 51, 0.1) !important

  &:hover:not(.disabled)
    background rgba(0, 122, 221, 0.2) !important

  &:focus
    background rgba(0, 107, 133, 0.2) !important
</style>
