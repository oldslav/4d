<template lang="pug">
  q-tabs(
    v-model="currentTab"
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
      isFullWidth: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        currentTab: null
      };
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
