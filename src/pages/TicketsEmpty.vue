<template lang="pug">
  q-page.tickets-empty.column.items-center.justify-lg-center.full-height.q-pt-xl.bg-secondary-light
    h4.text-h4.text-center
      | {{ $t("user.tickets.empty.title") }}
    .text-subtitle.text-center.q-px-lg
      | {{ $t("user.tickets.empty.subtitle1") }}
      router-link.text-primary(to="/")
        | {{ $t("entity.services.title") }}
      | {{ $t("user.tickets.empty.subtitle2") }}
    q-img.tickets-empty__image.q-mt-xl(:src="tagImg")
</template>

<script>
  export default {
    name: "TicketsEmpty",
    computed: {
      isDarkMode () {
        return this.$q.dark.isActive;
      },
      tagImg () {
        return this.isDarkMode ? require("@/assets/svg/dark/lady-tag-dark.svg") : require("@/assets/svg/light/lady-tag.svg");
      }
    }
  };
</script>

<style lang="stylus">
  .tickets-empty {
    &__image {
      max-width 650px
    }
  }

  @media (max-width: $breakpoint-sm-min) {
    .tickets-empty__title {
      font-size $h5
    }
  }
</style>
