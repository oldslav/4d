<template lang="pug">
  div
    h3(class="text-title")
      | Buttons
    div(class="row q-gutter-md justify-start")
      q-btn(color="primary" label="Outlined" icon="icon-pet")
      q-btn(outline color="primary" label="Outlined")
      q-btn(color="primary" label="Primary")
      q-btn(flat color="primary" label="Transparent")
      q-btn(flat color="primary-light" label="Transparent")
</template>

<script>
  export default {
    name: "Buttons"
  };
</script>

<style lang="stylus" scoped>
</style>
