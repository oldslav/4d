<template lang="pug">
  q-dialog(:value="value" @input="onInput")
    q-card
      q-card-section.row.items-center.q-pb-none
        .text-primary.text-medium
          | {{ $t("common.error.response.oops") }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-card-section
        | {{ $t("common.error.response.tryLater") }}
</template>

<script>
  export default {
    name: "ModalFail",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onInput (value) {
        this.$emit("input", value);
      }
    }
  };
</script>
