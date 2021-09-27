<template lang="pug">
  q-file.dragdrop-frame.q-pa-sm(
    borderless
    :value="value"
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxSize"
    :multiple="multiple"
    :readonly="readonly"
    @input="onInput"
  )
    template(slot="before")
      slot(name="before")

    template(slot="default")
      slot(name="default")
        .dragdrop-label.q-pa-md
          | {{ $t("common.components.dragDrop.info") }}

    template(v-slot:file="{ index, file }")
      slot(:file="file" :index="index" name="file")
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
      },
      readonly: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: null
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
  border 2px dashed #0E8AFD
  border-radius: 4px;

  .q-field__native
    min-height 120px !important
    border: 2.5px dashed #0E8AFD
    height: 10rem

    .dragdrop-label
      position: absolute
      width: 100%

::v-deep .q-field__input
  display: none
</style>
