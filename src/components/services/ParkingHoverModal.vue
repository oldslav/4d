<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card().modal-container_dense
      q-card-section.q-py-lg.text-subtitle
        | {{ data.properties.legend }}
      q-separator
      BaseTabs(v-model="tab")
        q-tab(name="rent" :label="$t('common.rent')")
        q-tab(name="guest" :label="$t('common.guestVisit')" v-if="!isParkingSocial")
        q-tab(name="description" :label="$t('common.description')" :disable="infoLoading")
          q-inner-loading(:showing="infoLoading" size="sm")
      q-tab-panels(v-model="tab" animated)
        q-tab-panel(name="rent").q-pa-sm
          template(v-if="!isParkingSocial")
            q-list
              q-item
                q-item-section
                  q-item-label {{ $t(`entity.services.parking.rentTypes.short.title`) }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.short.price.title`) }}
              q-item
                q-item-section
                  q-item-label {{ $t(`entity.services.parking.rentTypes.mid.title`) }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.mid.price.title`) }}
                  q-item-label(caption) {{ $t(`entity.services.parking.rentTypes.mid.price.description`) }}
              q-item
                q-item-section
                  q-item-label {{ $t(`entity.services.parking.rentTypes.long.title`) }}
                q-item-section(side)
                  q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.long.price.title`) }}
                  q-item-label(caption) {{ $t(`entity.services.parking.rentTypes.long.price.description`) }}
            .full-width.q-pa-md
              q-btn(outline color="primary" @click="selectedParkingType('Common')" :disable="!data.properties.free").full-width
                | {{ $t("action.rent") }}

          template(v-else)
            q-item
              q-item-section
                q-item-label {{ $t(`entity.services.parking.rentTypes.social.title`) }}
              q-item-section(side)
                q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.social.price.title`) }}
                q-item-label(caption) {{ $t(`entity.services.parking.rentTypes.social.price.description`) }}

            q-item(dense)
              q-item-label
                | {{ $t("entity.socialTypes.title") }}

            q-item(dense)
              q-list(dense)
                q-item
                  q-item-section(side)
                    q-icon(name="fiber_manual_record" size="8px")
                  q-item-section
                    q-item-label {{ $t("entity.socialTypes.largeFamily") }}
                q-item
                  q-item-section(side)
                    q-icon(name="fiber_manual_record" size="8px")
                  q-item-section
                    q-item-label {{ $t("entity.socialTypes.disability") }}
                q-item
                  q-item-section(side)
                    q-icon(name="fiber_manual_record" size="8px")
                  q-item-section
                    q-item-label {{ $t("entity.socialTypes.retired") }}
                q-item
                  q-item-section(side)
                    q-icon(name="fiber_manual_record" size="8px")
                  q-item-section
                    q-item-label {{ $t("entity.socialTypes.veteran") }}
            .full-width.q-pa-md
              q-btn(outline color="primary" @click="selectedParkingType('Social')" :disable="!data.properties.free").full-width
                | {{ $t("action.applicationMake") }}
        q-tab-panel(name="guest").q-pa-sm
          q-list
            q-item
              q-item-section
                q-item-label {{ $t(`entity.services.parking.rentTypes.guest.title`) }}
              q-item-section(side)
                q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.guest.price.title`) }}
            q-item
              q-item-section
                q-item-label {{ $t(`entity.guestCard.title`) }}
                q-item-label(caption) {{ $t(`entity.guestCard.period`) }}
              q-item-section(side)
                q-item-label.text-primary {{ $t(`entity.guestCard.price`) }}
          .full-width.q-pa-md
            q-btn(outline type="submit" color="primary" @click="selectedParkingType('Guest')" :disable="!data.properties.free").full-width
              | {{ $t("action.rent") }}
        q-tab-panel(name="description" v-if="getParkingInfo").q-pa-sm
          q-list.row.q-col-gutter-md
            .col-12(v-if="!!getImages.length")
              image-slider(:value="getImages" :slides-to-show="4").q-px-sm
            .col-12.col-md-6
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{$t("entity.maps.buildings.area")}}
                  q-item-label
                    | {{ getParkingInfo.area }}
            .col-12.col-md-6
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{ $t("entity.services.parking.level") }}
                  q-item-label
                    | {{ getParkingInfo.layer }}
            .col-12(v-if="getParkingInfo.qntIn")
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{ $t("entity.services.parking.entries") }}
                  q-item-label
                    | {{ getParkingInfo.qntIn }}
            .col-12(v-if="getParkingInfo.qntOut")
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{ $t("entity.services.parking.exits") }}
                  q-item-label
                    | {{ getParkingInfo.qntOut }}
            .col-12
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{ $t("entity.services.parking.parkingCount") }}
                  q-item-label
                    | {{ getParkingInfo.building.parkingCount }}
            .col-12
              q-separator
            .col-12.col-md-6
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{$t("entity.maps.buildings.builder")}}
                  q-item-label
                    | {{ getParkingInfo.building.builder.name }}
            .col-12.col-md-6
              q-item
                q-item-section
                  q-item-label.text-primary-light
                    | {{$t('entity.maps.buildings.constructYear')}}
                  q-item-label
                    | {{ getParkingInfo.building.constructYear }}
            .col-12(v-if="getParkingInfo.documents")
              q-separator
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { GET_PARKING_INFO } from "@/store/constants/action-constants";
  import BaseModal from "../common/BaseModal";
  import BaseTabs from "../common/BaseTabs";
  import ImageSlider from "components/common/ImageSlider";

  export default {
    name: "ParkingHoverModal",
    components: { ImageSlider, BaseTabs, BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      data: {
        type: [Object],
        required: true
      }
    },
    async created () {
      const { id } = this.data;
      await this.GET_PARKING_INFO(id);
    },
    data () {
      return {
        rentTypes: ["short", "mid", "long"],
        tab: "rent"
      };
    },
    computed: {
      ...mapGetters("services/parking", ["getParkingInfo"]),
      getImages () {
        return this.getParkingInfo.images.map((i) => i.imagePath);
      },
      infoLoading () {
        return this.$store.state.wait[`services/parking/${ GET_PARKING_INFO }`];
      },
      featureProperties () {
        return this.data.properties;
      },

      isParkingSocial () {
        return this.featureProperties.parking_places_type === "Льготное";
      }
    },
    methods: {
      ...mapActions("services/parking", [GET_PARKING_INFO]),
      toggleModal (value) {
        this.$emit("input", value);
      },

      selectedParkingType (value) {
        this.$emit("selected", this.isParkingSocial ? "Social" : value);
      }
    }
  };
</script>

<style scoped>

</style>
