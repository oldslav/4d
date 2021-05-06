<template lang="pug">
  q-dialog(:value="value" @input="onToggle")
    q-card.modal-container
        q-card-section.row.justify-between.items-center.text-h6
          slot(name="title")

          q-icon(name="o_close" @click="onToggle").cursor-pointer

        q-separator.q-mb-sm

        q-card-section
          slot(name="content")

        q-card-actions(align="right")
          slot(name="buttons")
</template>

<script>
  export default {
    name: "BaseModal",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onToggle (value) {
        this.$emit("input", !value);
      }
    }
  }; 
</script>

<style lang="stylus" scoped>
.modal-container
  min-width: 35vw
</style>
