<template lang="pug">
  .full-width
    file-picker.q-mt-sm(v-for="(entry, index) in entries" v-model="model[entry.value]" v-bind="entry.props" :key="index")
</template>

<script>
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "DocumentsForm",
    components: { FilePicker },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      entries: {
        type: Array,
        default: () => []
      },
      immediate: { // флаг, при котором отправка и удаление данных будет происходить сразу после событий добавления или удаления
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        model: { ...this.value }
      };
    },
    watch: {
      value: {
        deep: true,
        immediate: true,
        handler (val) {
          this.model = val;
        }
      },
      model: {
        deep: true,
        handler (val) {
          this.$emit("input", val);
        }
      }
    }
  };
</script>
