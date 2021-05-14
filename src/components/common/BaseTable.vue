<template lang="pug">
  q-table(
    flat
    :title="title"
    :data="data.items"
    :loading="isLoading"
    :columns="columns"
    :row-key="rowKey"
    :pagination="data.pagination"
    :expanded.sync="expanded"
    @request="getData"
  )
    template(v-slot:loading)
      q-inner-loading(showing color="primary")
    template(v-slot:top-right)
      slot(name="top-right")
    template(v-slot:body="props")
      slot(name="body" v-bind="props")
</template>

<script>
  export default {
    name: "BaseTable",
    props: {
      getData: {
        type: Function,
        required: true
      },
      title: {
        type: String,
        default: null
      },
      rowKey: {
        type: String,
        default: "name"
      },
      data: {
        type: Object,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        expanded: []
      };
    },
    methods: {
      expandRow (props) {
        props.expand = !props.expand;
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
