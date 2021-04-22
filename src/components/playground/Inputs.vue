<template lang="pug">
  div.column
    h3.text-title
      | Input
    h4.text-medium-b
      | With icon
    div.row.q-py-xs.q-gutter-md.justify-start
      div
        BaseInput(v-model="search" label="With icon" clearable)
          template(#prepend)
            q-icon(name="search")
      div
        BaseInput(v-model="search" label="Outlined" outlined)
          template(v-slot:prepend)
            q-icon(name="search")
      div
        BaseInput(v-model="search" label="Readonly" readonly)
          template(v-slot:prepend)
            q-icon(name="search")
      div
        BaseInput(v-model="search" label="Disabled" disable)
          template(v-slot:prepend)
            q-icon(name="search")

    h4.text-medium-b
      | Primary
    div.row.q-py-xs.q-gutter-md.justify-start
      div
        BaseInput(v-model="search" label="Primary" clearable)
      div
        BaseInput(v-model="search" label="Outlined" outlined)
      div
        BaseInput(v-model="search" label="Readonly" readonly)
      div
        BaseInput(v-model="search" label="Disabled" disable)
</template>

<script>
  import BaseInput from "components/common/BaseInput";

  export default {
    name: "Inputs",
    components: { BaseInput },
    data () {
      return {
        search: null
      };
    }
  };
</script>

<style scoped>

</style>
