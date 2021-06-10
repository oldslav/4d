<script>
  export default {
    name: "InputsMixin",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    mounted () {
      this.model = this.defaultModel();
    },
    data () {
      return {
        isPassword: true,
        isConfirm: true,
        model: {}
      };
    },
    computed: {
      requiredRule () {
        return [val => !!val || this.$t("common.error.validation.required")];
      },
      validateEmail () {
        return [
          ...this.requiredRule,
          val => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) || this.$t("common.error.validation.email")
        ];
      },
      validatePassword () {
        return [
          ...this.requiredRule,
          val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(val) || this.$t("common.error.validation.passwordReg") // uppercase, lowercase, 8 symbols, 1 digit
        ];
      },
      validateConfirm () {
        return [
          ...this.requiredRule,
          val => val === this.model.password || this.$t("common.error.validation.confirmPassword")
        ];
      }
    },
    methods: {
      defaultModel () {
        // do nothing
      }
    },
    watch: {
      model: {
        deep: true,
        immediate: true,
        handler (val) {
          this.$emit("input", val);
        }
      }
    }
  };
</script>
