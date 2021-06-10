<template lang="pug">
  .column.container(:class="isMobile ? 'q-pa-md' : 'q-pa-lg'")
    .flex.full-width.col-grow(
      v-for="slide in slides"
      :key="slide.id"
      v-show="step === slide.id"
      :class="{'column reverse': isMobile}"
    )
      .col-md-6.column.justify-center.col-grow.q-px-xs(:class="{'half-width': !isMobile}")
        .title.q-mb-lg.col-grow.row.items-end
          | {{ slide.title }}
        .description.row.items-center(:class="{'col-grow': isMobile}")
          | {{ slide.description }}
        .row.items-start.nav-btns.q-mt-lg(:class="{'justify-center': isMobile}")
          .row.items-center
            q-btn.btn.q-mr-lg(
              color="primary"
              :label="$t('common.welcomePresentation.toMapBtn')"
              outline
            )
          .row.items-center
            q-btn.btn(
              v-if="!isLastStep"
              color="primary"
              :label="$t('common.welcomePresentation.nextSlideBtn')" 
              flat
              @click="$refs.stepper.next()"
            )
      .col-md-6.row.justify-center.items-center(:class="{'half-width': !isMobile}")
        .row.justify-center.items-center(:class="{'mobile-img-container': isMobile}")
          img(
            :src="slide.imgSrc"
            :class="{'mobile-img': isMobile}"
          )
    .flex.items-center.col-shrink(:class="{'column': isMobile}")
      div
        q-stepper.stepper(
          v-model="step"
          :animated="false"
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
      .flex.items-center.justify-end.col-grow
        img.q-mr-lg(src="@/assets/svg/logo-iiul.svg")
        img(src="@/assets/svg/logo-inno.svg")

</template>

<script>
  export default {
    name: "Presentation",
    data () {
      return {
        slides: [
          {
            id: 1,
            title: this.$t("common.welcomePresentation.firstSlide.title"),
            description: this.$t("common.welcomePresentation.firstSlide.description"),
            imgSrc: require("@/assets/svg/welcome/0.svg")
          },
          {
            id: 2,
            title: this.$t("common.welcomePresentation.secondSlide.title"),
            description: this.$t("common.welcomePresentation.secondSlide.description"),
            imgSrc: require("@/assets/svg/welcome/1.svg")
          },
          {
            id: 3,
            title: this.$t("common.welcomePresentation.thirdSlide.title"),
            description: this.$t("common.welcomePresentation.thirdSlide.description"),
            imgSrc: require("@/assets/svg/big-tablet.svg")
          },
          {
            id: 4,
            title: this.$t("common.welcomePresentation.fourthSlide.title"),
            description: this.$t("common.welcomePresentation.fourthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/3.svg")
          },
          {
            id: 5,
            title: this.$t("common.welcomePresentation.fifthSlide.title"),
            description: this.$t("common.welcomePresentation.fifthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/4.svg")
          },
          {
            id: 6,
            title: this.$t("common.welcomePresentation.sixthSlide.title"),
            description: this.$t("common.welcomePresentation.sixthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/5.svg")
          },
          {
            id: 7,
            title: this.$t("common.welcomePresentation.seventhSlide.title"),
            description: this.$t("common.welcomePresentation.seventhSlide.description"),
            imgSrc: require("@/assets/svg/welcome/6.svg")
          },
          {
            id: 8,
            title: this.$t("common.welcomePresentation.eighthSlide.title"),
            description: this.$t("common.welcomePresentation.eighthSlide.description"),
            imgSrc: require("@/assets/svg/welcome/7.svg")
          },
          {
            id: 9,
            title: this.$t("common.welcomePresentation.ninthSlide.title"),
            description: this.$t("common.welcomePresentation.ninthSlide.description"),
            imgSrc: require("@/assets/svg/lady-tablet.svg")
          }
        ],
        step: 1
      };
    },
    computed: {
      stepsCount () {
        return this.slides.length;
      },
      isMobile () {
        return this.$q.platform.is.mobile;
      },
      isLastStep () {
        return this.slides.length === this.step;
      }
    }
  };
</script>

<style lang="stylus" scoped>
.container
  background-color: #FFFFFF
  height: calc(100vh - 50px)
  .nav-btns
    height: 40vh
  .description
    height: 10vh
    text-align: center

  @media (min-width: 1921px)
    .title
      font-size: 4rem
      font-weight: 600
    .description
      font-size: 2rem
    .btn
      font-size: 2rem
      max-height: 100%

  @media (max-width: 1920px)
    .title
      font-size: 1.6rem
      font-weight: 600
    .description
      font-size: 1rem
    .btn
      font-size: 1rem
      max-height: 100%
  
  @media (max-width: $breakpoint-md-max)
    .title
      font-size: 1.2rem
      font-weight: 600
      margin-bottom: 1rem
    .description
      font-size: .8rem
    .btn
      font-size: .8rem
      max-height: 100%
    .nav-btns
      height: inherit

  .half-width
    width: 50%
  .mobile-img-container
    height: 35vh
    .mobile-img
      width: 100%
      height: 100%
  ::v-deep .q-stepper__step-inner
    padding: 0px
    
  @media only screen and (max-width: $breakpoint-md-max)
    ::v-deep .q-stepper__tab
      padding: .6rem

    ::v-deep .q-stepper__dot
      width: .5rem
      height: .5rem
      min-width: .5rem
</style>