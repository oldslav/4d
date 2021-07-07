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
          FilePicker(:max-files="5" v-model="documents.passport" :label="$t('entity.files.passport')").q-mt-sm
          FilePicker(v-model="documents.snils" :label="$t('entity.files.snils')").q-mt-sm

          q-stepper-navigation
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")
        q-step(
          title="Данные об авто"
          :done="step > 2"
          :error="!isUserInfo && step > 2"
          :name="2"
          icon="directions_car"
        )
          TicketVehicle(v-model="vehicle")
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
          p
            | {{ $t("entity.services.parking.rentTypes.description") }}

          q-list
            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="rentOption" val="1" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.short.title") }}
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.short.price.title") }}
              template(v-else)
                q-item-section
                 q-item-label {{ $t("entity.services.parking.rentTypes.short.title") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.short.price.title") }}

            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="rentOption" val="2" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.mid.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.mid.description") }}
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.mid.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.mid.price.description") }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.mid.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.mid.description") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.mid.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.mid.price.description") }}

            q-item(tag="label" v-ripple)
              q-item-section(avatar)
                q-radio(v-model="rentOption" val="3" dense)
              template(v-if="isMobile")
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.long.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.long.description") }}
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.long.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.long.price.description") }}
              template(v-else)
                q-item-section
                  q-item-label {{ $t("entity.services.parking.rentTypes.long.title") }}
                  q-item-label(caption) {{ $t("entity.services.parking.rentTypes.long.description") }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t("entity.services.parking.rentTypes.long.price.title") }}
                  q-item-label(caption).text-primary {{ $t("entity.services.parking.rentTypes.long.price.description") }}

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
  import { CREATE_USER_TICKET_PARKING } from "@/store/constants/action-constants";
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import FilePicker from "../../common/FilePicker";
  import FormName from "components/common/form/FormName";
  import VehicleForm from "../../forms/documents/VehicleForm";
  import FormContacts from "@/components/common/form/FormContacts";
  import TicketVehicle from "components/common/TicketVehicle";

  export default {
    name: "NewParkingTicket",
    components: { VehicleForm, FormContacts, TicketVehicle, BaseInput, FilePicker, BaseModal, FormName },
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
        documents: {
          passport: null,
          snils: null
        },
        contacts: {
          phones: []
        },
        rentOption: null
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

      isUserInfo () {
        return !!this.name.first
          && !!this.name.last
          && !!this.vehicle
          && !!this.documents.passport
          && !!this.documents.snils;
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", [CREATE_USER_TICKET_PARKING]),

      createParkingTicket () {
        const documents = { ...this.documents, ...this.vehicle.documents };
        const vehicle = ({ documents, ...rest }) => rest;
        const { parkingPlaceId, name, rentOption, contacts } = this;
        return this.CREATE_USER_TICKET_PARKING({ parkingPlaceId, name, documents, vehicle: vehicle(this.vehicle), contacts, priceId: rentOption })
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
