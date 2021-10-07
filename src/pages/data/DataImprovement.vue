<template lang="pug">
	.data-improvement.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection(:title="$t('entity.data.improvement.chart.title')")
				template(#left)
					.row.q-mt-md.justify-center.items-end.flex-wrap
						.col-12.col-sm-6.col-lg-3.text-center.q-my-sm(
							v-for="(item, index) in getImprovement.popular"
							:key="index"
						)
							img(:src="item.image")
							q-separator.gt-xs
							div.text-grey-7.q-mt-md {{ item.count }} {{ $t('entity.data.abbrs.pcs') }}
							div.text-grey-7 {{ item.name }}
	
				template(#right)
					span.text-title {{ fullSquare }} 
					span {{ $t('entity.data.abbrs.sqm') }}

					.row.q-my-sm
						.col {{ $t('entity.data.improvement.chart.flowersArea') }}
						.col-5.q-ml-sm.text-right {{ getImprovement.recreationalArea.flowersArea }} {{ $t('entity.data.abbrs.sqm') }}
					
					.row.q-my-sm
						.col {{ $t('entity.data.improvement.chart.hedgeArea') }}
						.col-5.q-ml-sm.text-right {{ getImprovement.recreationalArea.shrubsArea }} {{ $t('entity.data.abbrs.sqm') }}

		.q-mx-sm.q-py-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
	import DataCarousel from "@/components/data/DataCarousel.vue";
	import DataMainSection from "@/components/data/DataMainSection.vue";
	import BtnBack from "@/components/data/BtnBack.vue";
	import { GET_DATA_IMPROVEMENT } from "@/store/constants/action-constants";
	import { mapGetters } from "vuex";

	export default {
		name: "DataImprovement",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack
		},
		preFetch ({ store }) {
			return store.dispatch(`data/${ GET_DATA_IMPROVEMENT }`);
		},
		computed: {
			...mapGetters("data", [
				"getImprovement"
			]),
			cards () {
				return [
					{
						name: this.$t("entity.data.improvement.recreational"),
						icon: "improvement/recreational.svg",
						data: `${ this.getImprovement.recreationalArea.recreationalArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						leftSectionName: this.$t("entity.data.improvement.parks"),
						leftSectionData: `${ this.getImprovement.recreationalArea.parkArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						rightSectionName: this.$t("entity.data.improvement.squares"),
						rightSectionData: `${ this.getImprovement.recreationalArea.squareArea } ${ this.$t("entity.data.abbrs.sqm") }`
					},
					{
						name: this.$t("entity.data.improvement.plantTypes"),
						icon: "improvement/plant.svg",
						data: this.getImprovement.plantSpecies.plantSpecies,
						leftSectionName: this.$t("entity.data.improvement.tree"),
						leftSectionData: this.getImprovement.plantSpecies.tree,
						rightSectionName: this.$t("entity.data.improvement.bush"),
						rightSectionData: this.getImprovement.plantSpecies.bush
					},
					{
						name: this.$t("entity.data.improvement.plantedPlant"),
						icon: "improvement/plant.svg",
						data: `${ this.getImprovement.plantsPlanted.plantsPlanted } ${ this.$t("entity.data.abbrs.thous") }`,
						leftSectionName: this.$t("entity.data.improvement.tree"),
						leftSectionData: `${ this.getImprovement.plantsPlanted.plantedTree } ${ this.$t("entity.data.abbrs.thous") }`,
						rightSectionName: this.$t("entity.data.improvement.bush"),
						rightSectionData: `${ this.getImprovement.plantsPlanted.plantedBush } ${ this.$t("entity.data.abbrs.thous") }`
					},
					{
						name: this.$t("entity.data.improvement.squareLawn"),
						icon: "improvement/recreational.svg",
						data: `${ this.getImprovement.lawnArea.lawnArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						leftSectionName: this.$t("entity.data.improvement.inResidential"),
						leftSectionData: `${ this.getImprovement.lawnArea.inResidentialAreas } ${ this.$t("entity.data.abbrs.sqm") }`,
						rightSectionName: this.$t("entity.data.improvement.inPublic"),
						rightSectionData: `${ this.getImprovement.lawnArea.inPublicAreas } ${ this.$t("entity.data.abbrs.sqm") }`
					},
					{
						name: this.$t("entity.data.improvement.playgrounds"),
						icon: "improvement/playground.svg",
						data: this.getImprovement.playgrounds.playgrounds,
						leftSectionName: this.$t("entity.data.improvement.inResidential"),
						leftSectionData: this.getImprovement.playgrounds.inResidentialAreas,
						rightSectionName: this.$t("entity.data.improvement.inPublic"),
						rightSectionData: this.getImprovement.playgrounds.inPublicAreas
					},
					{
						name: this.$t("entity.data.improvement.smallArchitecturalForms"),
						icon: "improvement/bench.svg",
						data: this.getImprovement.smallArchitecturalForms.smallArchitecturalForms,
						leftSectionName: this.$t("entity.data.improvement.bench"),
						leftSectionData: this.getImprovement.smallArchitecturalForms.bench,
						rightSectionName: this.$t("entity.data.improvement.urn"),
						rightSectionData: this.getImprovement.smallArchitecturalForms.urn
					},
					{
						name: this.$t("entity.data.improvement.artObject"),
						icon: "improvement/art.svg",
						data: this.getImprovement.artObject.artObject,
						leftSectionName: this.$t("entity.data.improvement.newYear"),
						leftSectionData: this.getImprovement.artObject.newYear,
						rightSectionName: this.$t("entity.data.improvement.allSeason"),
						rightSectionData: this.getImprovement.artObject.allSeason
					},
					{
						name: this.$t("entity.data.improvement.navigation"),
						icon: "improvement/navigation.svg",
						data: this.getImprovement.navigation.navigation,
						leftSectionName: this.$t("entity.data.improvement.freestanding"),
						leftSectionData: this.getImprovement.navigation.freestanding,
						rightSectionName: this.$t("entity.data.improvement.wallMounted"),
						rightSectionData: this.getImprovement.navigation.wallMounted
					}
				];
			},
			fullSquare () {
				return +this.getImprovement.recreationalArea.flowersArea + +this.getImprovement.recreationalArea.shrubsArea;
			}
		}
	};
</script>

