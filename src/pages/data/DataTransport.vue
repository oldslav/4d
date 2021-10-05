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
  import { GET_DATA_TRANSPORT } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";

  export default {
    name: "DataTransport",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_TRANSPORT }`);
    },
    computed: {
      ...mapGetters("data", [
        "getTransport"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.transport.crosswalk"),
            icon: "transport/crosswalk.svg",
            data: `${ this.getTransport.groundPassages.groundPassages } ${ this.$t("entity.data.abbrs.pcs") }`,
            leftSectionName: `${ this.$t("entity.data.abbrs.in") } 2020`,
            leftSectionData: `${ this.getTransport.groundPassages.groundPassages2020 } ${ this.$t("entity.data.abbrs.pcs") }`,
            rightSectionName: `${ this.$t("entity.data.abbrs.in") } 2021`,
            rightSectionData: `${ this.getTransport.groundPassages.groundPassages2021 } ${ this.$t("entity.data.abbrs.pcs") }`
          },
          {
            name: this.$t("entity.data.transport.stops"),
            icon: "transport/stops.svg",
            data: `${ this.getTransport.stops.stops } ${ this.$t("entity.data.abbrs.pcs") }`,
            leftSectionName: `${ this.$t("entity.data.abbrs.in") } 2020`,
            leftSectionData: `${ this.getTransport.stops.stops2020 } ${ this.$t("entity.data.abbrs.pcs") }`,
            rightSectionName: `${ this.$t("entity.data.abbrs.in") } 2021`,
            rightSectionData: `${ this.getTransport.stops.stops2021 } ${ this.$t("entity.data.abbrs.pcs") }`
          },
          {
            name: this.$t("entity.data.transport.pedestrian"),
            icon: "transport/pedestrian.svg",
            data: `${ this.getTransport.pedestrianRoads.pedestrianRoads } ${ this.$t("entity.data.abbrs.km") }`,
            leftSectionName: this.$t("entity.data.transport.inResidential"),
            leftSectionData: `${ this.getTransport.pedestrianRoads.inResidentialAreas } ${ this.$t("entity.data.abbrs.km") }`,
            rightSectionName: this.$t("entity.data.transport.alongRoads"),
            rightSectionData: `${ this.getTransport.pedestrianRoads.alongRoads } ${ this.$t("entity.data.abbrs.km") }`
          },
          {
            name: this.$t("entity.data.transport.averageTime"),
            icon: "transport/averageTime.svg",
            data: `${ this.getTransport.avgTravelTime.avgTravelTime } ${ this.$t("entity.data.abbrs.min") }`,
            leftSectionName: this.$t("entity.data.transport.kindergarten"),
            leftSectionData: `${ this.getTransport.avgTravelTime.beforeKindergarten } ${ this.$t("entity.data.abbrs.min") }`,
            rightSectionName: this.$t("entity.data.transport.medCenter"),
            rightSectionData: `${ this.getTransport.avgTravelTime.beforeMedicalCenter } ${ this.$t("entity.data.abbrs.min") }`
          },
          {
            name: this.$t("entity.data.transport.bycyclePathLength"),
            icon: "transport/bicyclePathLength.svg",
            data: `${ this.getTransport.bicycleRoads.bicycleRoads } ${ this.$t("entity.data.abbrs.m") }`,
            leftSectionName: this.$t("entity.data.transport.inPublic"),
            leftSectionData: `${ this.getTransport.bicycleRoads.inPublicAreas } ${ this.$t("entity.data.abbrs.m") }`,
            rightSectionName: this.$t("entity.data.transport.inResidential"),
            rightSectionData: `${ this.getTransport.bicycleRoads.inResidentialAreas } ${ this.$t("entity.data.abbrs.m") }`
          },
          {
            name: this.$t("entity.data.transport.bicycleParking"),
            icon: "transport/bicycleParking.svg",
            data: this.getTransport.bicycleParking.bicycleParking,
            leftSectionName: this.$t("entity.data.transport.inPublic"),
            leftSectionData: `${ this.getTransport.bicycleParking.inPublicAreas } ${ this.$t("entity.data.abbrs.pcs") }`,
            rightSectionName: this.$t("entity.data.transport.inResidential"),
            rightSectionData: `${ this.getTransport.bicycleParking.inResidentialAreas } ${ this.$t("entity.data.abbrs.pcs") }`
          },
          {
            name: this.$t("entity.data.transport.bicyclesForRent"),
            icon: "transport/bicyclesForRent.svg",
            data: `${ this.getTransport.bicycleForRent.bicycleForRent } ${ this.$t("entity.data.abbrs.pcs") }`,
            leftSectionName: this.$t("entity.data.transport.weekends"),
            leftSectionData: this.getTransport.bicycleForRent.weekend,
            rightSectionName: this.$t("entity.data.transport.weekdays"),
            rightSectionData: this.getTransport.bicycleForRent.weekdays
          },
          {
            name: this.$t("entity.data.transport.bicycleTraffic"),
            icon: "transport/averageTime.svg",
            data: this.getTransport.bicycleTraffic.bicycleTraffic,
            leftSectionName: `${ this.$t("entity.data.abbrs.in") } 2020`,
            leftSectionData: this.getTransport.bicycleTraffic.bicycleTraffic2020,
            rightSectionName: `${ this.$t("entity.data.abbrs.in") } 2021`,
            rightSectionData: this.getTransport.bicycleTraffic.bicycleTraffic2021
          },
          {
            name: this.$t("entity.data.transport.carsharing"),
            icon: "transport/car.svg",
            data: `${ this.getTransport.carSharing.carSharing } ${ this.$t("entity.data.abbrs.pcs") }`,
            leftSectionName: this.$t("entity.data.transport.scooters"),
            leftSectionData: this.getTransport.carSharing.scooters,
            rightSectionName: this.$t("entity.data.transport.cars"),
            rightSectionData: this.getTransport.carSharing.cars
          },
          {
            name: this.$t("entity.data.transport.rings"),
            icon: "transport/averageTime.svg",
            data: this.getTransport.reversalRings.reversalRings,
            leftSectionName: this.$t("entity.data.transport.toKazan"),
            leftSectionData: `${ this.getTransport.reversalRings.toKazan } ${ this.$t("entity.data.abbrs.pcs") }`,
            rightSectionName: this.$t("entity.data.transport.locality"),
            rightSectionData: `${ this.getTransport.reversalRings.settlements } ${ this.$t("entity.data.abbrs.pcs") }`
          },
          {
            name: this.$t("entity.data.transport.motorization"),
            icon: "transport/car.svg",
            data: `${ this.getTransport.avgLvlMotorization.avgLvlMotorization } ${ this.$t("entity.data.abbrs.people") }`,
            leftSectionName: this.$t("entity.data.transport.personalTransport"),
            leftSectionData: this.getTransport.avgLvlMotorization.personalTransport,
            rightSectionName: this.$t("entity.data.transport.unmannedTransport"),
            rightSectionData: this.getTransport.avgLvlMotorization.unmannedVehicles
          },
          {
            name: this.$t("entity.data.transport.passengerTraffic"),
            icon: "transport/man.svg",
            data: `${ this.getTransport.avgPassengerTraffic.avgPassengerTraffic } ${ this.$t("entity.data.abbrs.people") }`,
            leftSectionName: this.$t("entity.data.transport.citizensAndWorkers"),
            leftSectionData: this.getTransport.avgPassengerTraffic.residentsAndWorkers,
            rightSectionName: this.$t("entity.data.transport.guestsAndTourists"),
            rightSectionData: this.getTransport.avgPassengerTraffic.guestsAndTourists,
            isSmall: true
          },
          {
            name: this.$t("entity.data.transport.parking"),
            icon: "transport/squareParking.svg",
            data: this.getTransport.parkingPlaces.total,
            leftSectionName: this.$t("entity.data.transport.inResidential"),
            leftSectionData: this.getTransport.parkingPlaces.inResidentialAreas,
            rightSectionName: this.$t("entity.data.transport.inPublic"),
            rightSectionData: this.getTransport.parkingPlaces.inPublicAreas
          },
          {
            name: this.$t("entity.data.transport.squareParking"),
            icon: "transport/squareParking.svg",
            data: `${ this.getTransport.parkingArea.parkingArea } ${ this.$t("entity.data.abbrs.sqm") }`,
            leftSectionName: this.$t("entity.data.transport.terrestrial"),
            leftSectionData: `${ this.getTransport.parkingArea.ground } ${ this.$t("entity.data.abbrs.sqm") }`,
            rightSectionName: this.$t("entity.data.transport.underground"),
            rightSectionData: `${ this.getTransport.parkingArea.underground } ${ this.$t("entity.data.abbrs.sqm") }`
          },
          {
            name: this.$t("entity.data.transport.parkingForRent"),
            icon: "transport/parking.svg",
            data: this.getTransport.parkingPlacesForRent.parkingPlacesForRent,
            leftSectionName: this.$t("entity.data.transport.busy"),
            leftSectionData: this.getTransport.parkingPlacesForRent.busy,
            rightSectionName: this.$t("entity.data.transport.free"),
            rightSectionData: this.getTransport.parkingPlacesForRent.free
          },
          {
            name: this.$t("entity.data.transport.parkingForGuests"),
            icon: "transport/parking.svg",
            data: `${ this.getTransport.availableForGuests.availableForGuests } ${ this.$t("entity.data.abbrs.pcs") }`,
            leftSectionName: this.$t("entity.data.transport.nearSport"),
            leftSectionData: this.getTransport.availableForGuests.nearSportComplex,
            rightSectionName: this.$t("entity.data.transport.nearUniversity"),
            rightSectionData: this.getTransport.availableForGuests.nearUniversity
          }
        ];
      }
    }
  };
</script>

