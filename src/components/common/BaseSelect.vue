<template lang="pug">
  q-select(
    :value="value"
    @input="onInput"
    color="primary"
    :options="options"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
    :multiple="multiple"
    )
    template(v-slot:prepend)
      slot(name="prepend")
    template(v-slot:append)
      slot(name="append")
</template>

<script>
  export default {
    name: "BaseSelect",
    props: {
      value: {
        type: [String, Number, Array, null],
        default: null
      },
      label: {
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
      }
    },
    data () {
      return {
        innerValue: null
      };
    },
    methods: {
      onInput (value) {
        this.innerValue = value;
        this.$emit("input", value);
      }
    }
  };
</script>

<style scoped>

</style>
