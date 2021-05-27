<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.modal-container
      q-stepper(
        ref="stepper"
        v-model="step"
        color="primary"
        contracted
        flat
        animated
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :error="!isUserInfo && step > 1"
          :name="1"
          icon="edit"
        )
          div.row.q-col-gutter-md
            BaseInput(v-model="lastname" :label="$t('user.lastName')" clearable).col-12.col-sm-6.col-md-4
            BaseInput(v-model="firstname" :label="$t('user.firstName')" clearable).col-12.col-sm-6.col-md-4
            BaseInput(v-model="patronymic" :label="$t('user.patronymic')" clearable).col-12.col-sm-6.col-md-4
          FilePicker(:max-files="5" v-model="passport" :label="$t('entity.files.passportCopy')").q-mt-sm
          FilePicker(v-model="snils" :label="$t('entity.files.snilsCopy')").q-mt-sm
          FilePicker(v-model="social" :label="$t('entity.files.social')").q-mt-sm

          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Данные об авто"
          :done="step > 2"
          :error="!isUserInfo && step > 2"
          :name="2"
          icon="directions_car"
        )
          VehicleForm(v-model="auto" unmanaged)
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Срок аренды"
          :done="step > 3"
          :error="!isUserInfo && step > 3"
          :name="3"
          icon="schedule"
        )
          p {{ $t("entity.socialTypes.title") }}

          q-list
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="socialType" val="1" dense)
              q-item-section
                q-item-label {{ $t("entity.socialTypes.largeFamily") }}
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="socialType" val="2" dense)
              q-item-section
                q-item-label {{ $t("entity.socialTypes.disability") }}
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="socialType" val="3" dense)
              q-item-section
                q-item-label {{ $t("entity.socialTypes.retired") }}
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="socialType" val="4" dense)
              q-item-section
                q-item-label {{ $t("entity.socialTypes.veteran") }}

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Контакты"
          :done="step > 4"
          :error="!isUserInfo && step > 4"
          :name="4"
          icon="contact_phone"
        )
          FormContacts(v-model="contacts")

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="createParkingTicket" color="primary" :label="$t('action.create')" :disable="!isValid")
</template>

<script>
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import FilePicker from "../../common/FilePicker";
  import FormContacts from "../../common/form/FormContacts";
  import VehicleForm from "../../forms/documents/VehicleForm";
  import Vehicles from "../../user/documents/Vehicles";

  export default {
    name: "NewSocialParkingTicket",
    components: { FormContacts, VehicleForm, Vehicles, BaseInput, FilePicker, BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      parkingPlaceId: {
        type: [String, Number],
        required: true
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
        social: null,
        auto: {
          type: null,
          brand: null,
          model: null,
          number: null,
          documents: {
            sts: [],
            pts: []
          }
        },
        contacts: {
          phone: null
        },
        telegram: null,
        socialType: null
      };
    },
    computed: {
      isMobile () {
        return this.$q.platform.is.mobile;
      },

      isValid () {
        return this.isUserInfo && this.isCarInfo;
      },

      isCarInfo () {
        return !!this.firstname
          && !!this.lastname
          && !!this.auto;
      },

      isUserInfo () {
        return !!this.firstname
          && !!this.lastname
          && !!this.auto;
      }
    },
    methods: {
      createParkingTicket () {
        this.updateModal(true);
      },

      toggleModal (value) {
        this.$emit("input", value);
        this.updateModal(value);
      },

      updateModal (value) {
        this.$emit("update", value);
      }
    }
  };
</script>

<style scoped>

</style>
