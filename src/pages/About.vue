<template lang="pug">
  .about.full-width.full-height.bg-white
    .about__model.row.q-pa-xl
      .col-12.col-md-6.flex.items-center.justify-center
        img.about__model-image(src="@/assets/svg/lady-tablet.svg")
      .col-12.col-md-6.q-px-md.flex.justify-center.items-center
        div
          h1.about__header
            | {{$t("entity.about.model.title")}}
          .about__caption-large
            | {{$t("entity.about.model.caption")}}
    .about__inno.row.q-pa-xl.q-col-gutter-lg
      img.about__inno-image(src="@/assets/svg/noon.svg")
      .col-12.col-md-6.flex.items-center.justify-center.z-fab
        div
          h2.about__title.text-primary
            | {{$t("entity.about.inno.title")}}
          .about__caption-large
            | {{$t("entity.about.inno.caption")}}
      .col-12.col-md-6.flex.items-center.z-fab
        div.flex.column.justify-between
          .about__stats(v-for="(stat, index) in innoInfo" :key="index")
            h2.about__title.q-my-sm
              | {{ stat.amount }}
            .about__caption-small
              | {{ stat.caption }}
            q-separator(v-if="index < innoInfo.length - 1").q-mt-lg
    .about__sections.relative-position.q-pa-xl
      img.about__sections-blob.rotate-180(src="@/assets/svg/blob.svg")
      h2.about__title.z-fab
        | {{$t("entity.about.sections.title")}}
      .about__cards.z-fab
        q-card.cursor-pointer.about__card.flex.column.justify-around(v-for="(card, index) in sections" :key="index" @click="goTo(card.name)")
          img.about__card-image.q-px-md(:src="card.image")
          q-card-section
            .about__caption-medium.text-weight-bold
              | {{ card.title }}
    .about__services.relative-position.q-pa-xl
      img.about__services-blob(src="@/assets/svg/blob.svg")
      img.about__services-image(src="@/assets/svg/big-tablet.svg")
      h2.about__title.z-fab
        | {{$t("entity.about.service.title")}}
      .about__services-grid.z-fab
        .row(v-for="(service, index) in services" :key="index").z-fab
          .col-2
            .about__header.text-primary
              | {{ `0${index + 1}` }}
          .col-10
            .about__title
              | {{ service.title }}
            .about__caption-medium
              | {{ service.caption }}
    .about__map.q-pa-xl.flex.items-center.justify-center
      q-btn(:label="$t('entity.about.toMap')" outline color="primary" @click="goTo('map')").q-px-xl
</template>

<script>
  export default {
    name: "About",
    computed: {
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
            title: this.$t("entity.about.sections.estate"),
            image: require("@/assets/svg/building.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.transport"),
            image: require("@/assets/svg/two-wheels.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.landscape"),
            image: require("@/assets/svg/benches.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.lighting"),
            image: require("@/assets/svg/lights.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.tourism"),
            image: require("@/assets/svg/hike.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.ideas"),
            image: require("@/assets/svg/lady-tag.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.planning"),
            image: require("@/assets/svg/big-phone.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.engineering"),
            image: require("@/assets/svg/chart.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.environment"),
            image: require("@/assets/svg/bushes.svg"),
            name: ""
          },
          {
            title: this.$t("entity.about.sections.safety"),
            image: require("@/assets/svg/city-lock.svg"),
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
      // eslint-disable-next-line no-unused-vars
      goTo (name) {
        // this.$router.push({ name });
      }
    }
  };
</script>

<style lang="stylus">
  .about {
    &__header {
      font-weight 600
      font-size 69px
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
      font-size 40px
    }

    &__model {
      min-height calc(100vh - 50px)
    }

    &__model-image {
      max-width 90%
    }

    &__inno {
      background-color $illustration-light
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

    @media (max-width: 1400px) {
      .about__header {
        font-size 32px
      }

      .about__title {
        font-size 24px
      }

      .about__caption-large {
        font-size 20px
      }

      .about__caption-medium {
        font-size 16px
      }
    }

    @media (max-width: 900px) {
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
    }
  }
</style>
