<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="closeModal"
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
          autocomplete
          :inputDebounce="300"
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
      },
      parkingPlaces: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        parkingPlace: null
      };
    },
    methods: {
      closeModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.call(this));
      },

      onParkingPlaceChange (value) {
        this.$emit("update", value);
      }
    }
  };
</script>

<style scoped>

</style>
