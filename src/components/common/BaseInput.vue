<template lang="pug">
  q-input(
    v-model="value"
    @input="onInput"
    color="primary"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
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
      }
    }
  };
</script>

<style scoped>

</style>
