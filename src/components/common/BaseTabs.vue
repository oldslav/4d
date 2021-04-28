<template lang="pug">
  q-tabs(v-model="currentTab" @input="onChange" align="left" mobile-arrows)
    slot
</template>

<script>
  export default {
    name: "BaseTabs",
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
