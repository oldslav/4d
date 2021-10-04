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
  import { GET_DATA_TOURISM } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";

  export default {
    name: "DataTourism",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_TOURISM }`);
    },
    computed: {
      ...mapGetters("data", [
        "getTourism"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.tourism.sights"),
            icon: "tourism/sight.svg",
            data: this.getTourism.attractions.attractions,
            leftSectionName: this.$t("entity.data.tourism.culture"),
            leftSectionData: this.getTourism.attractions.cultural,
            rightSectionName: this.$t("entity.data.tourism.entertainment"),
            rightSectionData: this.getTourism.attractions.entertainment
          },
          {
            name: this.$t("entity.data.tourism.closeToCity"),
            icon: "tourism/city.svg",
            data: `${ this.getTourism.settlements.settlements } ${ this.$t("entity.data.abbrs.settlements") }`,
            leftSectionName: this.$t("entity.data.tourism.village"),
            leftSectionData: this.getTourism.settlements.township,
            rightSectionName: this.$t("entity.data.tourism.smallVillage"),
            rightSectionData: this.getTourism.settlements.village
          },
          {
            name: this.$t("entity.data.tourism.distance"),
            icon: "tourism/location.svg",
            data: `${ this.getTourism.distanceToPlaces.distanceToPlaces } ${ this.$t("entity.data.abbrs.km") }`,
            leftSectionName: this.$t("entity.data.tourism.toSviyaga"),
            leftSectionData: `${ this.getTourism.distanceToPlaces.svyazhskieHills } ${ this.$t("entity.data.abbrs.km") }`,
            rightSectionName: this.$t("entity.data.tourism.toMonastery"),
            rightSectionData: `${ this.getTourism.distanceToPlaces.makaryevskyMonastery } ${ this.$t("entity.data.abbrs.km") }`
          },
          {
            name: this.$t("entity.data.tourism.height"),
            icon: "tourism/height.svg",
            data: `${ this.getTourism.heightDifference.heightDifference } %`,
            leftSectionName: this.$t("entity.data.tourism.upPoint"),
            leftSectionData: `${ this.getTourism.heightDifference.topPoint } ${ this.$t("entity.data.abbrs.m") }`,
            rightSectionName: this.$t("entity.data.tourism.downPoint"),
            rightSectionData: `${ this.getTourism.heightDifference.bottomPoint } ${ this.$t("entity.data.abbrs.m") }`
          }
        ];
      }
    }
  };
</script>

