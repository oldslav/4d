<script>
  import { mapActions, mapGetters } from "vuex";
  import { CREATE_USER_TICKET_WAREHOUSE, GET_USER_DOCUMENTS } from "@/store/constants/action-constants";

  export default {
    name: "WarehouseTicketMixin",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    async created () {
      await this.GET_USER_DOCUMENTS();
      Object.keys(this.documents).forEach(type => {
        if (this.getDocuments[type]) {
          this.documents[type] = this.getDocuments[type];
        }
      });
    },
    data () {
      return {
        warehouseId: null,
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
          phones: []
        }
      };
    },
    computed: {
      ...mapGetters("user/documents", ["getDocuments"]),
      ...mapGetters("services", ["getPickedFeatureId"]),
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
        return !!this.contacts.phones[0];
      },
      formDone () {
        return this.mainInfoDone && this.optionsDone && this.contactsDone;
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", [CREATE_USER_TICKET_WAREHOUSE]),
      ...mapActions("user/documents", [
        GET_USER_DOCUMENTS
      ]),
      toggleModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.apply(this)); // default data
      },
      onSubmit () {
        const { name, documents, serviceOption, contacts } = this;
        return this.CREATE_USER_TICKET_WAREHOUSE({ warehouseId: this.getPickedFeatureId, name, documents, contacts, serviceOption })
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
