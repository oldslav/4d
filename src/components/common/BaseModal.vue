<template lang="pug">
  q-dialog(
    :value="value"
    :full-height="fullHeight"
    :square="square"
    :position="position"
    :maximized="maximized"
    transition-show="fade"
    transition-hide="fade"
    @input="(value) => $emit('toggleModal', value)"
  )
    slot
</template>

<script>
  export default {
    name: "BaseModal",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      fullHeight: {
        type: Boolean,
        defailt: false
      },
      square: {
        type: Boolean,
        defailt: false
      },
      position: {
        type: String,
        default: "right"
      },
      maximized: {
        type: Boolean,
        defailt: false
      }
    }
  }; 
</script>

<style lang="stylus" scoped>
</style>
