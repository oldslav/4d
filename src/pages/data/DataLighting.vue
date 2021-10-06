<template lang="pug">
	.data-environment.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection(:title="$t('entity.data.lighting.chart.title')")
				template(#left)
					LineChart(
						v-if="!loading" 
						:chart-data="chartData"
						:options="options"
					)

				template(#right)
					span.text-title {{ dataSum }} 
					span {{ $t('entity.data.lighting.chart.rightTitle') }}

					.row.q-my-sm(
						v-for="(val, name) in getLighting.byType"
						:key="name"
					)
						.col {{ name }}
						.col-3.q-ml-sm.text-right {{ val }}&nbsp;{{ $t('entity.data.abbrs.pcs') }}

		.q-mx-sm.q-py-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
  import DataCarousel from "@/components/data/DataCarousel.vue";
  import DataMainSection from "@/components/data/DataMainSection.vue";
  import BtnBack from "@/components/data/BtnBack.vue";
  import { GET_DATA_LIGHTING } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";
  import LineChart from "@/components/data/chart/LineChart.js";

  export default {
    name: "DataLighting",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack,
      LineChart
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_LIGHTING }`);
    },
    data () {
			return {
				chartData: {
					labels: null,
					datasets: [
						{
							backgroundColor: "rgba(175, 111, 15, 0.1)",
              borderColor: "rgba(249, 205, 137, 1)",
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
								stepSize: 100
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
        "getLighting"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.lighting.flashlights"),
            icon: "lighting/flashlight.svg",
            data: this.getLighting.lanternsInCity.lanternsInCity,
            leftSectionName: this.$t("entity.data.lighting.alongRoads"),
            leftSectionData: this.getLighting.lanternsInCity.alongRoads,
            rightSectionName: this.$t("entity.data.lighting.inResidential"),
            rightSectionData: this.getLighting.lanternsInCity.inResidentialAreas
          },
          {
            name: this.$t("entity.data.lighting.lamps"),
            icon: "lighting/lamp.svg",
            data: `${ this.getLighting.fixtures.fixtures } ${ this.$t("entity.data.abbrs.types") }`,
            leftSectionName: this.$t("entity.data.lighting.flashlightWord"),
            leftSectionData: `${ this.getLighting.fixtures.lanterns } ${ this.$t("entity.data.abbrs.types") }`,
            rightSectionName: this.$t("entity.data.lighting.backlight"),
            rightSectionData: `${ this.getLighting.fixtures.backlights } ${ this.$t("entity.data.abbrs.types") }`
          },
          {
            name: this.$t("entity.data.lighting.lightsInPark"),
            icon: "lighting/icon-tree.svg",
            data: this.getLighting.lanternsInPark.lanternsInPark,
            leftSectionName: this.$t("entity.data.lighting.lamp"),
            leftSectionData: this.getLighting.lanternsInPark.luminaire,
            rightSectionName: this.$t("entity.data.lighting.bollards"),
            rightSectionData: this.getLighting.lanternsInPark.bollardLighting
          },
          {
            name: this.$t("entity.data.lighting.colors"),
            icon: "lighting/color.svg",
            data: this.getLighting.backlightColors.backlightColors,
            leftSectionName: this.$t("entity.data.lighting.warm"),
            leftSectionData: this.getLighting.backlightColors.warm,
            rightSectionName: this.$t("entity.data.lighting.cold"),
            rightSectionData: this.getLighting.backlightColors.cold
          }
        ];
      },
			dataSum () {
				let sum = 0;
				for (let prop in this.getLighting.byType) {
					sum += +this.getLighting.byType[prop];
				}
				return sum;
			},
      dataList () {
				let arr = [];
				for (let prop in this.getLighting.byYear) {
					arr.push(this.getLighting.byYear[prop]);
				}
				return arr;
			},
			labelsList () {
				let arr = [];
				for (let prop in this.getLighting.byYear) {
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
					labels: this.labelsList,
					datasets: [{
						data: this.dataList,
            backgroundColor: "rgba(175, 111, 15, 0.1)",
            borderColor: "rgba(249, 205, 137, 1)"
					}]
				};
      }
    }
  };
</script>

