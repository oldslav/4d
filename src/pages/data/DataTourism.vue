<template lang="pug">
	.data-tourism.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection(:title="$t('entity.data.tourism.chart.title')")
				template(#left)
					BarChart(
						v-if="!loading" 
						:chart-data="chartData"
						:options="options"
					)

				template(#right)
					span.text-title {{ labelsList.length }} 
					span {{ $t('entity.data.tourism.chart.rightTitle') }}

					.row.q-my-sm(
						v-for="(label, index) in labelsList"
						:key="index"
					)
						.col-1 {{ index+1 }} &nbsp;
						.col.text-grey-7 {{ label }}

		.q-mx-sm.q-py-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
	import DataCarousel from "@/components/data/DataCarousel.vue";
	import DataMainSection from "@/components/data/DataMainSection.vue";
	import BtnBack from "@/components/data/BtnBack.vue";
	import { GET_DATA_TOURISM } from "@/store/constants/action-constants";
	import { mapGetters } from "vuex";
	import BarChart from "@/components/data/chart/BarChart.js";

	export default {
		name: "DataTourism",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack,
			BarChart
		},
		preFetch ({ store }) {
			return store.dispatch(`data/${ GET_DATA_TOURISM }`);
		},
		data () {
			return {
				chartData: {
					labels: null,
					datasets: [
						{
							backgroundColor: "#FF6584",
							barThickness: 25,
							data: null
						}
					]
				},
				options: {
					layout: {
            padding: {
							top: 30
						}
        	},
					maintainAspectRatio: false,
					legend: {
            display: false
					},
					scales: {
						xAxes: [{
							gridLines: {
								//display: false,
								offsetGridLines: false,
								borderDash: [7, 10]
							},
							scaleLabel: {
								display: true,
								labelString: this.$t("entity.data.tourism.chart.xLabel")
							}
						}],
						yAxes: [{
							ticks: {
								stepSize: 4
							},
							scaleLabel: {
								display: true,
								labelString: this.$t("entity.data.tourism.chart.yLabel")
							}
						}]
					}	
				},
				loading: true
			};
		},
		computed: {
			...mapGetters("data", [
				"getTourism"
			]),
			cards () {
				return [
					{
						name: this.$t("entity.data.tourism.sights"),
						icon: "tourism/sight.svg",
						data: this.getTourism.attractions.attractions,
						leftSectionName: this.$t("entity.data.tourism.culture"),
						leftSectionData: this.getTourism.attractions.cultural,
						rightSectionName: this.$t("entity.data.tourism.entertainment"),
						rightSectionData: this.getTourism.attractions.entertainment
					},
					{
						name: this.$t("entity.data.tourism.closeToCity"),
						icon: "tourism/city.svg",
						data: `${ this.getTourism.settlements.settlements } ${ this.$t("entity.data.abbrs.settlements") }`,
						leftSectionName: this.$t("entity.data.tourism.village"),
						leftSectionData: this.getTourism.settlements.township,
						rightSectionName: this.$t("entity.data.tourism.smallVillage"),
						rightSectionData: this.getTourism.settlements.village
					},
					{
						name: this.$t("entity.data.tourism.distance"),
						icon: "tourism/location.svg",
						data: `${ this.getTourism.distanceToPlaces.distanceToPlaces } ${ this.$t("entity.data.abbrs.km") }`,
						leftSectionName: this.$t("entity.data.tourism.toSviyaga"),
						leftSectionData: `${ this.getTourism.distanceToPlaces.svyazhskieHills } ${ this.$t("entity.data.abbrs.km") }`,
						rightSectionName: this.$t("entity.data.tourism.toMonastery"),
						rightSectionData: `${ this.getTourism.distanceToPlaces.makaryevskyMonastery } ${ this.$t("entity.data.abbrs.km") }`
					},
					{
						name: this.$t("entity.data.tourism.height"),
						icon: "tourism/height.svg",
						data: `${ this.getTourism.heightDifference.heightDifference } %`,
						leftSectionName: this.$t("entity.data.tourism.upPoint"),
						leftSectionData: `${ this.getTourism.heightDifference.topPoint } ${ this.$t("entity.data.abbrs.m") }`,
						rightSectionName: this.$t("entity.data.tourism.downPoint"),
						rightSectionData: `${ this.getTourism.heightDifference.bottomPoint } ${ this.$t("entity.data.abbrs.m") }`
					}
				];
			},
			dataList () {
        let arr = [];
        for (let prop in this.getTourism.places) {
          arr.push(this.getTourism.places[prop]);
        }
        return arr;
      },
			labelsList () {
				let arr = [];
				for (let prop in this.getTourism.places) {
					arr.push(prop);
				}
				return arr;
			}
		},
		mounted () {
			this.fillChart();
			this.loading = false;
		},
		methods: {
      fillChart () {
        this.chartData = {
					labels: new Array(this.dataList.length).fill(null).map((val, idx) => idx+1),
					datasets: [{
						data: this.dataList,
            backgroundColor: "#FF6584",
						barThickness: 25
					}]
				};
      }
    }
	};
</script>

