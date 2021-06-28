<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    maximized
    @input="toggleModal"
  )
    q-card.modal-container.q-ma-lg.q-pa-lg
      | asdg
</template>

<script>
  import BaseModal from "../../common/BaseModal";

  export default {
    name: "ApartmentsList",
    components: { BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      toggleModal (value) {
        this.$emit("input", value);
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
