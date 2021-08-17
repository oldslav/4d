<template lang="pug">
  q-file.dragdrop-frame.q-pa-sm(
    borderless
    :value="value"
    :max-files="maxFiles"
    :max-file-size="maxSize"
    @input="onInput"
  )
    .dragdrop-label.q-pa-md
      | {{ $t("common.components.dragDrop.info") }}
</template>

<script>
  export default {
    name: "BaseDragDrop",
    props: {
      value: {
        type: Array,
        default: () => []
      },
      maxFileSize: {
        type: [Number, String],
        default: 3
      },
      maxFiles: {
        type: [Number, String],
        default: 1
      }
    },
    computed: {
      maxSize () {
        return this.maxFileSize * 1024 ** 2;
      }
    },
    methods: {
      onInput (value) {
        this.$emit("input", value);
      }
    }
  };
</script>

<style lang="stylus" scoped>
.dragdrop-frame
  border: 2.5px dashed #0E8AFD
  height: 10rem
  .dragdrop-label
    position: absolute
    width: 100%

::v-deep .q-field__native
  display: none
</style>
