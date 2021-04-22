<template lang="pug">
  div.column
    h4.text-medium-b
      | Primary buttons
    div.row.q-gutter-md.justify-start
      q-btn(color="primary" label="With icon" icon="icon-pet")
      q-btn(color="primary" label="Primary")
      q-btn(color="primary" label="Outlined" outline)
      q-btn(color="primary" label="Outlined" disable)

    h4.text-medium-b
      | Flat buttons
    div.row.q-gutter-md.justify-start
      q-btn(color="primary" label="With icon" icon="icon-pet" flat)
      q-btn(color="primary" label="Primary" flat)
      q-btn(color="primary-flat" label="With icon" icon="add" flat)
      q-btn(color="primary-flat__bordered" label="Bordered" icon="add" flat)
</template>

<script>
  export default {
    name: "Buttons"
  };
</script>

<style scoped>

</style>
