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
		name: "DataEnvironment",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack
		},
		computed: {
			cards () {
				return [
					{
						name: this.$t("entity.data.weather.humidity"),
						icon: "environment/humidity.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.weather.feeling"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.weather.dewPoint"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.weather.precipitation"),
						icon: "environment/rain.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.environment.note"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.environment.number"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.weather.airPressure"),
						icon: "environment/pressure.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.environment.norm"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.weather.dewPoint"),
						rightSectionData: "data"
					},
					{
						name: this.$t("entity.data.weather.humidity"),
						icon: "environment/windSpeed.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.weather.direction"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.weather.feeling"),
						rightSectionData: "data"
					}
				];
			}
		}
	};
</script>

