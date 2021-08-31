<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
    :loading="isLoading"
  )
    q-card.full-width
      q-stepper(
        ref="stepper"
        v-model="step"
        color="primary"
        flat
        animated
        keep-alive
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :error="!isUserInfo && step > 1"
          :name="1"
        )
          FormName(v-model="name")
          MyDocumentsForm(v-model="documents" isLocal all-required)

          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Семья"
          :done="step > 2"
          :error="!familyDone && step > 2"
          :name="2"
        )
          TicketNeighbors(v-model="neighbors")

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :error="!isAdditionalInfo && step > 3"
          :name="3"
        )
          q-checkbox(v-model="rooms" val="1" color="primary" :label="$tc('entity.services.living.info.rooms', 1)")
          q-checkbox(v-model="rooms" val="2" color="primary" :label="$tc('entity.services.living.info.rooms', 2)")
          q-checkbox(v-model="rooms" val="3" color="primary" :label="$tc('entity.services.living.info.rooms', 3)")

          FormContacts(v-model="contacts").q-mt-sm

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="createLivingTicket" color="primary" :label="$t('action.create')" :disable="!isValid" :loading="isTicketCreating")
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import {
    ADD_USER_TICKET_FILE_LIVING,
    ADD_USER_TICKET_NEIGHBOR,
    CREATE_USER_TICKET_LIVING,
    GET_USER_DOCUMENTS,
    GET_USER_TICKET
  } from "@/store/constants/action-constants";
  import { isDocumentPresent } from "@/util/validators";
  import TicketNeighbors from "components/user/tickets/TicketNeighbors";
  import BaseInput from "../../../common/BaseInput";
  import BaseModal from "../../../common/BaseModal";
  import FilePicker from "../../../common/FilePicker";
  import FormName from "components/common/form/FormName";
  import FormContacts from "components/common/form/FormContacts";
  import MyDocumentsForm from "../../../forms/documents/MyDocumentsForm";

  export default {
    name: "UserTicketsApartmentsNewTicketModal",
    components: { MyDocumentsForm, TicketNeighbors, FilePicker, BaseInput, BaseModal, FormName, FormContacts },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      ticketId: {
        type: [String, Number],
        default: null
      }
    },
    async created () {
      if (this.ticketId) {
        await this.GET_USER_TICKET(this.ticketId);
        Object.keys(this.documents).forEach(type => {
          if (this.stateDocuments[type]) {
            this.documents[type] = this.stateDocuments[type];
          }
        });
      } else {
        await this.GET_USER_DOCUMENTS();
        Object.keys(this.documents).forEach(type => {
          if (this.getDocuments[type]) {
            this.documents[type] = this.getDocuments[type];
          }
        });
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
        neighbors: [],
        documents: {
          passport: null,
          snils: null,
          inn: null,
          job: null,
          job_petition: null
        },
        contacts: {
          phones: []
        },
        rooms: []
      };
    },
    computed: {
      ...mapGetters("user/documents", ["getDocuments"]),
      ...mapState("user/tickets/living", {
        stateDocuments: state => state.current.documents
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/living/${ GET_USER_TICKET }`] ||
          this.$store.state.wait[`user/documents/${ GET_USER_DOCUMENTS }`];
      },

      isTicketCreating () {
        return this.$store.state.wait[`user/tickets/living/${ CREATE_USER_TICKET_LIVING }`];
      },

      isValid () {
        return this.isUserInfo && this.isAdditionalInfo && this.familyDone && !this.ticketId;
      },

      isUserInfo () {
        return !!this.name.first && Object.values(this.documents).every(isDocumentPresent);
      },

      isFamilyInfo () {
        return this.neighbors.length > 0;
      },

      familyDone () {
        return this.isFamilyInfo ? this.neighbors.map(neighbor => {
          return neighbor.name.first && Object.values(neighbor.documents).every(isDocumentPresent);
        }).every(val => val) : true;
      },

      isAdditionalInfo () {
        return !!this.contacts.phones[0]
          && !!this.rooms;
      }
    },
    methods: {
      ...mapActions("user/tickets/living", {
        createUserTicket: CREATE_USER_TICKET_LIVING,
        addUserTicketFile: ADD_USER_TICKET_FILE_LIVING,
        GET_USER_TICKET,
        ADD_USER_TICKET_NEIGHBOR
      }),
      ...mapActions("user/documents", [
        GET_USER_DOCUMENTS
      ]),

      closeModal () {
        this.$emit("update");
        this.$emit("input", false);
      },

      toggleModal (value) {
        this.$emit("input", value);
      },

      async createLivingTicket () {
        try {
          const payload = {
            name: this.name,
            contacts: this.contacts,
            rooms: this.rooms
          };
          const { id } = await this.createUserTicket(payload);
          await this.addFiles(id);
          await this.addNeighbors(id);
          this.$q.notify({
            type: "positive",
            message: this.$t("user.tickets.messages.create.success.title")
          });
        } catch (e) {
          this.$q.notify({
            type: "negative",
            message: e
          });
        }
        this.closeModal();
      },

      async addNeighbors (id) {
        await Promise.all(this.neighbors.map(async n => {
          await this.ADD_USER_TICKET_NEIGHBOR({ ticketId: id, payload: n });
        }));
      },

      async addFiles (id) {
        const items = [
          ...this.documents.passport.map(file => ({
            file,
            typeId: 1
          })),
          ...this.documents.inn.map(file => ({
            file,
            typeId: 2
          })),
          ...this.documents.snils.map(file => ({
            file,
            typeId: 13
          })),
          ...this.documents.job.map(file => ({
            file,
            typeId: 3
          })),
          ...this.documents.job_petition.map(file => ({
            file,
            typeId: 10
          }))
        ];

        await Promise.all(items.map(async item => {
          const payload = new FormData();

          await payload.append("file", item.file);
          await payload.append("typeId", item.typeId);

          await this.addUserTicketFile({ id, payload });
        }));
      }
    }
  };
</script>

<style scoped>

</style>
