<template lang="pug">
	.q-mx-md-md.q-mb-md.q-mt-md-md
		DataMainSection(:title="$t('entity.data.transport.chart.parkingTab.title')")
			template(#left)
				.row.justify-center.items-center.text-center
					.col-12.col-sm-6.col-md-12.col-lg-6.q-my-md(
						v-for="(item, index) in parkingPlaces"
						:key="index"
					)
						div
							img(:src="require(`@/assets/svg/data/transport/${ item.img }`)")
						div
							| {{ item.data }} {{ $t('entity.data.transport.chart.parkingTab.places') }}
						div
							| {{ item.name }}


			template(#right)
				span.text-title {{ dataSum }}&nbsp;
				span {{ $t('entity.data.transport.chart.parkingTab.rightTitle') }}

				.row.q-my-sm
					.col {{ $t('entity.data.transport.chart.parkingTab.fullArea') }}
					.col-5.q-ml-sm.text-right {{ data.parkingPlaces.totalArea }} {{ $t('entity.data.abbrs.sqm') }}
					
				.row.q-my-sm
					.col {{ $t('entity.data.transport.chart.parkingTab.availableForRent') }}
					.col-5.q-ml-sm.text-right {{ data.parkingPlaces.availableForRent }} {{ $t('entity.data.transport.chart.parkingTab.places') }}
</template>

<script>
	import DataMainSection from "@/components/data/DataMainSection.vue";

	export default {
		name: "Parking",
		components: {
			DataMainSection
		},
		props: {
			data: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		computed: {
			parkingPlaces () {
				return [
					{
						img: "popov.svg",
						data: this.data.parkingPlacesNearMainObjects.popova,
						name: this.$t("entity.data.transport.chart.parkingTab.popov")
					},
					{
						img: "university.svg",
						data: this.data.parkingPlacesNearMainObjects.innopolisUniversity,
						name: this.$t("entity.data.transport.chart.parkingTab.university")
					},
					{
						img: "lobachevsky.svg",
						data: this.data.parkingPlacesNearMainObjects.lobachevskogo,
						name: this.$t("entity.data.transport.chart.parkingTab.lobachevsky")
					},
					{
						img: "sportcomplex.svg",
						data: this.data.parkingPlacesNearMainObjects.sportComplex,
						name: this.$t("entity.data.transport.chart.parkingTab.sportcomplex")
					}
				];
			},
			dataSum () {
				let sum = 0;
				for (let prop in this.data.parkingPlacesNearMainObjects) {
					sum += +this.data.parkingPlacesNearMainObjects[prop];
				}
				return sum;
			}
		},
		mounted () {
			
		},
		methods: {
      
    }
	};
</script>