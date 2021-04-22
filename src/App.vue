<template lang="pug">
  div#q-app
    component(:is="layout")
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
  export default {
    name: "App",
    created () {
      this.$q.dark.set(false);
    },
    computed: {
      layout () {
        return this.$route.meta.layout || "EmptyLayout";
      }
    }
  };
</script>
