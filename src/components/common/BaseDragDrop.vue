<template lang="pug">
  q-file.dragdrop-frame(
    borderless
    :value="value"
    :max-files="maxFiles"
    :max-file-size="maxSize"
    @input="onInput"
  )
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
  border: 0.5px dashed #0E8AFD
  height: 10rem
</style>
