<template lang="pug">
  q-page.requests-empty.column.items-center.justify-lg-center.full-height.q-pt-xl.bg-secondary-light
    h3.requests-empty__title.text-center
      | У вас пока нет ни одной заявки
    .text-subtitle.text-center.q-px-lg
      | Вы можете перейти в раздел
      span.q-mx-xs
        router-link.text-primary(to="/")
          | Сервисы
      | и ознакомиться с возможностями и предложениями Иннополиса
    q-img.requests-empty__image.q-mt-xl(src="@/assets/svg/empty-placeholder.svg")
</template>

<script>
  export default {
    name: "RequestsEmpty"
  };
</script>

<style lang="stylus">
  .requests-empty {
    &__title {
      font-size 24px
    }

    &__image {
      max-width 650px
    }
  }
  @media (max-width: $breakpoint-sm-min) {
    .requests-empty__title {
      font-size 20px
    }
  }
</style>
