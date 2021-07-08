<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
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
          //FilePicker(:max-files="5" v-model="passport" :label="$t('entity.files.passportCopy')").q-mt-sm
          //FilePicker(v-model="snils" :label="$t('entity.files.snilsCopy')").q-mt-sm
          //FilePicker(v-model="inn" :label="$t('entity.files.innCopy')").q-mt-sm
          //FilePicker(v-model="job" :label="$t('entity.files.workCertificate')").q-mt-sm
          //FilePicker(v-model="employerPetition" :label="$t('entity.files.employerPetition')").q-mt-sm
          MyDocumentsForm(v-model="documents" isLocal)

          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Семья"
          :done="step > 2"
          :error="!isFamilyInfo && step > 2"
          :name="2"
        )
          Neighbors(v-model="neighbors")
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :error="!isAdditionalInfo && step > 3"
          :name="3"
        )
          q-checkbox(v-model="rooms" val="1" color="primary" label="1 Комната")
          q-checkbox(v-model="rooms" val="2" color="primary" label="2 Комнаты")
          q-checkbox(v-model="rooms" val="3" color="primary" label="3 Комнаты")

          FormContacts(v-model="contacts").q-mt-sm

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="createLivingTicket" color="primary" :label="$t('action.create')" :disable="!isValid")
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    ADD_USER_TICKET_FILE_LIVING, CREATE_USER_TICKET_LIVING
  } from "@/store/constants/action-constants";
  import BaseInput from "../../../common/BaseInput";
  import BaseModal from "../../../common/BaseModal";
  import FilePicker from "../../../common/FilePicker";
  import Neighbors from "../../documents/Neighbors";
  import FormName from "components/common/form/FormName";
  import FormContacts from "components/common/form/FormContacts";
  import MyDocumentsForm from "../../../forms/documents/MyDocumentsForm";
  import { GET_USER_DOCUMENTS } from "../../../../store/constants/action-constants";

  export default {
    name: "UserTicketsApartmentsNewTicketModal",
    components: { MyDocumentsForm, Neighbors, FilePicker, BaseInput, BaseModal, FormName, FormContacts },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: null
      }
    },
    async created () {
      await this.GET_USER_DOCUMENTS();
      Object.keys(this.documents).forEach(type => {
        if (this.getDocuments[type]) {
          this.documents[type] = this.getDocuments[type];
        }
      });
      this.$watch("data", val => {
        if (val) {
          const {
            name
            // contacts: {
            //   phones
            // }
          } = val;

          this.name = name;
          // this.firstname = first;
          // this.lastname = last;
          // this.patronymic = patronymic;
          // this.phone = phones[0];
        }
      });
    },
    data () {
      return {
        step: 1,
        name: {
          first: "",
          last: "",
          patronymic: ""
        },
        neighbors: {},
        // firstname: null,
        // lastname: null,
        // patronymic: null,
        documents: {
          passport: null,
          snils: null,
          inn: null,
          job: null,
          employerPetition: null
        },
        contacts: {
          phones: [],
          telegram: null
        },
        rooms: []
      };
    },
    computed: {
      ...mapGetters("user/documents", ["getDocuments"]),

      isValid () {
        return this.isUserInfo && this.isAdditionalInfo;
      },

      isUserInfo () {
        return !!this.name.first
          && !!this.name.last
          && !!this.documents.passport
          && !!this.documents.snils
          && !!this.documents.inn
          && !!this.documents.job
          && !!this.documents.employerPetition;
      },

      isFamilyInfo () {
        return !!this.neighbors;
      },

      isAdditionalInfo () {
        return !!this.contacts.phones[0]
          && !!this.rooms;
      }
    },
    methods: {
      ...mapActions("user/tickets/living", {
        createUserTicket: CREATE_USER_TICKET_LIVING,
        addUserTicketFile: ADD_USER_TICKET_FILE_LIVING
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
        const payload = {
          name: this.name,
          contacts: this.contacts,
          rooms: this.rooms
        };
        const { id } = await this.createUserTicket(payload);
        await this.addFiles(id);
        this.closeModal();
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
          ...this.documents.employerPetition.map(file => ({
            file,
            typeId: 10
          }))
        ];

        console.log(items);

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
