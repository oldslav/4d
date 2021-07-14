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
        q-tab(name="description" :label="$t('common.description')")
      q-tab-panels(v-model="tab" animated)
        q-tab-panel(name="rent").is-paddingless
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
            q-btn(outline color="primary" @click="selectedParkingType('Common')" :disable="!data.properties.free").full-width
              | {{ $t('action.rent') }}
        q-tab-panel(name="guest").is-paddingless
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
              | {{ $t('action.rent') }}
        q-tab-panel(name="description").is-paddingless
          q-list
            q-item
              q-item-section
                q-item-label.text-primary-light {{ $t("entity.services.parking.lots.free") }}
                q-item-label {{ featureProperties.free }}
            q-item
              q-item-section
                q-item-label.text-primary-light {{ $t("entity.services.parking.lots.total") }}
                q-item-label {{ featureProperties.total }}
            q-item
              q-item-section
                q-item-label.text-primary-light {{ $t("entity.services.parking.parkingType") }}
                q-item-label {{ featureProperties.parking_type }}
</template>

<script>
  import BaseModal from "../common/BaseModal";
  import BaseTabs from "../common/BaseTabs";

  export default {
    name: "ParkingHoverModal",
    components: { BaseTabs, BaseModal },
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
    data () {
      return {
        rentTypes: ["short", "mid", "long"],
        tab: "rent"
      };
    },
    computed: {
      featureProperties () {
        return this.data.properties;
      },

      isParkingSocial () {
        return this.featureProperties.parking_places_type === "Льготное";
      }
    },
    methods: {
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
