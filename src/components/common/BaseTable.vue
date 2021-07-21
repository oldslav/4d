<template lang="pug">
  q-table(
    flat
    ref="baseTable"
    :grid="grid"
    :title="title"
    :data="data.items"
    :loading="isLoading"
    :columns="columns"
    :row-key="rowKey"
    :pagination="pagination"
    :expanded.sync="expanded"
    :card-container-class="cardContainerClass"
    @request="getData"
    @update:pagination="$emit('update:pagination', $event)"
  )
    template(v-slot:loading)
      q-inner-loading(showing color="primary")
    template(v-if="passedSlots.top" v-slot:top)
      slot(name="top")
    //template(v-slot:top-left)
    //  slot(name="top-left")
    //template(v-slot:top-right)
    //  slot(name="top-right")
    template(v-slot:body="props")
      slot(name="body" v-bind="props")
    template(v-slot:item="props")
      slot(name="item" v-bind="props")
</template>

<script>
  export default {
    name: "BaseTable",
    props: {
      cardContainerClass: {
        type: String,
        default: null
      },
      slots: {
        type: Array,
        default: null
      },
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
      pagination: {
        type: Object,
        default: () => {}
      },
      columns: {
        type: Array,
        default: () => []
      },
      expanded: {
        type: Array,
        default: () => []
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      virtualScroll: {
        type: Boolean,
        default: false
      },
      grid: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      passedSlots () {
        return this.$refs.baseTable && this.$refs.baseTable.$slots || {};
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
