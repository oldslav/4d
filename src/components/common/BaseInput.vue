<template lang="pug">
  q-input(
    ref="input"
    v-model="value"
    @input="onInput"
    color="primary"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
    :rules="rules"
    :mask="mask"
    :unmasked-value="unmaskedValue"
  )
    template(v-slot:prepend)
      slot(name="prepend")
    template(v-slot:append)
      slot(name="append")
</template>

<script>
  export default {
    name: "BaseInput",
    props: {
      label: {
        type: String,
        default: null
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
      rules: {
        type: Array,
        default: () => []
      },
      mask: {
        type: String,
        default: ""
      },
      unmaskedValue: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        value: null
      };
    },
    methods: {
      onInput (value) {
        this.$emit("input", value);
        if (this.rules.length > 0) this.$refs.input.validate();
      }
    }
  };
</script>

<style scoped>

</style>
