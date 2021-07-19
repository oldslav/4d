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
        keep-alive
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :error="!isUserInfo && step > 1"
          :name="1"
          icon="edit"
        )
          FormName(v-model="name")
          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Данные об авто"
          :done="step > 2"
          :error="!isCarInfo && step > 2"
          :name="2"
          icon="directions_car"
        )
          TicketVehicle(v-model="vehicle")
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Срок аренды"
          :done="step > 3"
          :error="!isDate && step > 3"
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
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
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
            q-btn(@click="step--" color="primary" :label="$t('action.back')")
            q-btn(@click="createParkingTicket" color="primary" :label="$t('action.create')" :disable="!isValid")
</template>

<script>
  import { mapActions } from "vuex";
  import { CREATE_USER_TICKET_PARKING } from "@/store/constants/action-constants";
  import moment from "moment";
  import BaseDatepicker from "../../common/BaseDatepicker";
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import FilePicker from "../../common/FilePicker";
  import FormName from "components/common/form/FormName";
  import FormContacts from "../../common/form/FormContacts";
  import TicketVehicle from "components/common/TicketVehicle";

  export default {
    name: "NewGuestParkingTicket",
    components: { FormName, FormContacts, BaseDatepicker, TicketVehicle, BaseInput, FilePicker, BaseModal },
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
        vehicle: null,
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
        return this.isUserInfo && this.isCarInfo && this.isDate;
      },

      isCarInfo () {
        return !!this.vehicle
          && this.vehicle.type
          && this.vehicle.brand
          && this.vehicle.model
          && this.vehicle.number
          && this.vehicle.documents.pts.length > 0
          && this.vehicle.documents.sts.length > 0;
      },

      isDate () {
        return !!this.period
          && this.isGuestCard !== null;
      },

      isUserInfo () {
        return !!this.name.first;
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", [CREATE_USER_TICKET_PARKING]),
      createParkingTicket () {
        const { documents, ...vehicle } = this.vehicle;
        const { parkingPlaceId, name, isGuestCard, period, contacts } = this;
        return this.CREATE_USER_TICKET_PARKING({
          parkingPlaceId,
          name,
          documents,
          vehicle,
          contacts,
          guestCard: isGuestCard,
          startDate: period.from,
          endDate: period.to
        })
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
