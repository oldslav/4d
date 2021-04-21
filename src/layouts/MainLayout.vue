<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header(elevated)
      router-view(name="toolbar")
    q-drawer(show-if-above v-model="left" side="left" elevated)
      router-view(name="asideLeft")
    q-drawer(v-model="right" side="right" elevated)
      router-view(name="asideRight")
    q-page-container
      router-view
</template>

<script>
  export default {
    name: "MainLayout"
  };
</script>
