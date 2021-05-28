<template lang="pug">
  BaseInput(v-model="value.phone" :label="$t('entity.contacts.phone')" clearable).col
</template>

<script>
  import BaseInput from "../BaseInput";
  export default {
    name: "FormContacts",
    components: { BaseInput },
    props: {
      value: {
        type: Object,
        default: null
      }
    }
  };
</script>

<style scoped>

</style>
