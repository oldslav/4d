<template lang="pug">
  .about.full-width.full-height.bg-white
    .about__model.row.q-py-xl.q-px-md.q-px-md-xl
      .col-12.col-md-6.flex.items-center.justify-center
        img.about__model-image(:src="ladyImg")
      .col-12.col-md-6.flex.justify-center.items-center.q-mt-sm-lg
        div
          h2.about__header.q-mb-md
            | {{$t("entity.about.model.title")}}
          .about__caption-large
            | {{$t("entity.about.model.caption")}}
    .about__inno.bg-blue.row.q-py-xl.q-col-gutter-lg.q-px-md.q-px-md-xl
      img.about__inno-image(:src="noonImg")
      .col-12.col-md-6.flex.items-center.justify-center.z-fab
        div
          h2.about__header.text-primary
            | {{$t("entity.about.inno.title")}}
          .about__caption-large
            | {{$t("entity.about.inno.caption")}}
      .col-12.col-md-6.flex.items-center.z-fab
        div.flex.column.justify-between
          .about__stats(v-for="(stat, index) in innoInfo" :key="index").q-mb-md
            .about__subtitle.no-margin.text-weight-bold
              | {{ stat.amount }}
            .about__caption-small
              | {{ stat.caption }}
            q-separator(v-if="index < innoInfo.length - 1").q-mt-lg
    .about__sections.relative-position.q-py-xl.q-px-md.q-px-md-xl
      img.about__sections-blob.rotate-180(:src="blobImg")
      h2.about__header.z-fab
        | {{$t("entity.about.sections.title")}}
      .about__cards.z-fab
        q-card.about__card.bg-card.flex.column.justify-around(v-for="(card, index) in sections" :key="index" @click="goTo(card.name)")
          img.about__card-image.q-px-md(:src="card.image")
          q-card-section
            .about__caption-medium.text-weight-bold
              | {{ card.title }}
    .about__services.relative-position.q-py-xl.q-px-md.q-px-md-xl
      img.about__services-blob(:src="blobImg")
      img.about__services-image(:src="bigTabletImg")
      h2.about__header.z-fab
        | {{$t("entity.about.service.title")}}
      .about__caption-medium.q-mb-md
        | {{ $t("entity.about.service.subtitle") }}
      .about__services-grid.z-fab
        .row(v-for="(service, index) in services" :key="index").z-fab.items-start
          .col-2
            .about__title.text-primary.text-weight-bold
              | {{ `0${index + 1}` }}
          .col-10
            .about__subtitle.text-weight-bold.q-mb-lg
              | {{ service.title }}
            .about__caption-medium
              | {{ service.caption }}
    .about__map.q-py-xl.flex.items-center.justify-center.q-px-md
      q-btn(:label="$t('entity.about.toMap')" outline color="primary" @click="goTo('map')").q-px-lg.text-no-wrap
</template>

