<template lang="pug">
  q-page.q-pa-lg.bg-white
    ModalSuccess(v-model="isTicketSuccess")
    ModalFail(v-model="isTicketFail")
    .q-gutter-md
      BaseSelect(
        v-model="rentType"
        :options="rentTypes"
        :label="$t('action.select.parking.type')"
        outlined
      )
      BaseSelect(
        v-model="buildingId"
        :disable="!rentType"
        :options="filteredBuildingsID"
        :label="$t('action.select.building')"
        @input="onBuildingChange"
        outlined
      )

    ParkingPlaceModal(
      v-model="isParkingPlaceModal"
      :parkingPlacesID="parkingPlacesID"
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
  import { mapActions } from "vuex";
  import BaseSelect from "../../components/common/BaseSelect";
  import NewGuestParkingTicket from "../../components/services/parking/NewGuestParkingTicket";
  import NewParkingTicket from "../../components/services/parking/NewParkingTicket";
  import NewSocialParkingTicket from "../../components/services/parking/NewSocialParkingTicket";
  import ParkingPlaceModal from "../../components/services/parking/ParkingPlaceModal";
  import ModalFail from "../../components/services/ModalFail";
  import ModalSuccess from "../../components/services/ModalSuccess";
  import { GET_USER_PARKING_BUILDINGS, GET_USER_PARKING_PLACES } from "../../store/constants/action-constants";

  export default {
    name: "ServiceParking",
    components: { NewSocialParkingTicket, NewGuestParkingTicket, ParkingPlaceModal, NewParkingTicket, BaseSelect, ModalFail, ModalSuccess },
    async mounted () {
      const data = await this.GET_USER_PARKING_BUILDINGS();
      this.buildings = data.data.features;
    },
    data () {
      return {
        isNewTicketModal: false,
        isGuestTicketModal: false,
        isSocialTicketModal: false,
        isParkingPlaceModal: false,
        buildingId: null,
        parkingPlaceId: null,
        buildings: [],
        parkingPlacesID: [],
        rentType: null,
        rentTypes: [
          "Guest",
          "Common",
          "Social"
        ],
        isTicketSuccess: false,
        isTicketFail: false
      };
    },
    computed: {
      filteredBuildingsID () {
        if (this.rentType === "Social") {
          const filteredBuildings = this.buildings.filter(building => building.properties.free > 0 && building.properties.parking_places_type === "Льготное");
          return filteredBuildings.map(building => building.id);
        } else {
          const filteredBuildings = this.buildings.filter(building => building.properties.free > 0 && building.properties.parking_places_type === "Обычное");
          return filteredBuildings.map(building => building.id);
        }
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", [
        GET_USER_PARKING_BUILDINGS,
        GET_USER_PARKING_PLACES
      ]),

      async onBuildingChange (value) {
        const parkingPlaces = await this.GET_USER_PARKING_PLACES(value);
        this.parkingPlacesID = parkingPlaces.data.items.map(place => place.id);
        this.buildingId = value;
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

      toggleTicketModal (value) {
        if (!value) {
          this.parkingPlace = null;
        }
      },

      showSuccessPopup () {
        this.isTicketSuccess = true;
      },
      showFailPopup () {
        this.isTicketFail = true;
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
