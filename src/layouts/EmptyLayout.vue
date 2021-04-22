<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-page-container
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
  export default {
    name: "EmptyLayout"
  };
</script>

<style scoped>

</style>
