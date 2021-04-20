<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header(elevated class="bg-white")
      router-view(name="toolbar")
    q-page-container
      router-view
</template>

<script>
  export default {
    name: "MainLayout"
  };
</script>
