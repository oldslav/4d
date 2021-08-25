<template lang="pug">
  q-input(
    ref="input"
    v-model="computedValue"
    color="primary"
    :dense="dense"
    :autogrow="autogrow"
    :counter="counter"
    :maxlength="type === 'textarea' && maxlength || undefined"
    :filled="filled"
    :type="type"
    :label="label"
    :clearable="clearable"
    :outlined="outlined"
    :readonly="readonly"
    :disable="disable"
    :rules="rules"
    :reactive-rules="reactiveRules"
    :mask="mask"
    :unmasked-value="unmaskedValue"
    :stack-label="stackLabel"
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
      stackLabel: {
        type: Boolean,
        default: false
      },
      reactiveRules: {
        type: Boolean,
        default: false
      },
      append: {
        type: Boolean,
        default: null
      },
      autogrow: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: false
      },
      filled: {
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
      value: {
        type: [String, Number],
        default: null
      },
      maxlength: {
        type: Number,
        default: 30
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
      },
      counter: {
        type: Boolean,
        default: false
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
          this.$emit("input", value);
        }
      }
    }
    // methods: {
    //   onInput (value) {
    //     this.$emit("input", value);
    //     if (this.rules.length > 0) this.$refs.input.validate();
    //   }
    // }
  };
</script>

<style scoped>

</style>
