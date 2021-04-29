<template lang="pug">
  q-tabs(
    v-model="currentTab"
    @input="onChange"
    align="left"
    dense
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
