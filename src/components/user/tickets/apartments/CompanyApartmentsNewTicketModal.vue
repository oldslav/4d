<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
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
          title="Основная информация"
          :name="1"
          :done="step > 1"
          :error="!stepOneDone && step > 1"
          icon="edit"
        )
          FormName(v-model="name")
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Информация об организации"
          :name="2"
          :done="step > 2"
          :error="!stepTwoDone && step > 2"
          icon="business"
        )
          q-input(v-model="companyName" :label="$t('user.companyName')")
          q-input(v-model="companyAddress" :label="$t('common.address')")
          q-input(v-model="jobPosition" :label="$t('common.position')")
          MyDocumentsForm(is-local v-model="documents").q-mt-md
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
            q-btn(@click="createTicket()" color="primary" :label="$t('action.create')" :disable="!formValid")
</template>

<script>
  import { mapActions } from "vuex";
  import { CREATE_LEGAL_TICKET_LIVING } from "@/store/constants/action-constants";
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
        documents: {
          inn: null,
          ogrn: null
        },
        rooms: [],
        jobPosition: null,
        companyName: null,
        companyAddress: null
      };
    },
    computed: {
      stepOneDone () {
        return !!this.name.first
          && !!this.name.last;
      },
      stepTwoDone () {
        return !!this.jobPosition
          && !!this.companyName
          && !!this.companyAddress
          && !!this.documents.inn
          && !!this.documents.ogrn;
      },
      stepThreeDone () {
        return !!this.rooms.length && !!this.contacts.phones[0];
      },
      formValid () {
        return this.stepOneDone && this.stepTwoDone && this.stepThreeDone;
      }
    },
    methods: {
      ...mapActions("user/tickets/living", [CREATE_LEGAL_TICKET_LIVING]),
      toggleModal (val) {
        this.$emit("input", val);
        Object.assign(this.$data, this.$options.data.apply(this));
      },
      createTicket () {
        const { name, contacts, documents, rooms, jobPosition, companyName, companyAddress } = this;
        return this.CREATE_LEGAL_TICKET_LIVING({
          name,
          contacts,
          documents,
          rooms,
          jobPosition,
          companyName,
          companyAddress
        }).then(() => {
          this.$q.notify({
            type: "positive",
            message: this.$t("user.tickets.messages.create.success.title")
          });
          this.$emit("update");
          this.toggleModal(false);
        }).catch((e) => {
          this.$q.notify({
            type: "negative",
            message: e
          });
        });
      }
    }
  };
</script>
