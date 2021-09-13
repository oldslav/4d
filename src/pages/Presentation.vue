<template lang="pug">
  q-page.presentation.bg-white.full-height.q-px-md.q-px-md-xl.q-pt-md.q-pt-md-xl
    .row.presentation__main.reverse-wrap-sm.reverse-wrap-xs(
        v-for="slide in slides"
        :key="slide.id"
        v-show="step === slide.id"
      )
      .col-12.col-md-6.column.flex.items-center.justify-center
        div.text-left.full-width
          .presentation__title.q-mb-xl
            | {{ slide.title }}
          .presentation__caption
            | {{ slide.description }}
          .presentation__controls.text-left.full-width.q-mt-xl
            q-btn(
              color="primary"
              :label="$t('common.welcomePresentation.toMapBtn')"
              outline
            ).q-mr-md
            q-btn(
              v-if="!isLastStep"
              color="primary"
              :label="$t('common.welcomePresentation.nextSlideBtn')"
              flat
              @click="step++"
            )
      .col-12.col-md-6.flex.items-center.justify-center
        img(:src="isDarkMode ? slide.imgDarkSrc : slide.imgSrc").presentation__image
    .presentation__footer.row.full-width.q-py-lg.items-center
      .col-12.col-md-6
        div
          q-stepper(
            v-model="step"
            ref="stepper"
            color="primary"
            animated
            swipeable
            header-nav
            flat
          ).bg-white
            q-step(
              v-for="slide in slides"
              :key="slide.id"
              :name="slide.id"
              :done="step > slide.id"
              active-icon="false"
              done-icon="false"
              title=""
            )
      .col-12.col-md-6.flex.items-center.justify-md-end.justify-center
        img.presentation__footer-image.q-mr-lg(src="@/assets/svg/logo-iiul.svg")
        img.presentation__footer-image(src="@/assets/svg/logo-inno.svg")
</template>

<script>
  export default {
    name: "Presentation",
    data () {
      return {
        step: 1
      };
    },
    computed: {
      slides () {
        return [
          {
            id: 1,
            title: this.$t("common.welcomePresentation.firstSlide.title"),
            description: this.$t("common.welcomePresentation.firstSlide.description"),
            imgSrc: require("@/assets/svg/welcome/0.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/0-dark.svg")
          },
          {
            id: 2,
            title: this.$t("common.welcomePresentation.secondSlide.title"),
            description: this.$t("common.welcomePresentation.secondSlide.description"),
            imgSrc: require("@/assets/svg/welcome/1.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/1-dark.svg")
          },
          {
            id: 3,
            title: this.$t("common.welcomePresentation.thirdSlide.title"),
            description: this.$t("common.welcomePresentation.thirdSlide.description"),
            imgSrc: require("@/assets/svg/welcome/2.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/2-dark.svg")
          },
          {
            id: 4,
            title: this.$t("common.welcomePresentation.fourthSlide.title"),
            description: this.$t("common.welcomePresentation.fourthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/3.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/3-dark.svg")
          },
          {
            id: 5,
            title: this.$t("common.welcomePresentation.fifthSlide.title"),
            description: this.$t("common.welcomePresentation.fifthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/4.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/4-dark.svg")
          },
          {
            id: 6,
            title: this.$t("common.welcomePresentation.sixthSlide.title"),
            description: this.$t("common.welcomePresentation.sixthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/5.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/5-dark.svg")
          },
          {
            id: 7,
            title: this.$t("common.welcomePresentation.seventhSlide.title"),
            description: this.$t("common.welcomePresentation.seventhSlide.description"),
            imgSrc: require("@/assets/svg/welcome/6.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/6-dark.svg")
          },
          {
            id: 8,
            title: this.$t("common.welcomePresentation.eighthSlide.title"),
            description: this.$t("common.welcomePresentation.eighthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/7.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/7-dark.svg")
          },
          {
            id: 9,
            title: this.$t("common.welcomePresentation.ninthSlide.title"),
            description: this.$t("common.welcomePresentation.ninthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/8.svg"),
            imgDarkSrc: require("@/assets/svg/welcome/8-dark.svg")
          }
        ];
      },
      isDarkMode () {
        return this.$q.dark.isActive;
      },
      isLastStep () {
        return this.slides.length === this.step;
      }
    }
  };
</script>

<style lang="stylus">
  .presentation {
    display flex
    flex-flow column

    ::v-deep .q-stepper__tab {
      padding: .6rem
    }

    ::v-deep .q-stepper__dot {
      width: .5rem
      height: .5rem
      min-width: .5rem
    }

    .presentation__title {
      font-size 30px
      line-height 44px
      font-weight bold
    }

    .presentation__caption {
      font-size 16px
      line-height 20px
    }

    .presentation__main {
      flex 1
    }

    .presentation__image {
      width 90%
      max-height 60vh
    }

    .presentation__footer-image {
      max-width 40%
    }

    .presentation__footer {
      .q-stepper__content {
        display: none;
      }
    }
  }

  @media (max-width: 1540px) {
    .q-stepper__tab {
      padding: .6rem
    }

    .q-stepper__dot {
      width: 1rem
      height: 1rem
      min-width: 1rem
    }
  }

  @media (max-width: 730px) {
    .q-stepper__dot {
      width: .6rem
      height: .6rem
      min-width: .6rem
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    .q-stepper__dot {
      width: .4rem
      height: .4rem
      min-width: .4rem
    }
  }

  @media (max-width: $breakpoint-sm-max) {
    .presentation {
      .presentation__title {
        font-size 24px
        line-height 28px
      }

      .presentation__image {
        width 99%
        max-height 40vh
      }
    }
  }

</style>
