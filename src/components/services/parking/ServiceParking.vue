<template lang="pug">
  q-page.q-pa-lg.bg-white
    BaseSelect(
      v-model="buildingId"
      :options="buildings"
      label="Выберите здание"
      @input="onBuildingChange"
      outlined
    )

    ParkingPlaceModal(
      v-model="isParkingPlaceModal"
      @update="onParkingPlaceChange"
    )
    NewParkingTicket(
      v-model="isNewTicketModal"
      v-if="parkingPlaceId"
      :parkingPlaceId="parkingPlaceId"
      @update="onTicketChange"
    )
</template>

<script>
  import ParkingPlacesScheme from "../../../assets/svg/ParkingPlacesScheme";
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import BaseSelect from "../../common/BaseSelect";
  import FilePicker from "../../common/FilePicker";
  import Vehicles from "../../user/documents/Vehicles";
  import NewParkingTicket from "./NewParkingTicket";
  import ParkingPlaceModal from "./ParkingPlaceModal";

  export default {
    name: "ServiceParking",
    components: { ParkingPlaceModal, NewParkingTicket, ParkingPlacesScheme, Vehicles, FilePicker, BaseInput, BaseModal, BaseSelect },
    data () {
      return {
        isNewTicketModal: false,
        isParkingPlaceModal: false,
        buildingId: null,
        parkingPlaceId: null,
        buildings: [1, 2, 3]
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
        this.isNewTicketModal = Boolean(value);
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
