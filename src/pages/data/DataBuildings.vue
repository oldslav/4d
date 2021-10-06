<template lang="pug">
	.data-buildings.fit
		BtnBack

		q-tabs.q-mx-md(
			align="left"
			v-model="tab"
		)
			q-tab(name="living" :label="$t('entity.data.buildings.chart.living')")
			q-tab(name="social" :label="$t('entity.data.buildings.chart.social')")
			q-tab(name="business" :label="$t('entity.data.buildings.chart.business')")
			q-tab(name="commerce" :label="$t('entity.data.buildings.chart.commerce')")

		.q-mx-md-md.q-mb-md.q-mt-md-md
			DataMainSection(:title="$t('entity.data.buildings.chart.title')")
				template(#left)
					BarChart(
						v-if="!loading"
						:chart-data="chartData" 
						:options="options"
					)

				template(#right)
					span.text-title {{ area.sum }} 
					span {{ $t('entity.data.buildings.chart.rightTitle') }}

					.row.q-my-sm
						.col {{ area.name }}
						.col-5.q-ml-sm.text-right {{ area.data }}&nbsp;{{ $t('entity.data.abbrs.sqm') }}

		.q-mx-sm.q-py-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
	import DataCarousel from "@/components/data/DataCarousel.vue";
	import DataMainSection from "@/components/data/DataMainSection.vue";
	import BtnBack from "@/components/data/BtnBack.vue";
	import { GET_DATA_OBJECTS } from "@/store/constants/action-constants";
	import { mapGetters } from "vuex";
	import BarChart from "@/components/data/chart/BarChart.js";

	export default {
		name: "DataBuildings",
		components: {
			DataCarousel,
			DataMainSection,
			BtnBack,
			BarChart
		},
		preFetch ({ store }) {
			return store.dispatch(`data/${ GET_DATA_OBJECTS }`);
		},
		data () {
			return {
				tab: "living",
				chartData: {
					labels: null,
					datasets: [
						{
							backgroundColor: null,
							barThickness: 32,
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
							stacked: true,
							gridLines: {
								//display: false,
								offsetGridLines: false,
								borderDash: [7, 10]
							},
							scaleLabel: {
								display: true,
								labelString: this.$t("entity.data.buildings.chart.xLabel")
							}
						}],
						yAxes: [{
							ticks: {
								stepSize: 10
							},
							scaleLabel: {
								display: true,
								labelString: this.$t("entity.data.buildings.chart.yLabel")
							}
						}]
					}	
				},
				loading: true
			};
		},
		computed: {
			...mapGetters("data", [
				"getObjectsInfo"
			]),
			cards () {
				return [
					{
						name: this.$t("entity.data.buildings.squareBuildings"),
						icon: "buildings/square.svg",
						data: `${ this.getObjectsInfo.livingArea.livingArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						leftSectionName: this.$t("entity.data.buildings.MKD"),
						leftSectionData: `${ this.getObjectsInfo.livingArea.apartmentsBuildings } ${ this.$t("entity.data.abbrs.sqm") }`,
						rightSectionName: this.$t("entity.data.buildings.townhouses"),
						rightSectionData: `${ this.getObjectsInfo.livingArea.townhouses } ${ this.$t("entity.data.abbrs.sqm") }`
					},
					{
						name: this.$t("entity.data.buildings.squareCommercial"),
						icon: "buildings/square.svg",
						data: `${ this.getObjectsInfo.commerceArea.commerceArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						leftSectionName: this.$t("entity.data.buildings.busy"),
						leftSectionData: `${ this.getObjectsInfo.commerceArea.busy } ${ this.$t("entity.data.abbrs.sqm") }`,
						rightSectionName: this.$t("entity.data.buildings.free"),
						rightSectionData: `${ this.getObjectsInfo.commerceArea.free } ${ this.$t("entity.data.abbrs.sqm") }`
					},
					{
						name: this.$t("entity.data.buildings.squareOffice"),
						icon: "buildings/square.svg",
						data: `${ this.getObjectsInfo.officeArea.officeArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						leftSectionName: this.$t("entity.data.buildings.busy"),
						leftSectionData: `${ this.getObjectsInfo.officeArea.busy } ${ this.$t("entity.data.abbrs.sqm") }`,
						rightSectionName: this.$t("entity.data.buildings.free"),
						rightSectionData: `${ this.getObjectsInfo.officeArea.free } ${ this.$t("entity.data.abbrs.sqm") }`
					},
					{
						name: this.$t("entity.data.buildings.organizations"),
						icon: "buildings/organizations.svg",
						data: this.getObjectsInfo.organization.organization,
						leftSectionName: this.$t("entity.data.buildings.commercial"),
						leftSectionData: this.getObjectsInfo.organization.commerce,
						rightSectionName: this.$t("entity.data.buildings.service"),
						rightSectionData: this.getObjectsInfo.organization.service
					},
					{
						name: this.$t("entity.data.buildings.offices"),
						icon: "buildings/organizations.svg",
						data: this.getObjectsInfo.technoparkOffices.technoparkOffices,
						leftSectionName: this.$t("entity.data.buildings.forEvents"),
						leftSectionData: this.getObjectsInfo.technoparkOffices.eventHalls,
						rightSectionName: this.$t("entity.data.buildings.cafes"),
						rightSectionData: this.getObjectsInfo.technoparkOffices.caffe
					},
					{
						name: this.$t("entity.data.buildings.squareSocial"),
						icon: "buildings/square.svg",
						data: `${ this.getObjectsInfo.socialArea.socialArea } ${ this.$t("entity.data.abbrs.sqm") }`,
						leftSectionName: this.$t("entity.data.buildings.education"),
						leftSectionData: `${ this.getObjectsInfo.socialArea.educational } ${ this.$t("entity.data.abbrs.sqm") }`,
						rightSectionName: this.$t("entity.data.buildings.leisure"),
						rightSectionData: `${ this.getObjectsInfo.socialArea.leisure } ${ this.$t("entity.data.abbrs.sqm") }`
					},
					{
						name: this.$t("entity.data.buildings.averageFloor"),
						icon: "buildings/floor.svg",
						data: `${ this.getObjectsInfo.avgFloor.avgFloor } ${ this.$t("entity.data.abbrs.floor") }`,
						leftSectionName: this.$t("entity.data.buildings.min"),
						leftSectionData: `${ this.getObjectsInfo.avgFloor.min } ${ this.$t("entity.data.abbrs.floor") }`,
						rightSectionName: this.$t("entity.data.buildings.max"),
						rightSectionData: `${ this.getObjectsInfo.avgFloor.max } ${ this.$t("entity.data.abbrs.floor") }`
					},
					{
						name: this.$t("entity.data.buildings.flats"),
						icon: "buildings/flat.svg",
						data: this.getObjectsInfo.apartments.apartments,
						leftSectionName: this.$t("entity.data.buildings.room1"),
						leftSectionData: this.getObjectsInfo.apartments.oneRoom,
						rightSectionName: this.$t("entity.data.buildings.room2"),
						rightSectionData: this.getObjectsInfo.apartments.twoRoom
					}
				];
			},
			dataListLiving () {
				let arr = [];
				for (let prop in this.getObjectsInfo.livingByYear.byYear) {
					arr.push(this.getObjectsInfo.livingByYear.byYear[prop]);
				}
				return arr;
			},
			labelsListLiving () {
				let arr = [];
				for (let prop in this.getObjectsInfo.livingByYear.byYear) {
					arr.push(prop);
				}
				return arr;
			},

			dataListSocial () {
				let arr = [];
				for (let prop in this.getObjectsInfo.socialByYear.byYear) {
					arr.push(this.getObjectsInfo.socialByYear.byYear[prop]);
				}
				return arr;
			},
			labelsListSocial () {
				let arr = [];
				for (let prop in this.getObjectsInfo.socialByYear.byYear) {
					arr.push(prop);
				}
				return arr;
			},

			dataListBusiness () {
				let arr = [];
				for (let prop in this.getObjectsInfo.businessByYear.byYear) {
					arr.push(this.getObjectsInfo.businessByYear.byYear[prop]);
				}
				return arr;
			},
			labelsListBusiness () {
				let arr = [];
				for (let prop in this.getObjectsInfo.businessByYear.byYear) {
					arr.push(prop);
				}
				return arr;
			},

			dataListСommerce () {
				let arr = [];
				for (let prop in this.getObjectsInfo.commerceByYear.byYear) {
					arr.push(this.getObjectsInfo.commerceByYear.byYear[prop]);
				}
				return arr;
			},
			labelsListСommerce () {
				let arr = [];
				for (let prop in this.getObjectsInfo.commerceByYear.byYear) {
					arr.push(prop);
				}
				return arr;
			},

			area () {
				let sum = 0;

				if (this.tab === "living") {
					for (let prop in this.getObjectsInfo.livingByYear.byYear) {
						sum += +this.getObjectsInfo.livingByYear.byYear[prop];
					}
					return {
						name: this.$t("entity.data.buildings.chart.living"),
						data: +this.getObjectsInfo.livingByYear.area,
						sum: sum
					};
				}
				else if (this.tab === "social") {
					for (let prop in this.getObjectsInfo.socialByYear.byYear) {
						sum += +this.getObjectsInfo.socialByYear.byYear[prop];
					}
					return {
						name: this.$t("entity.data.buildings.chart.social"),
						data: +this.getObjectsInfo.socialByYear.area,
						sum: sum
					};
				}
				else if (this.tab === "business") {
					for (let prop in this.getObjectsInfo.businessByYear.byYear) {
						sum += +this.getObjectsInfo.businessByYear.byYear[prop];
					}
					return {
						name: this.$t("entity.data.buildings.chart.business"),
						data: +this.getObjectsInfo.businessByYear.area,
						sum: sum
					};
				}
				else if (this.tab === "commerce") {
					for (let prop in this.getObjectsInfo.commerceByYear.byYear) {
						sum += +this.getObjectsInfo.commerceByYear.byYear[prop];
					}
					return {
						name: this.$t("entity.data.buildings.chart.commerce"),
						data: +this.getObjectsInfo.commerceByYear.area,
						sum: sum
					};
				}
			}
		},
		mounted () {
			this.openTab(this.tab);
			this.loading = false;
		},
		methods: {
			openTab (tab) {
				switch(tab) {
					case "living":
						this.chartData = {
							labels: this.labelsListLiving,
							datasets: [{
								data: this.dataListLiving,
								backgroundColor: "#0E8AFD",
								barThickness: 32
							}]
						};
						break;

					case "social":
						this.chartData = {
							labels: this.labelsListSocial,
							datasets: [{
								data: this.dataListSocial,
								backgroundColor: "#0E8AFD",
								barThickness: 32
							}]
						};
						break;

					case "business":
						this.chartData = {
							labels: this.labelsListBusiness,
							datasets: [{
								data: this.dataListBusiness,
								backgroundColor: "#0E8AFD",
								barThickness: 32
							}]
						};
						break;

					case "commerce":
						this.chartData = {
							labels: this.labelsListСommerce,
							datasets: [{
								data: this.dataListСommerce,
								backgroundColor: "#0E8AFD",
								barThickness: 32
							}]
						};
						break;
				}
			}
		},
		watch: {
			tab (newValue) {
				this.openTab(newValue);
			}
		}
	};
</script>

