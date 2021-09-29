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

	export default {
		name: "DataTransport",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack
		},
		computed: {
			cards () {
				return [
					{
						name: this.$t("entity.data.transport.crosswalk"),
						icon: "transport/crosswalk.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.in2020"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.in2021"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.transport.stops"),
						icon: "transport/stops.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.in2020"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.in2021"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.transport.pedestrian"),
						icon: "transport/pedestrian.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.inResidential"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.alongRoads"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.transport.averageTime"),
						icon: "transport/averageTime.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.kindergarten"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.medCenter"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.transport.bycyclePathLength"),
						icon: "transport/bicyclePathLength.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.inPublic"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.inResidential"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.transport.bicycleParking"),
						icon: "transport/bicycleParking.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.inPublic"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.inResidential"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.bicyclesForRent"),
						icon: "transport/bicyclesForRent.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.weekends"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.weekdays"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.bicycleTraffic"),
						icon: "transport/averageTime.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.in2020"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.in2021"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.carsharing"),
						icon: "transport/car.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.scooters"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.cars"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.rings"),
						icon: "transport/averageTime.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.toKazan"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.locality"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.motorization"),
						icon: "transport/car.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.personalTransport"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.unmannedTransport"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.passengerTraffic"),
						icon: "transport/man.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.citizensAndWorkers"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.guestsAndTourists"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.squareParking"),
						icon: "transport/squareParking.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.terrestrial"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.underground"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.parkingForRent"),
						icon: "transport/parking.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.busy"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.free"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.transport.parkingForGuests"),
						icon: "transport/parking.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.transport.nearSport"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.transport.nearUniversity"),
						rightSectionData: "data"
					}
				];
			}
		}
	};
</script>

