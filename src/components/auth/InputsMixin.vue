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
          val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || this.$t("common.error.validation.email")
        ];
      },
      validatePassword () {
        return [
          ...this.requiredRule,
          val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val) || this.$t("common.error.validation.passwordReg") // uppercase, lowercase, 8 symbols, 1 digit
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
