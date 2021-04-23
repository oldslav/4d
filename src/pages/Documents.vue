<template lang="pug">
 q-page.q-pa-lg.bg-secondary-light.column.q-gutter-md
  .col
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | Паспортные данные
        passport-form(v-model="passport").q-mt-md
</template>

<script>
  import PassportForm from "components/forms/documents/PassportForm";

  export default {
    name: "Documents",
    components: { PassportForm },
    data () {
      return {
        passport: {

        }
      };
    }
  };
</script>
