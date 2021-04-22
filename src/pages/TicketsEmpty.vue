<template lang="pug">
  q-page.tickets-empty.column.items-center.justify-lg-center.full-height.q-pt-xl.bg-secondary-light
    h4.text-h4.text-center
      | {{ $t("employee.profile.tickets.empty.title") }}
    .text-subtitle.text-center.q-px-lg
      | {{ $t("employee.profile.tickets.empty.subtitle1") }}
      router-link.text-primary(to="/")
        | {{ $t("entity.services") }}
      | {{ $t("employee.profile.tickets.empty.subtitle2") }}
    q-img.tickets-empty__image.q-mt-xl(src="@/assets/svg/empty-placeholder.svg")
</template>

<script>
  export default {
    name: "TicketsEmpty"
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
