<template lang="pug">
  div.flex.column.full-height
    q-list
      q-item.q-py-lg.text-subtitle.no-margin(clickable @click="$router.back()")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ $t("action.back") }}
      q-separator
      q-tabs(v-model="currentTab")
        q-tab(name="tires" :label="$t('entity.services.warehouse.tabs.tires')")
        q-tab(name="bikes" :label="$t('entity.services.warehouse.tabs.bicycles')")
      q-tab-panels(v-model="currentTab")
        q-tab-panel(name="tires")
          .text-caption.text-primary-light
            | Адрес
          q-item.q-px-none.q-mb-md.items-start
            q-item-section
              q-item-label
                | ул. Спортивная, 130, паркинг
          .text-caption.text-primary-light
            | Время работы
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | Сезон (весна, осень)
            q-item-section.text-right
              q-item-label.text-primary
                | 9:00 - 21:00
              q-item-label(caption)
                | без выходных
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | Не сезон (зима, лето)
            q-item-section.text-right
              q-item-label.text-primary
                | 9:00 - 18:00
              q-item-label(caption)
                | с понедельника по пятницу
          .text-caption.text-primary-light
            | Время работы
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | Хранение на 1 месяц
            q-item-section.text-right
              q-item-label.text-primary
                | от 200 руб.
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | Хранение на 6 месяцев
            q-item-section.text-right
              q-item-label.text-primary
                | от 1 000 руб.
              q-item-label(caption)
                | или от 166 руб./мес.
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | Хранение на 11 месяцев
            q-item-section.text-right
              q-item-label.text-primary
                | от 2 000 руб.
              q-item-label(caption)
                | или от 181 руб./мес.
          .text-caption.text-primary-light
            | Тип хранения
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | На стеллажах
        q-tab-panel(name="bikes")
          .text-caption.text-primary-light
            | Адрес
          q-item.q-px-none.q-mb-md.items-start
            q-item-section
              q-item-label
                | ул. Спортивная, 130, паркинг
          .text-caption.text-primary-light
            | Время работы
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | Сезон (весна, осень)
            q-item-section.text-right
              q-item-label.text-primary
                | 9:00 - 21:00
              q-item-label(caption)
                | без выходных
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | Не сезон (зима, лето)
            q-item-section.text-right
              q-item-label.text-primary
                | 9:00 - 18:00
              q-item-label(caption)
                | с понедельника по пятницу
          .text-caption.text-primary-light
            | Время работы
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | Детский
            q-item-section.text-right
              q-item-label.text-primary
                | 130 руб./мес.
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | Взрослый
            q-item-section.text-right
              q-item-label.text-primary
                | 160 руб./мес.
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | Тандем
            q-item-section.text-right
              q-item-label.text-primary
                | 200 руб./мес.
          .text-caption.text-primary-light
            | Тип хранения
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | На велосипедной парковке
    q-space
    div.text-center
      q-btn.full-width(color="primary" label="Оформить заявку" :style="{maxWidth: '90%'}" @click="onCreate()")
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";

  export default {
    name: "AsideServicesWarehouse",
    components: { BaseTabs },
    data () {
      return {
        currentTab: "tires"
      };
    },
    methods: {
      onCreate () {
        return this.currentTab === "tires" ? this.tiresTicket() : this.bikeTicket();
      },
      // как событие отправлять?
      tiresTicket () {
      },
      bikeTicket () {
      }
    }
  };
</script>
