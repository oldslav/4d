<template lang="pug">
  q-dialog(
    :value="value"
    @hide="closeModal"
    transition-show="fade"
    transition-hide="fade"
  )
    q-card.full-width
      q-stepper(
        ref="stepper"
        v-model="step"
        color="primary"
        flat
        animated
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :error="!isUserInfo && step > 1"
          :name="1"
        )
          div.row.q-gutter-md
            BaseInput(v-model="lastname" :label="$t('user.lastName')" clearable).col
            BaseInput(v-model="firstname" :label="$t('user.firstName')" clearable).col
            BaseInput(v-model="patronymic" :label="$t('user.patronymic')" clearable).col
          FilePicker(:max-files="5" v-model="passport" :label="$t('entity.files.passportCopy')").q-mt-sm
          FilePicker(v-model="snils" :label="$t('entity.files.snilsCopy')").q-mt-sm
          FilePicker(v-model="inn" :label="$t('entity.files.innCopy')").q-mt-sm
          FilePicker(v-model="job" :label="$t('entity.files.workCertificate')").q-mt-sm
          FilePicker(v-model="employerPetition" :label="$t('entity.files.employerPetition')").q-mt-sm

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
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
        q-step(
          title="Контакты"
          :error="!isAdditionalInfo && step > 3"
          :name="3"
        )
          q-checkbox(v-model="rooms" val="1" color="primary" label="1 Комната")
          q-checkbox(v-model="rooms" val="2" color="primary" label="2 Комнаты")
          q-checkbox(v-model="rooms" val="3" color="primary" label="3 Комнаты")

          BaseInput(v-model="phone" :label="$t('entity.contacts.phone')" clearable).col

          q-stepper-navigation.q-gutter-md
            q-btn(@click="createLivingTicket" color="primary" :label="$t('action.create')" :disable="!isValid")
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
</template>

<script>
  import { mapActions } from "vuex";
  import {
    ADD_USER_TICKET_FILE,
    CREATE_USER_TICKET
  } from "../../../../store/constants/action-constants";
  import BaseInput from "../../../common/BaseInput";
  import BaseModal from "../../../common/BaseModal";
  import FilePicker from "../../../common/FilePicker";
  import Neighbors from "../../documents/Neighbors";

  export default {
    name: "UserTicketsApartmentsNewTicketModal",
    components: { Neighbors, FilePicker, BaseInput, BaseModal },
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
    created () {
      this.$watch("data", val => {
        if (val) {
          const {
            name: {
              first,
              last,
              patronymic
            },
            contacts: {
              phones
            }
          } = val;

          this.firstname = first;
          this.lastname = last;
          this.patronymic = patronymic;
          this.phone = phones[0];
        }
      });
    },
    data () {
      return {
        step: 1,
        neighbors: {},
        firstname: null,
        lastname: null,
        patronymic: null,
        passport: null,
        snils: null,
        inn: null,
        job: null,
        employerPetition: null,
        phone: null,
        telegram: null,
        rooms: []
      };
    },
    computed: {
      isValid () {
        return this.isUserInfo && this.isAdditionalInfo;
      },

      isUserInfo () {
        return !!this.firstname
          && !!this.lastname
          && !!this.passport
          && !!this.snils
          && !!this.inn
          && !!this.job
          && !!this.employerPetition;
      },

      isFamilyInfo () {
        return !!this.neighbors;
      },

      isAdditionalInfo () {
        return !!this.phone
          && !!this.rooms;
      },

      items () {
        return [
          ...this.passport.map(item => ({
            file: item,
            typeId: 1
          })),
          ...this.inn.map(item => ({
            file: item,
            typeId: 2
          })),
          ...this.snils.map(item => ({
            file: item,
            typeId: 13
          })),
          ...this.job.map(item => ({
            file: item,
            typeId: 3
          })),
          ...this.employerPetition.map(item => ({
            file: item,
            typeId: 10
          }))
        ].map(item => {
          const payload = new FormData();

          payload.append("file", item.file);
          payload.append("typeId", item.typeId);

          return payload;
        });
      }
    },
    methods: {
      ...mapActions("user/userTickets", {
        createUserTicket: CREATE_USER_TICKET,
        addUserTicketFile: ADD_USER_TICKET_FILE
      }),

      closeModal () {
        this.$emit("input", false);
      },

      updateModal () {
        this.$emit("update");
      },

      async createLivingTicket () {
        const payload = {
          name: {
            first: this.firstname,
            last: this.lastname,
            patronymic: this.patronymic
          },
          contacts: {
            phones: [this.phone]
          },
          rooms: this.rooms
        };

        const { id } = await this.createUserTicket(payload);
        await this.addFiles(id);
        this.updateModal();
        this.closeModal();
      },

      async addFiles (id) {
        const items = [
          ...this.passport.map(item => ({
            file: item,
            typeId: 1
          })),
          ...this.inn.map(item => ({
            file: item,
            typeId: 2
          })),
          ...this.snils.map(item => ({
            file: item,
            typeId: 13
          })),
          ...this.job.map(item => ({
            file: item,
            typeId: 3
          })),
          ...this.employerPetition.map(item => ({
            file: item,
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
