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
  import { GET_DATA_TERRITORY } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";

  export default {
    name: "DataTerritory",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_TERRITORY }`);
    },
    computed: {
      ...mapGetters("data", [
        "getTerritory"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.territory.territoryGP"),
            icon: "territory/square.svg",
            data: `${ this.getTerritory.gpArea.gpArea } ${ this.$t("entity.data.abbrs.ha") }`,
            leftSectionName: this.$t("entity.data.territory.builtUp"),
            leftSectionData: `${ this.getTerritory.gpArea.builtUp } ${ this.$t("entity.data.abbrs.ha") }`,
            rightSectionName: this.$t("entity.data.territory.available"),
            rightSectionData: `${ this.getTerritory.gpArea.available } ${ this.$t("entity.data.abbrs.ha") }`
          },
          {
            name: this.$t("entity.data.territory.residentialPZZ"),
            icon: "territory/square.svg",
            data: `${ this.getTerritory.pzzArea.pzzArea } ${ this.$t("entity.data.abbrs.ha") }`,
            leftSectionName: this.$t("entity.data.territory.public"),
            leftSectionData: `${ this.getTerritory.pzzArea.commonBusiness } ${ this.$t("entity.data.abbrs.ha") }`,
            rightSectionName: this.$t("entity.data.territory.recreational"),
            rightSectionData: `${ this.getTerritory.pzzArea.recreationalAssignment } ${ this.$t("entity.data.abbrs.ha") }`
          },
          {
            name: this.$t("entity.data.territory.residentialPPT"),
            icon: "territory/square.svg",
            data: `${ this.getTerritory.pptArea.pptArea } ${ this.$t("entity.data.abbrs.ha") }`,
            leftSectionName: this.$t("entity.data.territory.technopark"),
            leftSectionData: `${ this.getTerritory.pptArea.technopark } ${ this.$t("entity.data.abbrs.ha") }`,
            rightSectionName: this.$t("entity.data.territory.publicCenter"),
            rightSectionData: `${ this.getTerritory.pptArea.commonCenter } ${ this.$t("entity.data.abbrs.ha") }`
          },
          {
            name: this.$t("entity.data.territory.masteredGP"),
            icon: "territory/mastered.svg",
            data: `${ this.getTerritory.gpLandsMastered.gpLandsMastered } %`,
            leftSectionName: this.$t("entity.data.territory.projectPopulation"),
            leftSectionData: `${ this.getTerritory.gpLandsMastered.projectPopulation } %`,
            rightSectionName: this.$t("entity.data.territory.population"),
            rightSectionData: `${ this.getTerritory.gpLandsMastered.actualPopulation } %`
          }
        ];
      }
    }
  };
</script>

