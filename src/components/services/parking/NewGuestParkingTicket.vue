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
            BaseInput(v-model="name.last" :label="$t('user.lastName')" clearable).col-12.col-sm-6.col-md-4
            BaseInput(v-model="name.first" :label="$t('user.firstName')" clearable).col-12.col-sm-6.col-md-4
            BaseInput(v-model="name.patronymic" :label="$t('user.patronymic')" clearable).col-12.col-sm-6.col-md-4

          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Данные об авто"
          :done="step > 2"
          :error="!isUserInfo && step > 2"
          :name="2"
          icon="directions_car"
        )
          VehicleForm(v-model="vehicle" unmanaged)
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
          .row
            BaseDatepicker(
              v-model="period"
              :options="dateOptions"
            ).col-12

            q-list.col-12
              q-item(tag="label" v-ripple)
                q-item-section(avatar)
                  q-radio(v-model="isGuestCard" :val="false" dense)
                q-item-section
                  q-item-label {{ $t("entity.guestCard.necessary.false") }}

              q-item(tag="label" v-ripple)
                q-item-section(avatar)
                  q-radio(v-model="isGuestCard" :val="true" dense)
                q-item-section
                  q-item-label {{ $t("entity.guestCard.necessary.true") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.guestCard.price") }}

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
  import { mapActions } from "vuex";
  import moment from "moment";
  import BaseDatepicker from "../../common/BaseDatepicker";
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import FilePicker from "../../common/FilePicker";
  import FormContacts from "../../common/form/FormContacts";
  import VehicleForm from "../../forms/documents/VehicleForm";
  import Vehicles from "../../user/documents/Vehicles";
  import { CREATE_USER_TICKET_PARKING } from "@/store/constants/action-constants";

  export default {
    name: "NewGuestParkingTicket",
    components: { FormContacts, BaseDatepicker, VehicleForm, Vehicles, BaseInput, FilePicker, BaseModal },
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
        name: {
          first: null,
          last: null,
          patronymic: null
        },
        documents: {
          passport: null,
          snils: null
        },
        vehicle: {
          type: null,
          brand: null,
          model: null,
          number: null,
          documents: {
            pts: null,
            sts: null
          }
        },
        contacts: {
          phones: []
        },
        telegram: null,
        isGuestCard: null,
        period: null,
        dateOptions: date => moment(date).diff(moment(), "days") >= 0 && moment(date).diff(moment(), "days") <= 30
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/tickets/parking/${ CREATE_USER_TICKET_PARKING }`];
      },

      isMobile () {
        return this.$q.platform.is.mobile;
      },

      isValid () {
        return this.isUserInfo && this.isCarInfo;
      },

      isCarInfo () {
        return !!this.name.first
          && !!this.name.last
          && !!this.vehicle;
      },

      isDate () {
        return !!this.period
          && this.isGuestCard !== null;
      },

      isUserInfo () {
        return !!this.name.first
          && !!this.name.last
          && !!this.vehicle;
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", [CREATE_USER_TICKET_PARKING]),

      moment,

      createParkingTicket () {
        const { parkingPlaceId, name, documents, vehicle, isGuestCard, period, contacts } = this;
        return this.CREATE_USER_TICKET_PARKING({ parkingPlaceId, name, documents, vehicle, contacts, guestCard: isGuestCard, startDate: period.from, endDate: period.to })
          .then(() => {
            this.$emit("success");
          })
          .catch(() => {
            this.$emit("fail");
          })
          .finally(() => {
            this.updateModal(true);
          });
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
