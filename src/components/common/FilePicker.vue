<template lang="pug">
  q-file(
    :value="value"
    :rules="rules"
    :multiple="multiple"
    no-error-icon
    dense
    :label="label"
    bottom-slots
    borderless
    append
    ref="field"
    :readonly="readonly"
    :lazy-rules="lazy"
    :accept="accept"
    :max-files="maxFiles"
    :max-file-size="maxSize"
    @input="onInput"
    @rejected="onReject"
  )
    template(#append)
      q-icon.cursor-pointer(name="o_file_upload" @click="pickFiles")
    template(#hint)
      | {{ description }}
    template(#file="{ index, file }")
      q-chip.file-picker__chip.q-pl-none.q-ml-none(removable color="transparent" @remove="removeFile(index)" :disable="readonly" icon-remove="o_delete")
        div.ellipsis
          | {{ file.name }}
      .flex-break
</template>

<script>
  import BaseFieldMixin from "components/common/BaseFieldMixin";

  export default {
    name: "FilePicker",
    mixins: [BaseFieldMixin],
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
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
      multiple: {
        type: Boolean,
        default: true
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
        process.browser && this.$refs.field.removeAtIndex(index);
        if (!!this.value[index].id) {
          this.$emit("remove", this.value[index].id);
        }
      },
      pickFiles (evt) {
        process.browser && this.$refs.field.pickFiles(evt);
      },
      onReject () {
        this.$q.notify({
          type: "negative",
          message: "Размер файла больше 2Мб"
        });
      }
    }
  };
</script>

<style lang="stylus">
</style>
