<template lang="pug">
  q-file(
    v-model="model"
    borderless
    :label="label"
    bottom-slots
    multiple
    append
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxSize"
  )
    template(#append)
      q-icon(name="o_file_upload")
    template(#hint)
      | {{ description }}
    template(#file="{ index, file }")
      q-chip.full-width.q-pl-none(removable color="transparent" @remove="removeFile(index)" icon-remove="o_delete")
        div.ellipsis
          | {{ file.name }}
        q-tooltip
          | {{ file.name }}
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: []
      },
      accept: {
        type: String,
        default: ".jpg, .png, .pdf, .jpeg"
      },
      label: {
        type: String,
        default: ""
      },
      description: {
        type: String,
        default: "Формат jpg, jpeg, png, pdf"
      },
      maxFileSize: {
        type: Number,
        default: 3
      },
      // multiple: {
      //   type: Boolean,
      //   default: false
      // },
      maxFiles: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        model: null
      };
    },
    computed: {
      maxSize () {
        return this.maxFileSize * 1000000;
      }
    },
    methods: {
      removeFile (index) {
        this.model.splice(index, 1);
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (val) {
          this.model = val;
        }
      },
      model (val) {
        this.$emit("input", val);
      }
    }
  };
</script>

<style lang="stylus">
</style>
