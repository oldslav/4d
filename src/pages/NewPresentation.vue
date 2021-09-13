<template lang="pug">
  q-page.presentation.bg-white.full-height.q-px-xl
    .row.presentation__main
      .col-12.col-md-6.column.flex.items-center.justify-center
        div.text-left
          .presentation__title.q-mb-xl
            | {{ currentSlide.title }}
          .presentation__caption
            | {{ currentSlide.description }}
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
        div(:style="{ backgroundImage: 'url(' + currentSlide.src + ')', width: '90%', height: '60vh', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }")
    .presentation__footer.full-width.q-py-lg.flex.items-center.justify-between.no-wrap
      div(:style="{flexShrink: '1'}")
        q-stepper(
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          swipeable
          header-nav
          flat
        )
          q-step(
            v-for="slide in slides"
            :key="slide.id"
            :name="slide.id"
            :done="step > slide.id"
            active-icon="false"
            done-icon="false"
            title=""
          )
      div
        img.q-mr-lg(src="@/assets/svg/logo-iiul.svg")
        img(src="@/assets/svg/logo-inno.svg")
</template>

<script>
  export default {
    data () {
      return {
        slides: [
          {
            id: 1,
            title: this.$t("common.welcomePresentation.firstSlide.title"),
            description: this.$t("common.welcomePresentation.firstSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/0-dark.svg") : require("@/assets/svg/welcome/0.svg")
          },
          {
            id: 2,
            title: this.$t("common.welcomePresentation.secondSlide.title"),
            description: this.$t("common.welcomePresentation.secondSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/1-dark.svg") : require("@/assets/svg/welcome/1.svg")
          },
          {
            id: 3,
            title: this.$t("common.welcomePresentation.thirdSlide.title"),
            description: this.$t("common.welcomePresentation.thirdSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/2-dark.svg") : require("@/assets/svg/big-tablet.svg")
          },
          {
            id: 4,
            title: this.$t("common.welcomePresentation.fourthSlide.title"),
            description: this.$t("common.welcomePresentation.fourthSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/3-dark.svg") : require("@/assets/svg/welcome/3.svg")
          },
          {
            id: 5,
            title: this.$t("common.welcomePresentation.fifthSlide.title"),
            description: this.$t("common.welcomePresentation.fifthSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/4-dark.svg") : require("@/assets/svg/welcome/4.svg")
          },
          {
            id: 6,
            title: this.$t("common.welcomePresentation.sixthSlide.title"),
            description: this.$t("common.welcomePresentation.sixthSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/5-dark.svg") : require("@/assets/svg/welcome/5.svg")
          },
          {
            id: 7,
            title: this.$t("common.welcomePresentation.seventhSlide.title"),
            description: this.$t("common.welcomePresentation.seventhSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/6-dark.svg") : require("@/assets/svg/welcome/6.svg")
          },
          {
            id: 8,
            title: this.$t("common.welcomePresentation.eighthSlide.title"),
            description: this.$t("common.welcomePresentation.eighthSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/7-dark.svg") : require("@/assets/svg/welcome/7.svg")
          },
          {
            id: 9,
            title: this.$t("common.welcomePresentation.ninthSlide.title"),
            description: this.$t("common.welcomePresentation.ninthSlide.description"),
            src: this.isDarkMode ? require("@/assets/svg/welcome/8-dark.svg") : require("@/assets/svg/lady-tablet.svg")
          }
        ],
        step: 1
      };
    },
    computed: {
      currentSlide () {
        return this.slides.find((s) => s.id === this.step);
      },
      isMobile () {
        return this.$q.platform.is.mobile;
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

    .presentation__title {
      font-size 36px
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

    .presentation__footer {
      .q-stepper__content {
        display: none;
      }
    }
  }
</style>
