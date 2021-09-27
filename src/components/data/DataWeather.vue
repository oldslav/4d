<template lang="pug">
  .weather(
    :class="{ \
      '--dry': precipitation(0).type === 0, \
      '--rain': precipitation(0).type === 1, \
      '--snow': precipitation(0).type === 2, \
    }"
  )
    .weather__today.row.column.justify-center.items-center.text-center(
      :class="{ \
        '--dry': precipitation(0).type === 0, \
        '--rain': precipitation(0).type === 1, \
        '--snow': precipitation(0).type === 2, \
      }"
    )
      .weather__today-info.text-black
        .row.lt-sm.q-my-sm-xs
          .col
            | {{ today }} 
        .row.q-my-sm-xs
          .col.text-no-wrap
            span.weather__today-temp {{ tempFormatted(0) }} 
            span.weather__today-deg &deg;C
        .row.q-my-sm-xs
          .col.text-no-wrap.gt-xs
            | {{ $t("entity.data.weather.precipitation") }}
          .col.weather__today-data.q-ml-sm-xl
            | {{ precipitation(0).name }}
        .row.q-my-sm-xs.gt-xs
          .col.text-no-wrap
            | {{ $t("entity.data.weather.precipitationNumber") }}
          .col.weather__today-data.q-ml-sm-xl
            | {{ weather[Object.keys(weather)[0]].precipitationIntensity }} мм/ч
        .row.q-my-sm-xs.gt-xs
          .col.text-no-wrap
            | {{ $t("entity.data.weather.humidity") }}
          .col.weather__today-data
            | {{ weather[Object.keys(weather)[0]].humidity }} %
        .row.q-my-sm-xs.gt-xs
          .col.text-no-wrap
            | {{ $t("entity.data.weather.airPressure") }}
          .col.weather__today-data
            | {{ weather[Object.keys(weather)[0]].airPressure }} мм рт. ст.
        .row.q-my-sm-xs.gt-xs
          .col.text-no-wrap
            | {{ $t("entity.data.weather.windVelocity") }}
          .col.weather__today-data
            | {{ weather[Object.keys(weather)[0]].windVelocity }} м/с

    q-card.weather__dates.q-px-md.q-px-sm-lg.q-py-sm
      .lt-sm.row.q-my-md
        .col
          div
            .weather__info-name {{ $t("entity.data.weather.precipitation") }}
            div {{ weather[Object.keys(weather)[0]].precipitationIntensity }} мм/ч

          .q-mt-sm
            .weather__info-name {{ $t("entity.data.weather.windVelocity") }}
            div {{ weather[Object.keys(weather)[0]].windVelocity }} м/с
          
          .q-mt-sm
            .weather__info-name {{ $t("entity.data.weather.airPressure") }}
            div {{ weather[Object.keys(weather)[0]].airPressure }} мм рт. ст.
        .col
          div
            .weather__info-name {{ $t("entity.data.weather.humidity") }}
            div {{ weather[Object.keys(weather)[0]].humidity }} %
          
          .q-mt-sm
            .weather__info-name {{ $t("entity.data.weather.windDirection") }}
            div {{ weather[Object.keys(weather)[0]].windVelocity }} %
      q-separator.lt-sm

      .weather__per-day.q-mt-sm.q-mb-xs.q-mb-sm-sm
        .weather__day.q-my-xs(
          v-for="(value, name, index) in weather"
          :key="name"
          :class="{hidden: index === 0}"
        )
          .weather__day-weather--left
            | {{ name.split("-")[2] }}.{{ name.split("-")[1] }}

          q-separator.gt-xs.q-my-sm

          .weather__day-weather--center
            img(
              v-if="precipitation(index).type === 0"
              :src="require('@/assets/svg/data/sun.svg')"
              class="weather__prec-img"
            )
            img(
              v-if="precipitation(index).type === 1"
              :src="require('@/assets/svg/data/rain.svg')"
              class="weather__prec-img"
            )
            .q-ml-sm
              .gt-xs
                | {{ tempFormatted(index) }} &deg;C
              .text-grey-7
                | {{ precipitation(index).name }}

          .weather__day-weather--right.lt-sm
            | {{ tempFormatted(index) }} &deg;C

</template>

<script>
	export default {
		name: "DataWeather",
    props: {
      weather: {
        type: Object,
        default () {
          return {};
        }
      },
      today: {
        type: String,
        default () {
          return "";
        }
      }
    },
    methods: {
      tempFormatted (index) {
        let temp = +this.weather[Object.keys(this.weather)[index]].temp;

        return temp > 0 
          ? `+${ Math.round(temp) }`
          : `${ Math.round(temp) }`;
      },
      precipitation (index) {
        let precipitationType = +this.weather[Object.keys(this.weather)[index]].precipitationType;
        
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

<style lang="stylus">
  .weather
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 
                0 2px 2px rgba(0, 0, 0, 0.14), 
                0 3px 1px -2px rgba(0, 0, 0, 0.12)
    border-radius: 4px
    position: relative

    &.--dry
      background linear-gradient(180deg, #FFB36C 0%, #FFDFC1 100%)

    &.--rain
      background linear-gradient(180deg, #42D7EE 0%, #B1F5FF 100%)

    &.--snow
      background linear-gradient(180deg, #64B1FF 0%, #B9DCFF 100%)

    &__today
      background-repeat no-repeat
      background-size auto 100%
      background-position bottom -45px left 0
      height: 180px

      @media (min-width $breakpoint-sm-min)
        background-position bottom -60px left 0
        height 300px

      &.--dry
        background-image url('../../assets/svg/data/dryWeather.svg')

      &.--rain
        background-image url('../../assets/svg/data/rainWeather.svg')
        background-position bottom 0 left 0
        
        @media (min-width $breakpoint-sm-min)
          background-position bottom -30px left 0
      
      &.--snow
        background-image url('../../assets/svg/data/snowWeather.svg')
        //background-size 100% auto
        background-position bottom -20px left 0

        @media (min-width $breakpoint-sm-min)
          background-position 0 -5px

    &__today-info
      @media (min-width $breakpoint-sm-min)
        position: absolute
        top 10px
        right 50px
        text-align left

    &__today-temp
      line-height 1.2
      font-size 48px

      @media (min-width $breakpoint-sm-min)
        line-height 1.5
    
    &__today-deg
      line-height 1.2
      font-size 48px

     &__today-data
      @media (min-width $breakpoint-sm-min)
        text-align right

    &__dates
      box-shadow none

      @media (min-width $breakpoint-sm-min)
        line-height 1.5
        font-size 14px

    &__info-name
      color: #666666;

    &__prec-img
      width 30px
      height 30px

      @media (min-width $breakpoint-sm-min)
        width 40px
        height 40px   

    &__per-day
      display flex
      flex-direction column-reverse

      @media (min-width $breakpoint-sm-min)
        flex-direction row-reverse
        justify-content center
        align-items center

    &__day
      display flex
      justify-content center
      align-items center

      @media (min-width $breakpoint-sm-min)
        display block
        flex 1 1 auto

    &__day-weather
      flex 1 1 0

      &--left
        @extends .weather__day-weather

        @media (min-width $breakpoint-sm-min)
          text-align center

      &--center
        @extends .weather__day-weather
        text-align center
        display flex
        justify-content center
        align-items center

        @media (min-width $breakpoint-sm-min)
          text-align center
      
      &--right
        @extends .weather__day-weather
        text-align right

        @media (min-width $breakpoint-sm-min)
          text-align center
      
</style>