<template lang="pug">
  q-tabs(
    :value="value"
    @input="onChange"
    align="left"
    :dense="dense"
    mobile-arrows
    :class="{ 'full-width': isFullWidth }"
  )
    slot
</template>

<script>
  export default {
    name: "BaseTabs",
    props: {
      value: {
        type: [String, Number],
        default: null
      },
      isFullWidth: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onChange (event) {
        this.$emit("input", event);
      }
    }
  };
</script>

<style scoped>

</style>
