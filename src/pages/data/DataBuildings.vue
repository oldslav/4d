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
            data: `${ this.getObjectsInfo.livingArea.livingArea } ${ this.$t("entity.data.abbrs.sqm") }`,
            leftSectionName: this.$t("entity.data.buildings.MKD"),
            leftSectionData: `${ this.getObjectsInfo.livingArea.apartmentsBuildings } ${ this.$t("entity.data.abbrs.sqm") }`,
            rightSectionName: this.$t("entity.data.buildings.townhouses"),
            rightSectionData: `${ this.getObjectsInfo.livingArea.townhouses } ${ this.$t("entity.data.abbrs.sqm") }`
          },
          {
            name: this.$t("entity.data.buildings.squareCommercial"),
            icon: "buildings/square.svg",
            data: `${ this.getObjectsInfo.commerceArea.commerceArea } ${ this.$t("entity.data.abbrs.sqm") }`,
            leftSectionName: this.$t("entity.data.buildings.busy"),
            leftSectionData: `${ this.getObjectsInfo.commerceArea.busy } ${ this.$t("entity.data.abbrs.sqm") }`,
            rightSectionName: this.$t("entity.data.buildings.free"),
            rightSectionData: `${ this.getObjectsInfo.commerceArea.free } ${ this.$t("entity.data.abbrs.sqm") }`
          },
          {
            name: this.$t("entity.data.buildings.squareOffice"),
            icon: "buildings/square.svg",
            data: `${ this.getObjectsInfo.officeArea.officeArea } ${ this.$t("entity.data.abbrs.sqm") }`,
            leftSectionName: this.$t("entity.data.buildings.busy"),
            leftSectionData: `${ this.getObjectsInfo.officeArea.busy } ${ this.$t("entity.data.abbrs.sqm") }`,
            rightSectionName: this.$t("entity.data.buildings.free"),
            rightSectionData: `${ this.getObjectsInfo.officeArea.free } ${ this.$t("entity.data.abbrs.sqm") }`
          },
          {
            name: this.$t("entity.data.buildings.organizations"),
            icon: "buildings/organizations.svg",
            data: this.getObjectsInfo.organization.organization,
            leftSectionName: this.$t("entity.data.buildings.commercial"),
            leftSectionData: this.getObjectsInfo.organization.commerce,
            rightSectionName: this.$t("entity.data.buildings.service"),
            rightSectionData: this.getObjectsInfo.organization.service
          },
          {
            name: this.$t("entity.data.buildings.offices"),
            icon: "buildings/organizations.svg",
            data: this.getObjectsInfo.technoparkOffices.technoparkOffices,
            leftSectionName: this.$t("entity.data.buildings.forEvents"),
            leftSectionData: this.getObjectsInfo.technoparkOffices.eventHalls,
            rightSectionName: this.$t("entity.data.buildings.cafes"),
            rightSectionData: this.getObjectsInfo.technoparkOffices.caffe
          },
          {
            name: this.$t("entity.data.buildings.squareSocial"),
            icon: "buildings/square.svg",
            data: `${ this.getObjectsInfo.socialArea.socialArea } ${ this.$t("entity.data.abbrs.sqm") }`,
            leftSectionName: this.$t("entity.data.buildings.education"),
            leftSectionData: `${ this.getObjectsInfo.socialArea.educational } ${ this.$t("entity.data.abbrs.sqm") }`,
            rightSectionName: this.$t("entity.data.buildings.leisure"),
            rightSectionData: `${ this.getObjectsInfo.socialArea.leisure } ${ this.$t("entity.data.abbrs.sqm") }`
          },
          {
            name: this.$t("entity.data.buildings.averageFloor"),
            icon: "buildings/floor.svg",
            data: `${ this.getObjectsInfo.avgFloor.avgFloor } ${ this.$t("entity.data.abbrs.floor") }`,
            leftSectionName: this.$t("entity.data.buildings.min"),
            leftSectionData: `${ this.getObjectsInfo.avgFloor.min } ${ this.$t("entity.data.abbrs.floor") }`,
            rightSectionName: this.$t("entity.data.buildings.max"),
            rightSectionData: `${ this.getObjectsInfo.avgFloor.max } ${ this.$t("entity.data.abbrs.floor") }`
          },
          {
            name: this.$t("entity.data.buildings.flats"),
            icon: "buildings/flat.svg",
            data: this.getObjectsInfo.apartments.apartments,
            leftSectionName: this.$t("entity.data.buildings.room1"),
            leftSectionData: this.getObjectsInfo.apartments.oneRoom,
            rightSectionName: this.$t("entity.data.buildings.room2"),
            rightSectionData: this.getObjectsInfo.apartments.twoRoom
          }
        ];
      }
    }
  };
</script>

