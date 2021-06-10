<script>
  import { mapActions } from "vuex";
  import { CREATE_USER_TICKET_WAREHOUSE } from "@/store/constants/action-constants";

  export default {
    name: "WarehouseTicketMixin",
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
          first: "",
          last: "",
          patronymic: ""
        },
        serviceOption: {
          serviceId: null,
          serviceTypeId: null,
          storagePeriod: null
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
      },
      mainInfoDone () {
        return !!this.name.first && this.name.last;
      },
      optionsDone () {
        return !!this.serviceOption.serviceTypeId && !!this.serviceOption.storagePeriod;
      },
      contactsDone () {
        return !!this.contacts.phone;
      },
      formDone () {
        return this.mainInfoDone && this.optionsDone && this.contactsDone;
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", [CREATE_USER_TICKET_WAREHOUSE]),
      toggleModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.apply(this)); // default data
      },
      onSubmit () {
        const { name, documents, serviceOption } = this;
        const contacts = {
          phones: [this.contacts.phone]
        }; // временно, пока не решим с контактами
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
