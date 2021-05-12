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
        return [val => !!val || "field is required"];
      },
      validateEmail () {
        return [
          ...this.requiredRule,
          val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || "email not valid"
        ];
      },
      validatePassword () {
        return [
          ...this.requiredRule,
          val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val) || "reg" // uppercase, lowercase, 8 symbols, 1 digit
        ];
      },
      validateConfirm () {
        return [
          ...this.requiredRule,
          val => val === this.model.password || "Пароли не совпадают"
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
