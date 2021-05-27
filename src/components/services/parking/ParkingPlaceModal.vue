<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.modal-container
      q-card-section
        ParkingPlacesScheme
      q-card-section
        BaseSelect(
          v-model="parkingPlace"
          :options="parkingPlaces"
          :label="$t('action.select.parking.lot')"
          @input="onParkingPlaceChange"
          outlined
        )
</template>

<script>
  import ParkingPlacesScheme from "../../../assets/svg/ParkingPlacesScheme";
  import BaseModal from "../../common/BaseModal";
  import BaseSelect from "../../common/BaseSelect";
  export default {
    name: "ParkingPlaceModal",
    components: { BaseSelect, ParkingPlacesScheme, BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        parkingPlace: null,
        parkingPlaces: [1, 2, 3]
      };
    },
    methods: {
      toggleModal (value) {
        this.$emit("input", value);
      },

      onParkingPlaceChange (value) {
        this.$emit("update", value);
      }
    }
  };
</script>

<style scoped>

</style>
