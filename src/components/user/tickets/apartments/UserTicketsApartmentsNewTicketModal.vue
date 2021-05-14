<template lang="pug">
  q-dialog(
    :value="value"
    @hide="$emit('input', false)"
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
            q-btn(@click="step--" color="primary" :label="$t('action.goBack')")
        q-step(
          title="Контакты"
          :error="!isAdditionalInfo && step > 3"
          :name="3"
        )
          q-checkbox(v-model="rooms" val="1" color="primary" label="1 Комната")
          q-checkbox(v-model="rooms" val="2" color="primary" label="2 Комнаты")
          q-checkbox(v-model="rooms" val="3" color="primary" label="3 Комнаты")

          BaseInput(v-model="phone" :label="$t('entity.contacts.phone')" clearable).col
          BaseInput(v-model="telegram" :label="$t('entity.contacts.telegram')" clearable).col
          div.column
            h3.text-subtitle.q-my-sm Предпочтительный способ связи
            q-checkbox(v-model="pcm.phone" label="Телефон" size="sm")
            q-checkbox(v-model="pcm.email" label="Email" size="sm")
            q-checkbox(v-model="pcm.telegram" label="Telegram" size="sm")
            q-checkbox(v-model="pcm.whatsApp" label="WhatsApp" size="sm")

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
            q-btn(@click="step--" color="primary" :label="$t('action.goBack')")
</template>

<script>
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
      }
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
        rooms: [],
        pcm: {
          phone: false,
          email: false,
          telegram: false,
          whatsApp: false
        }
      };
    },
    computed: {
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
          && !!this.rooms
          && !!this.telegram;
      }
    }
  };
</script>

<style scoped>

</style>
