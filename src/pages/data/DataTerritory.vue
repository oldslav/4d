<template lang="pug">
	.data-environment.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection(:title="$t('entity.data.territory.chart.title')")
				template(#left)
					BarChart(
						v-if="!loading" 
						:chart-data="chartData"
						:options="options"
					)

				template(#right)
					span.text-title {{ fullArea }} 
					span {{ $t('entity.data.territory.chart.rightTitle') }}

					.row.q-my-sm(
						v-for="(value, name, index) in getTerritory.pzz"
						:key="name"
					)
						.col {{ index+1 }}. {{ name }}
						.col-3.q-ml-sm.text-right {{ value }}&nbsp;{{ $t('entity.data.abbrs.ha') }}

		.q-mx-sm.q-py-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
	import DataCarousel from "@/components/data/DataCarousel.vue";
	import DataMainSection from "@/components/data/DataMainSection.vue";
	import BtnBack from "@/components/data/BtnBack.vue";
	import { GET_DATA_TERRITORY } from "@/store/constants/action-constants";
	import { mapGetters } from "vuex";
	import BarChart from "@/components/data/chart/BarChart.js";

	export default {
		name: "DataTerritory",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack,
			BarChart
		},
		preFetch ({ store }) {
			return store.dispatch(`data/${ GET_DATA_TERRITORY }`);
		},
		data () {
			return {
				chartData: {
					labels: null,
					datasets: [
						{
							backgroundColor: "#2AB6D4",
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
							}
						}],
						yAxes: [{
							ticks: {
								stepSize: 60
							},
							scaleLabel: {
								display: true,
								labelString: this.$t("entity.data.territory.chart.yLabel")
							}
						}]
					}	
				},
				loading: true
			};
		},
		computed: {
			...mapGetters("data", [
				"getTerritory"
			]),
			cards () {
				return [
					{
						name: this.$t("entity.data.territory.territoryGP"),
						icon: "territory/square.svg",
						data: `${ this.getTerritory.gpArea.gpArea } ${ this.$t("entity.data.abbrs.ha") }`,
						leftSectionName: this.$t("entity.data.territory.builtUp"),
						leftSectionData: `${ this.getTerritory.gpArea.builtUp } ${ this.$t("entity.data.abbrs.ha") }`,
						rightSectionName: this.$t("entity.data.territory.available"),
						rightSectionData: `${ this.getTerritory.gpArea.available } ${ this.$t("entity.data.abbrs.ha") }`
					},
					{
						name: this.$t("entity.data.territory.residentialPZZ"),
						icon: "territory/square.svg",
						data: `${ this.getTerritory.pzzArea.pzzArea } ${ this.$t("entity.data.abbrs.ha") }`,
						leftSectionName: this.$t("entity.data.territory.public"),
						leftSectionData: `${ this.getTerritory.pzzArea.commonBusiness } ${ this.$t("entity.data.abbrs.ha") }`,
						rightSectionName: this.$t("entity.data.territory.recreational"),
						rightSectionData: `${ this.getTerritory.pzzArea.recreationalAssignment } ${ this.$t("entity.data.abbrs.ha") }`
					},
					{
						name: this.$t("entity.data.territory.residentialPPT"),
						icon: "territory/square.svg",
						data: `${ this.getTerritory.pptArea.pptArea } ${ this.$t("entity.data.abbrs.ha") }`,
						leftSectionName: this.$t("entity.data.territory.technopark"),
						leftSectionData: `${ this.getTerritory.pptArea.technopark } ${ this.$t("entity.data.abbrs.ha") }`,
						rightSectionName: this.$t("entity.data.territory.publicCenter"),
						rightSectionData: `${ this.getTerritory.pptArea.commonCenter } ${ this.$t("entity.data.abbrs.ha") }`
					},
					{
						name: this.$t("entity.data.territory.masteredGP"),
						icon: "territory/mastered.svg",
						data: `${ this.getTerritory.gpLandsMastered.gpLandsMastered } %`,
						leftSectionName: this.$t("entity.data.territory.projectPopulation"),
						leftSectionData: `${ this.getTerritory.gpLandsMastered.projectPopulation } %`,
						rightSectionName: this.$t("entity.data.territory.population"),
						rightSectionData: `${ this.getTerritory.gpLandsMastered.actualPopulation } %`
					}
				];
			},
			dataList () {
				let arr = [];
				for (let prop in this.getTerritory.pzz) {
					arr.push(this.getTerritory.pzz[prop]);
				}
				return arr;
			},
			labelsList () {
				let arr = [];
				for (let prop in this.getTerritory.pzz) {
					arr.push(prop);
				}
				return arr;
			},
			fullArea () {
				let sum = 0;
				for (let prop in this.getTerritory.pzz) {
					sum += +this.getTerritory.pzz[prop];
				}
				return sum;
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
            backgroundColor: "#2AB6D4",
						barThickness: 25
					}]
				};
      }
    }
	};
</script>

