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
          MyDocumentsForm(is-local v-model="documents" all-required attached-documents)
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
          :error="!socialType && step > 3"
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
            q-btn(@click="createParkingTicket" color="primary" :label="$t('action.create')" :disable="!isValid" :loading="isLoading")
</template>

<script>
  import { mapActions } from "vuex";
  import { CREATE_USER_TICKET_PARKING } from "@/store/constants/action-constants";
  import { isDocumentPresent } from "@/util/validators";
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import FilePicker from "../../common/FilePicker";
  import FormName from "components/common/form/FormName";
  import FormContacts from "../../common/form/FormContacts";
  import TicketVehicle from "components/common/TicketVehicle";
  import MyDocumentsForm from "components/forms/documents/MyDocumentsForm";

  export default {
    name: "NewSocialParkingTicket",
    components: { MyDocumentsForm, TicketVehicle, FormName, FormContacts, BaseInput, FilePicker, BaseModal },
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
          social_confirm: null,
          passport: null
        },
        contacts: {
          phones: []
        },
        socialType: null
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
        return this.isUserInfo && this.isCarInfo && !!this.socialType;
      },

      isCarInfo () {
        return !!this.vehicle
          && this.vehicle.type
          && this.vehicle.brand
          && this.vehicle.model
          && this.vehicle.number
          && isDocumentPresent(this.vehicle.documents.sts);
      },

      isUserInfo () {
        return !!this.name.first && Object.values(this.documents).every(isDocumentPresent);
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", [CREATE_USER_TICKET_PARKING]),

      createParkingTicket () {
        const documents = { ...this.documents, ...this.vehicle.documents };
        const vehicle = ({ documents, ...rest }) => rest;
        const { parkingPlaceId, name, socialType, contacts } = this;
        return this.CREATE_USER_TICKET_PARKING({
          parkingPlaceId,
          name,
          documents,
          vehicle: vehicle(this.vehicle),
          contacts,
          personCategoryId: socialType
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
