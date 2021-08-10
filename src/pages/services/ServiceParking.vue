<template lang="pug">
  div
    ModalSuccess(v-model="isTicketSuccess")
    ModalFail(v-model="isTicketFail")

    ParkingHoverModal(
      v-if="pickedFeature"
      v-model="isEntityHoverModal"
      :data="pickedFeature"
      @selected="onParkingChange"
    )
    ParkingPlaceModal(
      v-model="isParkingPlaceModal"
      :parkingPlaces="parkingPlaces"
      @update="onParkingPlaceChange"
    )
    template(v-if="parkingPlaceId")
      NewParkingTicket(
        v-model="isNewTicketModal"
        :parkingPlaceId="parkingPlaceId"
        @update="onTicketChange"
        @success="showSuccessPopup"
        @fail="showFailPopup"
      )
      NewGuestParkingTicket(
        v-model="isGuestTicketModal"
        :parkingPlaceId="parkingPlaceId"
        @update="onTicketChange"
        @success="showSuccessPopup"
        @fail="showFailPopup"
      )
      NewSocialParkingTicket(
        v-model="isSocialTicketModal"
        :parkingPlaceId="parkingPlaceId"
        @update="onTicketChange"
        @success="showSuccessPopup"
        @fail="showFailPopup"
      )
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
  import {
    GET_PARKING_GEO,
    GET_PARKING_BUILDINGS,
    GET_PARKING_PLACES, GET_USER_DOCUMENTS, GET_REFERENCES
  } from "@/store/constants/action-constants";
  import { SET_FEATURE_ID, SET_PARKING_PLACE } from "@/store/constants/mutation-constants";
  import BaseSelect from "../../components/common/BaseSelect";
  import ParkingHoverModal from "../../components/services/ParkingHoverModal";
  import NewGuestParkingTicket from "../../components/services/parking/NewGuestParkingTicket";
  import NewParkingTicket from "../../components/services/parking/NewParkingTicket";
  import NewSocialParkingTicket from "../../components/services/parking/NewSocialParkingTicket";
  import ParkingPlaceModal from "../../components/services/parking/ParkingPlaceModal";
  import ModalFail from "../../components/services/ModalFail";
  import ModalSuccess from "../../components/services/ModalSuccess";

  export default {
    name: "ServiceParking",
    components: {
      ParkingHoverModal,
      NewSocialParkingTicket,
      NewGuestParkingTicket,
      ParkingPlaceModal,
      NewParkingTicket,
      BaseSelect,
      ModalFail,
      ModalSuccess
    },
    async created () {
      await Promise.all([this.GET_PARKING_GEO(), this.GET_USER_DOCUMENTS(), this.GET_REFERENCES()]);
    },
    data () {
      return {
        isNewTicketModal: false,
        isGuestTicketModal: false,
        isSocialTicketModal: false,
        isParkingPlaceModal: false,
        buildings: [],
        rentType: null,
        isTicketSuccess: false,
        isTicketFail: false
      };
    },
    computed: {
      ...mapState("services", {
        buildingId: state => state.pickedFeatureId
      }),

      ...mapState("services/parking", {
        pickedParkingPlace: state => state.pickedParkingPlace,
        parkingPlaces: state => state.parkingPlaces || []
      }),

      ...mapGetters("services", [
        "pickedFeature"
      ]),

      isEntityHoverModal: {
        set () {
          this.SET_FEATURE_ID(null);
        },

        get () {
          return Boolean(this.buildingId);
        }
      },

      parkingPlaceId: {
        set (value) {
          this.SET_PARKING_PLACE(value);
        },

        get () {
          return this.pickedParkingPlace;
        }
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      ...mapMutations("services/parking", [
        SET_PARKING_PLACE
      ]),

      ...mapActions("services", [
        GET_PARKING_GEO
      ]),

      ...mapActions("services/parking", [
        GET_PARKING_BUILDINGS,
        GET_PARKING_PLACES
      ]),

      ...mapActions("user/documents", [GET_USER_DOCUMENTS]),
      ...mapActions("references", [GET_REFERENCES]),

      onParkingChange (value) {
        this.rentType = value;
        this.isParkingPlaceModal = true;
      },

      onParkingPlaceChange (value) {
        this.parkingPlaceId = value;
        this.isParkingPlaceModal = false;

        if (this.rentType === "Common") {
          this.isNewTicketModal = Boolean(value);
        } else if (this.rentType === "Guest") {
          this.isGuestTicketModal = Boolean(value);
        } else {
          this.isSocialTicketModal = Boolean(value);
        }
      },

      onTicketChange (value) {
        if (value) {
          this.buildingId = null;
          this.parkingPlaceId = null;
          this.isParkingPlaceModal = false;
          this.isNewTicketModal = false;
        } else {
          this.isParkingPlaceModal = true;
        }
      },

      showSuccessPopup () {
        this.isTicketSuccess = true;
      },

      showFailPopup () {
        this.isTicketFail = true;
      }
    },
    watch: {
      async buildingId (value) {
        if (value) {
          await this.GET_PARKING_PLACES();
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
