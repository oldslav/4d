<template lang="pug">
  q-date(
    v-model="computedValue"
    :mask="dateMask"
    minimal
    range
    :default-year-month="defaultMonth"
    :navigation-min-year-month="minStartMonth"
    :options="options"
  )
</template>

<script>
  import moment from "moment";
  import BaseInput from "./BaseInput";

  export default {
    name: "BaseDatepicker",
    components: { BaseInput },
    props: {
      value: {
        type: Object,
        default: null
      },
      label: {
        type: String,
        default: null
      },
      maxPeriod: {
        type: Number,
        default: 30
      },
      options: {
        type: Function,
        default: val => val
      },
      minStartMonth: {
        type: String,
        default: moment().subtract(100, "years").format("YYYY/MM")
      },
      defaultMonth: {
        type: String,
        default: moment().format("YYYY/MM")
      }
    },
    data () {
      return {
        innerValue: null,
        dateMask: "MM.DD.YYYY",
        inputMask: "##.##.####",
        inputRules: [
          val => !!val || this.$t("common.error.validation.required")
        ]
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
  };
</script>

<style scoped>

</style>
