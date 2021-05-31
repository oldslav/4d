<template lang="pug">
  q-page.q-pa-lg.bg-white
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
        :options="buildings"
        :label="$t('action.select.building')"
        @input="onBuildingChange"
        outlined
      )

    ParkingPlaceModal(
      v-model="isParkingPlaceModal"
      @update="onParkingPlaceChange"
    )
    template(v-if="parkingPlaceId")
      NewParkingTicket(
        v-model="isNewTicketModal"
        :parkingPlaceId="parkingPlaceId"
        @update="onTicketChange"
      )
      NewGuestParkingTicket(
        v-model="isGuestTicketModal"
        :parkingPlaceId="parkingPlaceId"
        @update="onTicketChange"
      )
      NewSocialParkingTicket(
        v-model="isSocialTicketModal"
        :parkingPlaceId="parkingPlaceId"
        @update="onTicketChange"
      )
</template>

<script>
  import BaseSelect from "../../common/BaseSelect";
  import NewGuestParkingTicket from "./NewGuestParkingTicket";
  import NewParkingTicket from "./NewParkingTicket";
  import NewSocialParkingTicket from "./NewSocialParkingTicket";
  import ParkingPlaceModal from "./ParkingPlaceModal";

  export default {
    name: "ServiceParking",
    components: { NewSocialParkingTicket, NewGuestParkingTicket, ParkingPlaceModal, NewParkingTicket, BaseSelect },
    data () {
      return {
        isNewTicketModal: false,
        isGuestTicketModal: false,
        isSocialTicketModal: false,
        isParkingPlaceModal: false,
        buildingId: null,
        parkingPlaceId: null,
        buildings: [1, 2, 3],

        rentType: null,
        rentTypes: [
          "Guest",
          "Common",
          "Social"
        ]
      };
    },
    methods: {
      onBuildingChange (value) {
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
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
