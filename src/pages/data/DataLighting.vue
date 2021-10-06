<template lang="pug">
	.data-environment.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection
				template(#left)
					| test1
				template(#right)
					| test2

		.q-mx-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
  import DataCarousel from "@/components/data/DataCarousel.vue";
  import DataMainSection from "@/components/data/DataMainSection.vue";
  import BtnBack from "@/components/data/BtnBack.vue";
  import { GET_DATA_LIGHTING } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";

  export default {
    name: "DataLighting",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_LIGHTING }`);
    },
    computed: {
      ...mapGetters("data", [
        "getLighting"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.lighting.flashlights"),
            icon: "lighting/flashlight.svg",
            data: this.getLighting.lanternsInCity.lanternsInCity,
            leftSectionName: this.$t("entity.data.lighting.alongRoads"),
            leftSectionData: this.getLighting.lanternsInCity.alongRoads,
            rightSectionName: this.$t("entity.data.lighting.inResidential"),
            rightSectionData: this.getLighting.lanternsInCity.inResidentialAreas
          },
          {
            name: this.$t("entity.data.lighting.lamps"),
            icon: "lighting/lamp.svg",
            data: `${ this.getLighting.fixtures.fixtures } ${ this.$t("entity.data.abbrs.types") }`,
            leftSectionName: this.$t("entity.data.lighting.flashlightWord"),
            leftSectionData: `${ this.getLighting.fixtures.lanterns } ${ this.$t("entity.data.abbrs.types") }`,
            rightSectionName: this.$t("entity.data.lighting.backlight"),
            rightSectionData: `${ this.getLighting.fixtures.backlights } ${ this.$t("entity.data.abbrs.types") }`
          },
          {
            name: this.$t("entity.data.lighting.lightsInPark"),
            icon: "lighting/icon-tree.svg",
            data: this.getLighting.lanternsInPark.lanternsInPark,
            leftSectionName: this.$t("entity.data.lighting.lamp"),
            leftSectionData: this.getLighting.lanternsInPark.luminaire,
            rightSectionName: this.$t("entity.data.lighting.bollards"),
            rightSectionData: this.getLighting.lanternsInPark.bollardLighting
          },
          {
            name: this.$t("entity.data.lighting.colors"),
            icon: "lighting/color.svg",
            data: this.getLighting.backlightColors.backlightColors,
            leftSectionName: this.$t("entity.data.lighting.warm"),
            leftSectionData: this.getLighting.backlightColors.warm,
            rightSectionName: this.$t("entity.data.lighting.cold"),
            rightSectionData: this.getLighting.backlightColors.cold
          }
        ];
      }
    }
  };
</script>

