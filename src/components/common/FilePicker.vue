<template lang="pug">
  q-file(
    :value="value"
    :rules="rules"
    no-error-icon
    dense
    ref="picker"
    :label="label"
    bottom-slots
    borderless
    multiple
    append
    :lazy-rules="lazy"
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxSize"
    @input="onInput"
  )
    template(#append)
      q-icon.cursor-pointer(name="o_file_upload" @click="pickFiles")
    template(#hint)
      | {{ description }}
    template(#file="{ index, file }")
      q-chip.file-picker__chip.q-pl-none.q-ml-none(removable color="transparent" @remove="removeFile(index)" icon-remove="o_delete")
        div.ellipsis
          | {{ file.name }}
      .flex-break
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      },
      lazy: {
        type: Boolean,
        default: false
      },
      rules: {
        type: Array,
        default: () => []
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
      },
      removeFile (index) {
        this.$refs.picker.removeAtIndex(index);
        if (!!this.value[index].id) {
          this.$emit("remove", this.value[index].id);
        }
      },
      pickFiles (evt) {
        this.$refs.picker.pickFiles(evt);
      }
    }
  };
</script>

<style lang="stylus">
</style>
