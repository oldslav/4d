<template lang="pug">
	.q-mx-md-md.q-mb-md.q-mt-md-md
		DataMainSection(:title="$t('entity.data.transport.chart.carTab.title')")
			template(#left)
				.row.justify-center.justify-lg-start.items-center
					.col-auto
						DoughnutChart(
							v-if="!loading"
							:chart-data="chartData" 
							:options="options"
						)
						
					.col-12.col-md-auto.q-ml-md-md.q-my-md
						.row.q-my-sm.no-wrap.justify-between(
							v-for="(item, index) in labelsList"
							:key="index"
						)
							.col-auto {{ item }}
							.col-auto.q-ml-lg.text-right {{ dataList[index] }} %

			template(#right)
				span.text-title {{ dataSum }} 
				span {{ $t('entity.data.transport.chart.carTab.rightTitle') }}

				.row.q-mt-md(
					v-for="(val, name, index) in data.roadsLength"
					:key="index"
				)
					.col {{ name }}
					.col-3.text-right {{ val }} {{ $t('entity.data.abbrs.m') }}
</template>

<script>
	import DataMainSection from "@/components/data/DataMainSection.vue";
	import DoughnutChart from "@/components/data/chart/DoughnutChart.js";

	export default {
		name: "Car",
		components: {
			DataMainSection,
			DoughnutChart
		},
		props: {
			data: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		data () {
			return {
				chartData: {
					labels: null,
					datasets: [
						{
							backgroundColor: [
								"#C87ADB",
								"#B556CD",
								"#C87ADB",
								"#E996FE",
								"#F3C2FF",
								"rgba(243, 194, 255, 0.8)"
							],
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
							display: false,
							gridLines: {
								display: false
							},
							scaleLabel: {
								display: false
							}
						}],
						yAxes: [{
							display: false,
							gridLines: {
								display: false
							},
							scaleLabel: {
								display: false
							}
						}]
					}	
				},
				loading: true
			};
		},
		computed: {
			dataList () {
        let arr = [
					this.data.modesOfMovement.buses,
					this.data.modesOfMovement.cars,
					this.data.modesOfMovement.unmannedVehicles,
					this.data.modesOfMovement.pedestrians,
					this.data.modesOfMovement.bicycles,
					this.data.modesOfMovement.other
				];
        return arr;
      },
			labelsList () {
				let arr = [
					this.$t("entity.data.transport.chart.bicycleTab.buses"),
					this.$t("entity.data.transport.chart.bicycleTab.cars"),
					this.$t("entity.data.transport.chart.bicycleTab.unmannedVehicles"),
					this.$t("entity.data.transport.chart.bicycleTab.pedestrians"),
					this.$t("entity.data.transport.chart.bicycleTab.bicycles"),
					this.$t("entity.data.transport.chart.bicycleTab.other")
				];
				return arr;
			},
			dataSum () {
				let sum = 0;
				for (let prop in this.data.roadsLength) {
					sum += +this.data.roadsLength[prop];
				}
				return Math.round(sum/1000);
			}
		},
		mounted () {
			this.fillChart();
			this.loading = false;
		},
		methods: {
      fillChart () {
        this.chartData = {
					labels: this.labelsList,
					datasets: [{
						data: this.dataList,
            backgroundColor: [
							"#C87ADB",
							"#B556CD",
							"#C87ADB",
							"#E996FE",
							"#F3C2FF",
							"rgba(243, 194, 255, 0.8)"
						]
					}]
				};
      }
    }
	};
</script>