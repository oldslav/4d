<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="onInput"
    :loading="isLoading"
  )
    q-card.full-width
      q-stepper(
        v-model="step"
        color="primary"
        flat
        contracted
        animated
        keep-alive
      )
        q-step(
          title="Информация об организации"
          :name="1"
          :done="step > 1"
          :error="!stepOneDone && step > 1"
          icon="edit"
        )
          q-input(v-model="companyName" :label="$t('user.companyName')")
          q-input(v-model="companyAddress" :label="$t('common.address')")
          MyDocumentsForm(is-local v-model="companyDocuments" all-required).q-mt-md
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Информация о проживающем"
          :name="2"
          :done="step > 2"
          :error="!stepTwoDone && step > 2"
          icon="business"
        )
          FormName(v-model="name")
          q-input(v-model="jobPosition" :label="$t('common.position')")
          MyDocumentsForm(is-local v-model="userDocuments" all-required)
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :name="3"
          icon="call"
        )
          q-checkbox(v-model="rooms" val="1" color="primary" :label="$tc('entity.services.living.info.rooms', 1)")
          q-checkbox(v-model="rooms" val="2" color="primary" :label="$tc('entity.services.living.info.rooms', 2)")
          q-checkbox(v-model="rooms" val="3" color="primary" :label="$tc('entity.services.living.info.rooms', 3)")

          FormContacts(v-model="contacts").q-mt-sm
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="onSubmit()" color="primary" :label="$t('action.create')" :disable="!formValid" :loading="isTicketCreating")
</template>

<script>
  import { cloneDeep } from "lodash";
  import { mapActions, mapGetters } from "vuex";
  import {
    CREATE_LEGAL_TICKET_LIVING,
    GET_COMPANY,
    GET_LEGAL_TICKET,
    REQUEST_APPROVAL_LIVING, UPDATE_LEGAL_TICKET
  } from "@/store/constants/action-constants";
  import { isDocumentPresent } from "@/util/validators";
  import BaseModal from "components/common/BaseModal";
  import FormName from "components/common/form/FormName";
  import MyDocumentsForm from "components/forms/documents/MyDocumentsForm";
  import FormContacts from "components/common/form/FormContacts";

  export default {
    name: "CompanyApartmentsNewTicketModal",
    components: { FormContacts, MyDocumentsForm, FormName, BaseModal },
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
      await this.GET_COMPANY();
      if (this.ticketId) {
        await this.GET_LEGAL_TICKET(this.ticketId);
        const { name, contacts, documents, rooms, jobPosition, companyName, companyAddress } = this.getCurrentTicket;
        const { passport, inn, job_petition, consent_processing_personal_data, inn_jur, ogrn, egrjul, partner_card } = documents;
        Object.assign(this.$data, cloneDeep({
          name,
          contacts,
          rooms,
          jobPosition,
          companyName,
          companyAddress,
          userDocuments: { passport, inn, job_petition, consent_processing_personal_data },
          companyDocuments: { inn_jur, ogrn, egrjul, partner_card }
        }));
      } else {
        Object.assign(this.companyDocuments, cloneDeep(this.getCompanyCard.documents));
        this.companyName = this.getCompanyCard.name;
        this.companyAddress = this.getCompanyCard.legalAddress;
      }
    },
    data () {
      return {
        step: 1,
        name: {
          first: null,
          last: null,
          patronymic: null
        },
        contacts: {
          phones: []
        },
        userDocuments: {
          passport: null,
          inn: null,
          job_petition: null,
          consent_processing_personal_data: null
        },
        companyDocuments: {
          inn_jur: null,
          ogrn: null,
          egrjul: null,
          partner_card: null
        },
        rooms: [],
        jobPosition: null,
        companyName: null,
        companyAddress: null
      };
    },
    computed: {
      ...mapGetters("user/company", ["getCompanyCard"]),
      ...mapGetters("user/tickets/living", ["getCurrentTicket"]),
      stepTwoDone () {
        return !!this.name.first && !!this.jobPosition && Object.values(this.userDocuments).every(isDocumentPresent);
      },
      stepOneDone () {
        return !!this.companyName
          && !!this.companyAddress
          && Object.values(this.companyDocuments).every(isDocumentPresent);
      },
      stepThreeDone () {
        return !!this.rooms.length && !!this.contacts.phones[0];
      },
      formValid () {
        return this.stepOneDone && this.stepTwoDone && this.stepThreeDone;
      },
      isLoading () {
        return this.$store.state.wait[`user/company/${ GET_COMPANY }`] ||
          this.$store.state.wait[`user/tickets/living/${ GET_LEGAL_TICKET }`] ||
          this.$store.state.wait[`user/tickets/living/${ UPDATE_LEGAL_TICKET }`] ||
          this.$store.state.wait[`user/tickets/living/${ CREATE_LEGAL_TICKET_LIVING }`];
      },
      isTicketCreating () {
        return this.$store.state.wait[`user/tickets/living/${ CREATE_LEGAL_TICKET_LIVING }`] ||
          this.$store.state.wait[`user/tickets/living/${ REQUEST_APPROVAL_LIVING }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/living", [CREATE_LEGAL_TICKET_LIVING, REQUEST_APPROVAL_LIVING, GET_LEGAL_TICKET, UPDATE_LEGAL_TICKET]),
      ...mapActions("user/company", [GET_COMPANY]),
      toggleModal (val) {
        this.$emit("input", val);
        Object.assign(this.$data, this.$options.data.apply(this));
      },
      closeModal () {
        this.$emit("update");
        this.toggleModal(false);
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
      async onSubmit () {
        const id = await this.submitLivingTicket();
        await this.REQUEST_APPROVAL_LIVING(id);
        this.closeModal();
      },
      createTicket (payload) {
        return this.CREATE_LEGAL_TICKET_LIVING(payload);
      },
      updateTicket (payload) {
        const { ticketId } = this;
        return this.UPDATE_LEGAL_TICKET({ ticketId, payload });
      },
      async submitLivingTicket () {
        const { name, contacts, userDocuments, companyDocuments, rooms, jobPosition, companyName, companyAddress } = this;
        const payload = {
          name,
          contacts,
          documents: { ...userDocuments, ...companyDocuments },
          rooms,
          jobPosition,
          companyName,
          companyAddress
        };
        const action = !!this.ticketId ? this.updateTicket : this.createTicket;
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
      }
    }
  };
</script>
