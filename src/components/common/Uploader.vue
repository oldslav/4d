<template lang="pug">
  q-uploader.uploader(:label="label" no-thumbnails)
</template>

<script>
  export default {
    name: "Uploader",
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      label: {
        type: String,
        default: ""
      },
      description: {
        type: String,
        default: "Формат jpg, jpeg, png, pdf"
      }
    },
    data () {
      return {
        model: { ...this.value }
      };
    },
    watch: {
      value (val) {
        this.model = val;
      },
      model (val) {
        this.$emit("input", val);
      }
    }
  };
</script>

<style lang="stylus">
  .q-uploader {
    width 100%
    box-shadow unset
    background unset

    &__header {
      color #000
      background-color unset
      &:before{

      }
    }

    &__list {
      display none
    }
  }
</style>
