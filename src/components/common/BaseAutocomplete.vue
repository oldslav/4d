<template lang="pug">
  q-select(
    :value="value"
    color="primary"
    :fill-input="fillInput"
    :loading="loading"
    :use-input="useInput"
    option-disable="inactive"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :rules="rules"
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
    @clear="onInput(null)"
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
      fillInput: {
        type: Boolean,
        default: null
      },
      value: {
        type: [Array, String, Object],
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
      emitValue: {
        type: Boolean,
        default: null
      },
      useInput: {
        type: Boolean,
        default: null
      },
      mapOptions: {
        type: Boolean,
        default: null
      },
      hideSelected: {
        type: Boolean,
        default: null
      },
      loading: {
        type: Boolean,
        default: null
      },
      rules: {
        type: Array,
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
        this.$emit("input", value);
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
