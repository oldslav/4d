<template lang="pug">
  div.flex.column.full-height
    q-list
      q-item.q-py-lg.text-subtitle.no-margin(clickable @click="$router.back()")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ $t("action.back") }}
      q-separator
      div.q-px-md.q-pt-md
        .row.items-center.justify-between.no-wrap
          .text-body1
            | Адрес
          .text-body1.text-primary
            | {{ `${getCurrentPlace.address.street} ${getCurrentPlace.address.house}` }}
        q-separator.q-my-md
        .row.items-center.justify-between
          .text-body1.text-primary-light
            | Стоимость аренды, руб.
          .text-body1
            | {{ actualPrice }}
        .row.items-center.justify-between.q-mt-md
          .text-body1.text-primary-light
            | Минимальный срок аренды, мес.
          .text-body1
            | {{ getCurrentPlace.minRentPeriod }}
        q-separator.q-my-md
        .row.items-center.justify-between
          .text-body1.text-primary-light
            | Площадь, кв.м.
          .text-body1
            | {{ getCurrentPlace.area }}
        .row.items-center.justify-between.q-mt-md
          .text-body1.text-primary-light
            | Количество помещений
          .text-body1
            | {{ getCurrentPlace.premisesCount }}
        .row.items-center.justify-between.q-mt-md
          .text-body1.text-primary-light
            | Высота потолка, м
          .text-body1
            | {{ getCurrentPlace.ceilingHeight }}
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "AsideServicesCommercePlace",
    computed: {
      ...mapGetters("services/commerce", ["getCurrentPlace"]),
      actualPrice () {
        const { area, rentPrice } = this.getCurrentPlace;
        return Math.ceil(area * rentPrice);
      }
    }
  };
</script>
