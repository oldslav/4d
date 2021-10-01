<template lang="pug">
  .data-statistic.fit
    .row.q-px-md.q-py-md.gt-sm.items-center
      .col
        h1.text-subtitle
          | {{ $t("entity.data.statistic") }}
      .col.text-right
        span.text-grey-7
          | {{ today }}

    .q-mx-md-md
      DataWeather(
        :weather="getWeather"
        :today="today"
      )

    .q-mx-md.q-my-lg
      .row.q-mt-sm.q-col-gutter-md
        .col-12.col-sm-6.col-lg-3(
          v-for="(card, index) in cards"
          :key="index"
        )
          q-card.overflow-hidden.text-center.q-pa-md.row.column.full-height
            .col-auto
              img.data-statistic__card-img(
                :src="require(`@/assets/svg/data/${ card.icon }`)"
              )
            .col-auto.text-subtitle.q-mt-md
              | {{ card.data }}
            .col-grow.row.justify-center.items-center.q-mt-xs
              | {{ card.name }}
</template>

<script>
  import { GET_DATA_MAIN_PAGE } from "@/store/constants/action-constants";
  import { mapGetters } from "vuex";
  import DataWeather from "@/components/data/DataWeather.vue";

  export default {
    name: "DataStatistic",
    components: {
      DataWeather
    },
    preFetch ({ store }) {
      return store.dispatch(`data/${ GET_DATA_MAIN_PAGE }`);
    },
    mounted () {
      this.timer = setInterval(() => {
        this.date = new Date();
      }, 1000);
    },
    unmounted () {
      clearInterval(this.timer);
    },
    data () {
      return {
        date: new Date(),
        timer: null
      };
    },
    computed: {
      ...mapGetters("data", [
        "getWeather",
        "getNewObject",
        "getNewIdeas",
        "getNewProblems",
        "getBicycleForRent"
      ]),
      cards () {
        return [
          {
            name: this.$t("entity.data.crads.newObject"),
            data: "test",
            icon: "newObject.svg"
          },
          {
            name: this.$t("entity.data.crads.newIdeas"),
            data: `+ ${ this.getNewIdeas }`,
            icon: "newIdeas.svg"
          },
          {
            name: this.$t("entity.data.crads.newProblems"),
            data: `+ ${ this.getNewProblems }`,
            icon: "newProblems.svg"
          },
          {
            name: this.$t("entity.data.crads.bicycleForRent"),
            data: `${ this.getBicycleForRent } шт`,
            icon: "bicycleForRent.svg"
          }
        ];
      },
      today () {
        return `${ this.getFormattedTime(this.date.getHours()) }:${ this.getFormattedTime(this.date.getMinutes()) },
								${ this.date.getDate() } ${ this.getMonthName(this.date.getMonth()) },
								${ this.date.getFullYear() }`;
      }
    },
    methods: {
      getMonthName (monthId) {
        const month = [
          this.$t("entity.data.months.jan"),
          this.$t("entity.data.months.feb"),
          this.$t("entity.data.months.mar"),
          this.$t("entity.data.months.apr"),
          this.$t("entity.data.months.may"),
          this.$t("entity.data.months.jun"),
          this.$t("entity.data.months.jul"),
          this.$t("entity.data.months.aug"),
          this.$t("entity.data.months.sep"),
          this.$t("entity.data.months.oct"),
          this.$t("entity.data.months.nov"),
          this.$t("entity.data.months.dec")
        ];

        return month[monthId];
      },
      getFormattedTime (time) {
        return time >= 10
          ? time
          : `0${ time }`;
      }
    }
  };
</script>

<style lang="stylus">
  .data-statistic
    &__card-img
      max-width 100%
      height: 125px
      object-fit cover
</style>

