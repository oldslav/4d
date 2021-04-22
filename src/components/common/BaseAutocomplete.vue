<template lang="pug">
  q-select(
    :value="value"
    color="primary"
    fill-input
    use-input
    option-disable="inactive"
    emit-value
    map-options
    :option-value="prop"
    :option-label="field"
    :options="computedOptions"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
    :multiple="multiple"
    :hide-selected="hideSelected && !multiple"
    @filter="filter"
    @input="onInput"
  )
    template(v-slot:prepend)
      slot(name="prepend")
    template(v-slot:append)
      slot(name="append")
</template>

<script>
  export default {
    name: "BaseAutocomplete",
    props: {
      label: {
        type: String,
        default: null
      },
      value: {
        type: [Array, String],
        default: null
      },
      field: {
        type: String,
        default: null
      },
      prop: {
        type: String,
        default: null
      },
      options: {
        type: Array,
        required: true
      },
      clearable: {
        type: Boolean,
        default: null
      },
      outlined: {
        type: Boolean,
        default: null
      },
      readonly: {
        type: Boolean,
        default: null
      },
      disable: {
        type: Boolean,
        default: null
      },
      multiple: {
        type: Boolean,
        default: null
      },
      hideSelected: {
        type: Boolean,
        default: null
      }
    },
    data () {
      return {
        computedOptions: null
      };
    },
    methods: {
      onInput (value) {
        if (!!value) {
          this.$emit("input", value);
        }
      },

      filter (val, update) {
        update(() => {
          this.computedOptions = this.options.filter(option => {
            return ((this.field ? option[this.field] : option) || "")
              .toString()
              .toLowerCase()
              .indexOf(val.toLowerCase()) >= 0;
          });
        });
      }
    }
  };
</script>

<style scoped>

</style>
