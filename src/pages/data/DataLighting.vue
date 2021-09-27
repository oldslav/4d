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
		name: "DataLighting",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack
		},
		computed: {
			cards () {
				return [
					{
						name: this.$t("entity.data.lighting.flashlights"),
						icon: "lighting/flashlight.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.lighting.alongRoads"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.lighting.inResidential"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.lighting.lamps"),
						icon: "lighting/lamp.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.lighting.flashlightWord"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.lighting.backlight"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.lighting.lightsInPark"),
						icon: "lighting/tree.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.lighting.lamp"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.lighting.bollards"),
						rightSectionData: "data"
					},
          {
						name: this.$t("entity.data.lighting.colors"),
						icon: "lighting/color.svg",
						data: "test",
						leftSectionName: this.$t("entity.data.lighting.warm"),
						leftSectionData: "data",
						rightSectionName: this.$t("entity.data.lighting.cold"),
						rightSectionData: "data"
					}
				];
			}
		}
	};
</script>

