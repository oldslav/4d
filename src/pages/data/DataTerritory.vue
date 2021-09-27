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
		name: "DataTerritory",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack
		},
		computed: {
			cards () {
				return [
					{
						name: this.$t("entity.data.territory.territoryGP"),
						icon: "territory/square.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.territory.builtUp"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.territory.available"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.territory.residentialPZZ"),
						icon: "territory/square.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.territory.public"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.territory.recreational"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.territory.residentialPPT"),
						icon: "territory/square.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.territory.technopark"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.territory.publicCenter"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.territory.masteredGP"),
						icon: "territory/mastered.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.territory.projectPopulation"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.territory.population"),
						rightSectionData: "data"
					}
				];
			}
		}
	};
</script>

