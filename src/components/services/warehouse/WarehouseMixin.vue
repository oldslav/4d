<script>
  import { mapActions } from "vuex";
  import { CREATE_USER_TICKET_WAREHOUSE } from "@/store/constants/action-constants";

  export default {
    name: "WarehouseMixin",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        step: 1,
        name: {
          firstname: "",
          lastname: "",
          patronymic: ""
        },
        documents: {
          passport: null
        },
        contacts: {
          phone: null
        }
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/tickets/warehouse/${ CREATE_USER_TICKET_WAREHOUSE }`];
      },
      isMobile () {
        return this.$q.platform.is.mobile;
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", [CREATE_USER_TICKET_WAREHOUSE]),
      toggleModal (value) {
        this.$emit("input", value);
      },
      onSubmit () {
        const { name, documents, serviceOption } = this;
        const contacts = {
          phones: [this.contacts.phone]
        }; // временно, пока не решим с контактами
        // eslint-disable-next-line no-console
        console.log("result", { name, documents, contacts, serviceOption });
        return this.CREATE_USER_TICKET_WAREHOUSE({ warehouse: null, name, documents, contacts, serviceOption })
          .then(() => {
            this.$emit("success");
          })
          .catch(() => {
            this.$emit("fail");
          })
          .finally(() => {
            this.toggleModal(false);
          });
      }
    }
  };
</script>
