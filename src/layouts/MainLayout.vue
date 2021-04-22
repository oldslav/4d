<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header(elevated)
      transition(name="fade" mode="out-in")
        router-view(name="toolbar")
    q-drawer(show-if-above side="left" elevated)
      transition(name="fade" mode="out-in")
        router-view(name="asideLeft")
    q-drawer(side="right" elevated)
      transition(name="fade" mode="out-in")
        router-view(name="asideRight")
    q-page-container
      transition(name="fade" mode="out-in")
        router-view
</template>

<script>
  export default {
    name: "MainLayout"
  };
</script>
