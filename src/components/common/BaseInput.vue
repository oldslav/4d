<template lang="pug">
  q-input(
    v-model="value"
    @input="onInput"
    color="primary"
    :type="type"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
    )
    template(v-if="prepend" v-slot:prepend)
      slot(name="prepend")
    template(v-if="append" v-slot:append)
      slot(name="append")
</template>

<script>
  export default {
    name: "BaseInput",
    props: {
      prepend: {
        type: Boolean,
        default: null
      },
      append: {
        type: Boolean,
        default: null
      },
      label: {
        type: String,
        default: null
      },
      type: {
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
