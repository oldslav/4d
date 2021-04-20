<template lang="pug">
  .error404.column.justify-start.items-center.q-pt-xl.fullscreen
    h2.text-title.error404__title
      | {{ $t("common.error[404]") }}
    h3.text-subtitle.text-center.q-my-lg.q-px-sm
      div
        | {{ $t("common.error.notFound.topSub") }}
      div
        | {{ $t("common.error.notFound.bottomSub") }}
    a(@click="goBack()").text-subtitle.text-illustration-blue.error404__link
      | {{ $t("entity.action.goBack") }}
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
    background-color $illustration-light-blue

    &__image {
      max-width 660px
    }

    &__link {
      &:hover {
        cursor pointer
      }
    }
  }

  @media (max-width: $breakpoint-sm-min) {
    .error404__title {
      font-size 24px
    }
  }
</style>
