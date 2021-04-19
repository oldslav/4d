<template lang="pug">
  .error404.fullscreen.column
    h1.error404__heading {{ $t("common.error[404]") }}
    .error404__text
      p.error404__label {{ $t("common.message.notFound.top") }}
      p.error404__label {{ $t("common.message.notFound.bottom") }}
    a(@click="goBack()").error404__link {{ $t("common.action.goBack") }}
    q-img.error404__image(src="@/assets/svg/404.svg")
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
    align-items center
    justify-content flex-start
    padding-top 70px

    &__heading {
      font-size 36px
      font-weight normal
    }

    &__image {
      max-width 660px
      margin-top 50px
    }

    &__text {
      text-align center
      margin 24px 0
    }

    &__label {
      margin 0
      padding 0
      color $grey
    }

    &__link {
      color $illustration-blue
      font-size 16px

      &:hover {
        cursor pointer
      }
    }
  }

  @media (max-width: $breakpoint-sm-min) {
    .error404__heading {
      font-size 24px
    }
  }
</style>
