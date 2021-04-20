<template lang="pug">
  q-page.error404.column.justify-start.items-center.q-pt-xl.full-height.bg-secondary-light
    h2.text-title.error404__title
      | {{ $t("common.error.notFound.title") }}
    h3.text-subtitle.text-center.q-my-lg.q-px-sm
      div
        | {{ $t("common.error.notFound.topSub") }}
      div
        | {{ $t("common.error.notFound.bottomSub") }}
    q-btn(flat @click="goBack()" color="primary" :label="$t('entity.action.goBack')")
    q-img.q-mt-xl.error404__image(src="@/assets/svg/404.svg")
</template>

<script>
  export default {
    name: "Error404",
    methods: {
      goBack () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="stylus">
  .error404 {
    &__image {
      max-width 660px
    }
  }

  @media (max-width: $breakpoint-sm-min) {
    .error404__title {
      font-size 24px
    }
  }
</style>
