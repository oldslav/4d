<template lang="pug">
	.data-buildings.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection
				template(#left)
					
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
  import { GET_DATA_OBJECTS } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";
  //import { Bar } from "vue-chartjs";

  export default {
    name: "DataBuildings",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_OBJECTS }`);
    },
    //extends: Bar,
    computed: {
      ...mapGetters("data", [
        "getObjectsInfo"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.buildings.squareBuildings"),
            icon: "buildings/square.svg",
            data: `${ this.getObjectsInfo.livingArea.livingArea } ${ this.$t("entity.data.sqm") }`,
            leftSectionName: this.$t("entity.data.buildings.MKD"),
            leftSectionData: `${ this.getObjectsInfo.livingArea.apartmentsBuildings } ${ this.$t("entity.data.sqm") }`,
            rightSectionName: this.$t("entity.data.buildings.townhouses"),
            rightSectionData: `${ this.getObjectsInfo.livingArea.townhouses } ${ this.$t("entity.data.sqm") }`
          },
          {
            name: this.$t("entity.data.buildings.squareCommercial"),
            icon: "buildings/square.svg",
            data: `${ this.getObjectsInfo.commerceArea.commerceArea } ${ this.$t("entity.data.sqm") }`,
            leftSectionName: this.$t("entity.data.buildings.busy"),
            leftSectionData: `${ this.getObjectsInfo.commerceArea.busy } ${ this.$t("entity.data.sqm") }`,
            rightSectionName: this.$t("entity.data.buildings.free"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.buildings.squareOffice"),
            icon: "buildings/square.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.buildings.busy"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.buildings.free"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.buildings.organizations"),
            icon: "buildings/organizations.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.buildings.commercial"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.buildings.service"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.buildings.offices"),
            icon: "buildings/organizations.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.buildings.forEvents"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.buildings.cafes"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.buildings.squareSocial"),
            icon: "buildings/square.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.buildings.education"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.buildings.leisure"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.buildings.averageFloor"),
            icon: "buildings/floor.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.buildings.min"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.buildings.max"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.buildings.flats"),
            icon: "buildings/flat.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.buildings.room1"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.buildings.room2"),
            rightSectionData: "data"
          }
        ];
      }
    }
  };
</script>

