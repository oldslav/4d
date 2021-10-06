<template lang="pug">
	.data-environment.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection
				template(#left)
					| test1
				template(#right)
					| test2

		.q-mx-sm.q-py-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
  import DataCarousel from "@/components/data/DataCarousel.vue";
  import DataMainSection from "@/components/data/DataMainSection.vue";
  import BtnBack from "@/components/data/BtnBack.vue";
  import { GET_DATA_MAIN_PAGE } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";

  export default {
    name: "DataEnvironment",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_MAIN_PAGE }`);
    },
    computed: {
      ...mapGetters("data", [
        "getWeather"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.weather.humidity"),
            icon: "environment/humidity.svg",
            data: `${ this.getWeather[Object.keys(this.getWeather)[0]].humidity } %`,
            leftSectionName: this.$t("entity.data.weather.feeling"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.weather.dewPoint"),
            rightSectionData: `${ this.getWeather[Object.keys(this.getWeather)[0]].dewPoint } °C`
          },
          {
            name: this.$t("entity.data.weather.precipitation"),
            icon: "environment/rain.svg",
            data: this.precipitation(0).name,
            leftSectionName: this.$t("entity.data.environment.note"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.environment.number"),
            rightSectionData: `${ this.getWeather[Object.keys(this.getWeather)[0]].precipitationIntensity } ${ this.$t("entity.data.abbrs.mmh") }`
          },
          {
            name: this.$t("entity.data.weather.airPressure"),
            icon: "environment/pressure.svg",
            data: `${ this.getWeather[Object.keys(this.getWeather)[0]].airPressure } ${ this.$t("entity.data.abbrs.mmhg") }`,
            leftSectionName: this.$t("entity.data.environment.norm"),
            leftSectionData: 760,
            rightSectionName: this.$t("entity.data.weather.dewPoint"),
            rightSectionData: `${ this.getWeather[Object.keys(this.getWeather)[0]].dewPoint } °C`
          },
          {
            name: this.$t("entity.data.weather.humidity"),
            icon: "environment/windSpeed.svg",
            data: `${ this.getWeather[Object.keys(this.getWeather)[0]].windVelocity } ${ this.$t("entity.data.abbrs.ms") }`,
            leftSectionName: this.$t("entity.data.weather.direction"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.weather.feeling"),
            rightSectionData: "data"
          }
        ];
      }
    },
    methods: {
      precipitation (index) {
        let precipitationType = +this.getWeather[Object.keys(this.getWeather)[index]].precipitationType;
        
        if (precipitationType >= 0 && precipitationType < 10) {
          return {
            type: 0,
            name: this.$t("entity.data.weather.dry")
          };
        }
        else if (precipitationType >= 10 && precipitationType < 20) {
          return {
            type: 1,
            name: this.$t("entity.data.weather.rain")
          };
        }
        else if (precipitationType >= 20 && precipitationType < 30) {
          return {
            type: 2,
            name: this.$t("entity.data.weather.snow")
          };
        }
        else if (precipitationType >= 30 && precipitationType < 40) {
          return {
            type: 2,
            name: this.$t("entity.data.weather.snowWithRain")
          };
        }
        else if (precipitationType >= 40 && precipitationType < 50) {
          return {
            type: 2,
            name: this.$t("entity.data.weather.strongSnow")
          };
        }
      }
    }
  };
</script>

