<template lang="pug">
  .q-pa-lg(style="height: calc(100vh - 50px)" v-if="componentInstance && geoJson")
    .col-12.column.justify-between.full-height
      .col
        q-inner-loading(:showing="isLoading")
      .row.justify-end.justify-lg-center
        q-card.bg-white.column-sm.row-md
          q-item(
            v-for="(item, index) in legendData"
            :key="index"
            :active="Boolean(currentLayer === item.layer)"
            active-class="bg-primary-light text-primary"
            clickable
            @click="toggleSectionVisibility(item.layer)"
          )
            q-item-section.text-center
              q-item-label(:class="item.color")
                | {{ item.label }}
              q-item-label
                | {{ item.caption }}
    ModalSuccess(v-model="isTicketSuccess")
    ModalFail(v-model="isTicketFail")

    ParkingHoverModal(
      v-if="pickedFeature"
      v-model="isEntityHoverModal"
      :data="pickedFeature"
      @selected="onParkingChange"
    )
    ParkingPlaceModal(
      v-if="isParkingPlaceModal"
      v-model="isParkingPlaceModal"
      :parkingPlaces="parkingPlaces"
      :buildingId="buildingId"
      :type="pickedFeature.properties.parking_places_type"
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
    GET_PARKING_BUILDINGS, GET_USER_DOCUMENTS, GET_REFERENCES
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
  import { TOGGLE_VISIBILITY_BY_LAYER } from "../../store/constants/action-constants";

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
        isTicketFail: false,
        componentInstance: null,
        currentLayer: null
      };
    },
    computed: {
      ...mapState("services", {
        pickedFeatureId: state => state.pickedFeatureId,
        cesiumInstance: state => state.cesiumInstance,
        geoJson: state => state.geoJson
      }),

      ...mapState("services/parking", {
        pickedParkingPlace: state => state.pickedParkingPlace,
        parkingPlaces: state => state.parkingPlaces || []
      }),

      ...mapGetters("services", [
        "pickedFeature"
      ]),

      dataLayers () {
        return this.geoJson.data.features.reduce((acc, i) => {
          acc.add(i.properties.layer);
          return acc;
        }, new Set());
      },

      legendData () {
        const { free, busy, social } = this.parkingPlacesCount;

        return [
          {
            label: "Платные",
            caption: free,
            layer: 1,
            color: "text-green"
          },
          {
            label: "Социальные",
            caption: social,
            layer: 2,
            color: "text-blue"
          },
          {
            label: "Недоступные",
            caption: busy,
            layer: 3,
            color: "text-red"
          }
        ];
      },

      parkingPlacesCount () {
        return this.geoJson.data.features.reduce((acc, i) => {
          acc.free += i.properties.parking_places_type === "Обычное" ? i.properties.free : 0;
          acc.busy += i.properties.busy;
          acc.social += i.properties.parking_places_type === "Льготное" ? i.properties.total : 0;
          return acc;
        }, { free: 0, busy: 0, social: 0 });
      },

      isLoading () {
        return this.$store.state.wait[`services/${ GET_PARKING_GEO }`] ||
          this.$store.state.wait[`services/parking/${ GET_PARKING_BUILDINGS }`];
      },

      buildingId () {
        switch (this.pickedFeature.properties.parking_places_type) {
          case "Обычное":
            return 1;
          case "Льготное":
            return 2;
        }
      },

      isEntityHoverModal: {
        set () {
          this.SET_FEATURE_ID(null);
        },

        get () {
          return Boolean(this.pickedFeatureId);
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
        GET_PARKING_GEO,
        TOGGLE_VISIBILITY_BY_LAYER
      ]),

      ...mapActions("services/parking", [
        GET_PARKING_BUILDINGS
      ]),

      ...mapActions("user/documents", [GET_USER_DOCUMENTS]),
      ...mapActions("references", [GET_REFERENCES]),

      toggleSectionVisibility (id) {
        const layers = Array.from(this.dataLayers);

        if (this.currentLayer === id) {
          this.TOGGLE_VISIBILITY_BY_LAYER({ ids: layers, visibility: true });
          this.currentLayer = null;
        } else {
          this.TOGGLE_VISIBILITY_BY_LAYER({ ids: layers.filter(i => i !== id), visibility: false });
          this.TOGGLE_VISIBILITY_BY_LAYER({ ids: [id], visibility: true });
          this.currentLayer = id;
        }
      },

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
      cesiumInstance: {
        immediate: true,
        handler (value) {
          if (value) {
            this.componentInstance = this.$root.map.componentInstance;
          }
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
