<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    created () {
      this.$q.dark.set(false);
    }
  };
</script>
