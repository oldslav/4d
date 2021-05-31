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
  import BaseSelect from "../../components/common/BaseSelect";
  import NewGuestParkingTicket from "../../components/services/parking/NewGuestParkingTicket";
  import NewParkingTicket from "../../components/services/parking/NewParkingTicket";
  import NewSocialParkingTicket from "../../components/services/parking/NewSocialParkingTicket";
  import ParkingPlaceModal from "../../components/services/parking/ParkingPlaceModal";

  export default {
    name: "ServiceWarehouse",
    components: { ParkingPlaceModal, BaseSelect, NewParkingTicket, NewGuestParkingTicket, NewSocialParkingTicket },
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
