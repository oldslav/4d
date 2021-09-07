<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="onInput"
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
            q-btn(@click="onSubmit()" color="primary" :label="$t('action.create')" :disable="!isValid" :loading="isTicketCreating")
</template>

<script>
  import { cloneDeep } from "lodash";
  import { mapActions, mapGetters, mapState } from "vuex";
  import {
    CREATE_USER_TICKET_LIVING,
    GET_USER_DOCUMENTS,
    GET_USER_TICKET, REQUEST_APPROVAL_LIVING, UPDATE_TICKET
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
      await this.GET_USER_DOCUMENTS();
      if (this.ticketId) {
        await this.GET_USER_TICKET(this.ticketId);
        const { name, neighbors, documents, contacts, rooms } = this.getCurrentTicket;
        Object.assign(this.$data, cloneDeep({
          name,
          neighbors,
          documents,
          contacts,
          rooms
        }));
        // Object.keys(this.documents).forEach(type => {
        //   if (this.stateDocuments[type]) {
        //     this.documents[type] = this.stateDocuments[type];
        //   }
        // });
      } else {
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
      ...mapGetters("user/tickets/living", ["getCurrentTicket"]),
      ...mapState("user/tickets/living", {
        stateDocuments: state => state.current.documents
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/living/${ GET_USER_TICKET }`] ||
          this.$store.state.wait[`user/documents/${ GET_USER_DOCUMENTS }`] ||
          this.$store.state.wait[`user/tickets/living/${ REQUEST_APPROVAL_LIVING }`] ||
          this.$store.state.wait[`user/tickets/living/${ CREATE_USER_TICKET_LIVING }`];
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
        CREATE_USER_TICKET_LIVING,
        GET_USER_TICKET,
        REQUEST_APPROVAL_LIVING,
        UPDATE_TICKET
      }),
      ...mapActions("user/documents", [
        GET_USER_DOCUMENTS
      ]),

      closeModal () {
        this.$emit("update");
        this.$emit("input", false);
      },

      onInput (value) {
        this.$q.dialog({
          message: "Сохранить введённые данные?",
          persistent: true,
          ok: "Сохранить",
          cancel: "Отменить"
        })
          .onOk(async () => {
            await this.submitLivingTicket();
            this.closeModal();
          })
          .onCancel(() => {
            this.toggleModal(value);
          });
      },

      toggleModal (value) {
        this.$emit("input", value);
      },

      async onSubmit () {
        const id = await this.submitLivingTicket();
        await this.REQUEST_APPROVAL_LIVING(id);
        this.closeModal();
      },

      async submitLivingTicket () {
        const payload = {
          name: this.name,
          contacts: this.contacts,
          rooms: this.rooms,
          documents: this.documents,
          neighbors: this.neighbors
        };

        const action = !!this.ticketId ? this.updateLivingTicket : this.createLivingTicket;

        try {
          const id = await action.call(this, payload);
          this.$q.notify({
            type: "positive",
            message: this.$t("user.tickets.messages.create.success.title")
          });
          return id;
        } catch (e) {
          this.$q.notify({
            type: "negative",
            message: e
          });
        }
      },

      createLivingTicket (payload) {
        return this.CREATE_USER_TICKET_LIVING(payload);
      },

      updateLivingTicket (payload) {
        const { ticketId } = this;
        return this.UPDATE_TICKET({ ticketId, payload });
      }
    }
  };
</script>

<style scoped>

</style>
