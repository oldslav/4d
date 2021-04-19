<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header
      router-view(name="toolbar")
    q-page-container
      router-view
</template>

<script>
  export default {
    name: "MainLayout"
  };
</script>
