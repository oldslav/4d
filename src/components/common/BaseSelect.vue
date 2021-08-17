<template lang="pug">
  q-select(
    v-model="computedValue"
    color="primary"
    :dense="dense"
    :options="options"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
    :multiple="multiple"
    :option-key="optionKey"
    :option-value="optionValue"
    :rules="rules"
    :stack-label="stackLabel"
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
        type: [String, Number, Array, Object, null],
        default: null
      },
      stackLabel: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: null
      },
      optionKey: {
        type: String,
        default: "label"
      },
      optionValue: {
        type: String,
        default: "value"
      },
      options: {
        type: Array,
        required: true
      },
      clearable: {
        type: Boolean,
        default: false
      },
      outlined: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      disable: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: false
      },
      rules: {
        type: [Array, null],
        default: () => []
      }
    },
    data () {
      return {
        innerValue: null
      };
    },
    computed: {
      computedValue: {
        get () {
          if (this.innerValue) {
            return this.innerValue;
          } else {
            return this.value;
          }
        },

        set (value) {
          this.innerValue = value;
          if (value) {
            this.$emit("input", value[this.optionValue]);
          } else {
            this.$emit("input", value);
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>
