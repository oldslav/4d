<template lang="pug">
	.pedestrian.q-mx-md-md.q-mb-md.q-mt-md-md
		DataMainSection(:title="$t('entity.data.transport.chart.pedestrianTab.title')")
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
							.col-auto.q-ml-lg.text-right {{ dataList[index] }} {{ $t('entity.data.abbrs.pcs') }}

			template(#right)
				span.text-title {{ dataSum }} 
				span {{ $t('entity.data.transport.chart.pedestrianTab.rightTitle') }}

				.row.q-mt-md(
					v-for="(item, index) in labelsList"
					:key="index"
				)
					.col {{ item }}
					.col-3.text-right {{ dataList[index] }} {{ $t('entity.data.abbrs.pcs') }}
</template>

<script>
	import DataMainSection from "@/components/data/DataMainSection.vue";
	import DoughnutChart from "@/components/data/chart/DoughnutChart.js";

	export default {
		name: "Pedestrian",
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
								"#E996FE",
								"#F3C2FF"
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
					this.data.installedObjects.stops,
					this.data.installedObjects.undergroundPassages,
					this.data.installedObjects.groundPassages
				];
        return arr;
      },
			labelsList () {
				let arr = [
					this.$t("entity.data.transport.stops"),
					this.$t("entity.data.transport.chart.pedestrianTab.undergroundPassages"),
					this.$t("entity.data.transport.chart.pedestrianTab.groundPassages")
				];
				return arr;
			},
			dataSum () {
				let sum = 0;
				for (let i = 0; i < this.dataList.length; i++) {
					sum += +this.dataList[i];
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
					labels: this.labelsList,
					datasets: [{
						data: this.dataList,
            backgroundColor: [
							"#C87ADB",
							"#E996FE",
							"#F3C2FF"
						]
					}]
				};
      }
    }
	};
</script>