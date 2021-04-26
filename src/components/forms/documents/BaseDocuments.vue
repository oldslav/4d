<template lang="pug">
  .full-width
    file-picker.q-mt-sm(v-for="(entry, index) in entries" v-model="model[entry.value]" v-bind="entry.props" :key="index")
</template>

<script>
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "BaseDocuments",
    components: { FilePicker },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      entries: {
        type: Array,
        default: () => []
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
