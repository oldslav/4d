<template lang="pug">
  div
    .text-h1.ui__title BUTTONS

    .buttons__list
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
.buttons__list > *
  margin 15px
</style>
