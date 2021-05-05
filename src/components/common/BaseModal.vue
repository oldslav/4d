<template lang="pug">
  q-dialog(
    :value="value"
    full-height
    square
    position="right"
    maximized
    transition-show="fade"
    transition-hide="fade"
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
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