<script>
  export default {
    name: "About",
    computed: {
      isDarkMode () {
        return this.$q.dark.isActive;
      },
      ladyImg () {
        return this.isDarkMode ? require("assets/svg/dark/lady-tablet-dark.svg") : require("@/assets/svg/light/lady-tablet.svg");
      },
      noonImg () {
        return this.isDarkMode ? require("@/assets/svg/dark/noon-dark.svg") : require("@/assets/svg/light/noon.svg");
      },
      blobImg () {
        return this.isDarkMode ? require("@/assets/svg/dark/blob-dark.svg") : require("@/assets/svg/light/blob.svg");
      },
      bigTabletImg () {
        return this.isDarkMode ? require("@/assets/svg/dark/big-tablet-dark.svg") : require("@/assets/svg/light/big-tablet.svg");
      },
      innoInfo () {
        return [
          {
            caption: this.$t("entity.about.inno.people"),
            amount: "3500"
          },
          {
            caption: this.$t("entity.about.inno.companies"),
            amount: "158"
          },
          {
            caption: this.$t("entity.about.inno.events"),
            amount: "130"
          }
        ];
      },
      sections () {
        return [
          {
            title: this.$t("entity.estate.title"),
            image: this.isDarkMode ? require("@/assets/svg/dark/building-dark.svg") : require("@/assets/svg/light/building.svg"),
            name: ""
          },
          {
            title: this.$t("entity.transport"),
            image: this.isDarkMode ? require("@/assets/svg/dark/two-wheels-dark.svg") : require("@/assets/svg/light/two-wheels.svg"),
            name: ""
          },
          {
            title: this.$t("entity.landscape"),
            image: this.isDarkMode ? require("@/assets/svg/dark/benches-dark.svg") : require("@/assets/svg/light/benches.svg"),
            name: ""
          },
          {
            title: this.$t("entity.lighting"),
            image: this.isDarkMode ? require("@/assets/svg/dark/city-lights-dark.svg") : require("@/assets/svg/light/city-lights.svg"),
            name: ""
          },
          {
            title: this.$t("entity.tourism"),
            image: this.isDarkMode ? require("@/assets/svg/dark/hike-dark.svg") : require("@/assets/svg/light/hike.svg"),
            name: ""
          },
          {
            title: this.$t("entity.ideas"),
            image: this.isDarkMode ? require("@/assets/svg/dark/lady-tag-dark.svg") : require("@/assets/svg/light/lady-tag.svg"),
            name: ""
          },
          {
            title: this.$t("entity.planning"),
            image: this.isDarkMode ? require("@/assets/svg/dark/big-phone-dark.svg") : require("@/assets/svg/light/big-phone.svg"),
            name: ""
          },
          {
            title: this.$t("entity.engineering"),
            image: this.isDarkMode ? require("@/assets/svg/dark/chart-dark.svg") : require("@/assets/svg/light/chart.svg"),
            name: ""
          },
          {
            title: this.$t("entity.environment"),
            image: this.isDarkMode ? require("@/assets/svg/dark/bushes-dark.svg") : require("@/assets/svg/light/bushes.svg"),
            name: ""
          },
          {
            title: this.$t("entity.safety"),
            image: this.isDarkMode ? require("@/assets/svg/dark/city-lock-dark.svg") : require("@/assets/svg/light/city-lock.svg"),
            name: ""
          }
        ];
      },
      services () {
        return [
          {
            title: this.$t("entity.about.service.estate.title"),
            caption: this.$t("entity.about.service.estate.caption")
          },
          {
            title: this.$t("entity.about.service.commercialEstate.title"),
            caption: this.$t("entity.about.service.commercialEstate.caption")
          },
          {
            title: this.$t("entity.about.service.parking.title"),
            caption: this.$t("entity.about.service.parking.caption")
          },
          {
            title: this.$t("entity.about.service.tires.title"),
            caption: this.$t("entity.about.service.tires.caption")
          },
          {
            title: this.$t("entity.about.service.ideas.title"),
            caption: this.$t("entity.about.service.ideas.caption")
          },
          {
            title: this.$t("entity.about.service.jobs.title"),
            caption: this.$t("entity.about.service.jobs.caption")
          }
        ];
      }
    },
    methods: {
      goTo (name) {
        this.$router.push({ name });
      }
    }
  };
</script>

<style lang="stylus">
  .about {
    &__header {
      font-weight 600
      font-size 32px
    }

    &__caption-large {
      font-weight normal
      font-size 24px
    }

    &__caption-medium {
      font-size 20px
    }

    &__caption-small {
      font-weight normal
      font-size 16px
    }

    &__title {
      font-size 36px
    }

    &__subtitle {
      font-size 24px
    }

    &__model {
      min-height calc(100vh - 50px)
    }

    &__model-image {
      max-width 90%
    }

    &__inno {
      position relative
    }

    &__inno-image {
      position absolute
      bottom 0
      right 0
      max-width 50%
    }

    &__sections-blob {
      position absolute
      left -200px
      bottom -200px
      max-width 90%
    }

    &__cards {
      display grid
      grid-gap 1rem
      grid-template-columns: repeat(5, 1fr)
      grid-auto-rows: 1fr
    }

    &__services-image {
      position absolute
      bottom 48px
      right 48px
      max-width 90%
    }

    &__services-blob {
      position absolute
      right 48px
      bottom 96px
      max-width 50%
    }

    &__services-grid {
      display grid
      grid-gap 54px
      grid-auto-flow: column;
      grid-template-columns repeat(2, 1fr)
      grid-template-rows repeat(4, 1fr)
    }

    &__item {
      display flex
      justify-content space-between
      flex-wrap nowrap
      width 100%
    }
  }


  @media (max-width: $breakpoint-md-max) {
    .about__services-image {
      max-width 40%
    }

    .about__caption-large {
      font-size 20px
    }

    .about__caption-medium {
      font-size 16px
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    .about__model-image {
      max-width 100%
    }

    .about__title {
      font-size 24px
    }

    .about__model {
      min-height unset
    }

    .about__cards {
      grid-template-columns: repeat(2, 1fr)
    }

    .about__services-grid {
      grid-template-columns repeat(1, 1fr)
      grid-template-rows repeat(6, 1fr)
    }

    .about__inno-image {
      max-width 90%
    }

    .about__services-blob {
      max-width 80%
      right 0
    }

    .about__services-image {
      display none
    }

    @media (max-width: 400px) {
      .about__cards {
        grid-template-columns: repeat(1, 1fr)
      }
    }
  }
</style>
