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
		name: "DataTourism",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack
		},
		computed: {
			cards () {
				return [
					{
						name: this.$t("entity.data.tourism.sights"),
						icon: "tourism/sight.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.tourism.culture"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.tourism.entertainment"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.tourism.closeToCity"),
						icon: "tourism/city.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.tourism.village"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.tourism.smallVillage"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.tourism.distance"),
						icon: "tourism/location.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.tourism.toSviyaga"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.tourism.toMonastery"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.tourism.height"),
						icon: "tourism/height.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.tourism.upPoint"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.tourism.downPoint"),
						rightSectionData: "data"
					}
				];
			}
		}
	};
</script>

