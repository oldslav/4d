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
      div.q-px-md.q-pt-md
        .text-caption.text-primary-light
          | Адрес
        q-item.q-px-none.q-mb-md.items-start
          q-item-section
            q-item-label
              | ул. Спортивная, 130, паркинг
        .text-caption.text-primary-light
          | {{ $t('entity.services.warehouse.workTime.title') }}
        q-item.q-px-none.items-start
          q-item-section
            q-item-label
              | {{ $t('entity.services.warehouse.workTime.season.label') }}
          q-item-section.text-right
            q-item-label.text-primary
              | {{ $t('entity.services.warehouse.workTime.season.schedule') }}
            q-item-label(caption)
              | {{ $t('entity.services.warehouse.workTime.season.caption') }}
        q-item.q-px-none.items-start
          q-item-section
            q-item-label
              | {{ $t('entity.services.warehouse.workTime.noSeason.label') }}
          q-item-section.text-right
            q-item-label.text-primary
              | {{ $t('entity.services.warehouse.workTime.season.schedule') }}
            q-item-label(caption)
              | {{ $t('entity.services.warehouse.workTime.season.caption') }}
      q-tab-panels(v-model="currentTab")
        q-tab-panel(name="tires")
          .text-caption.text-primary-light
            | {{ $t('entity.services.warehouse.storagePrice.title') }}
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storagePrice.tires.short.label') }}
            q-item-section.text-right
              q-item-label.text-primary
                | {{ $t('entity.services.warehouse.storagePrice.tires.short.price') }}
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storagePrice.tires.mid.label') }}
            q-item-section.text-right
              q-item-label.text-primary
                | {{ $t('entity.services.warehouse.storagePrice.tires.mid.price') }}
              q-item-label(caption)
                | {{ $t('entity.services.warehouse.storagePrice.tires.mid.caption') }}
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storagePrice.tires.long.label') }}
            q-item-section.text-right
              q-item-label.text-primary
                | {{ $t('entity.services.warehouse.storagePrice.tires.long.price') }}
              q-item-label(caption)
                | {{ $t('entity.services.warehouse.storagePrice.tires.long.caption') }}
          .text-caption.text-primary-light
            | {{ $t('entity.services.warehouse.storageTypes.title') }}
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storageTypes.rack') }}
        q-tab-panel(name="bikes")
          .text-caption.text-primary-light
            | {{ $t('entity.services.warehouse.storagePrice.title') }}
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storagePrice.bikes.child.label') }}
            q-item-section.text-right
              q-item-label.text-primary
                | {{ $t('entity.services.warehouse.storagePrice.bikes.child.price') }}
          q-item.q-px-none.items-start
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storagePrice.bikes.adult.label') }}
            q-item-section.text-right
              q-item-label.text-primary
                | {{ $t('entity.services.warehouse.storagePrice.bikes.adult.price') }}
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storagePrice.bikes.tandem.label') }}
            q-item-section.text-right
              q-item-label.text-primary
                | {{ $t('entity.services.warehouse.storagePrice.bikes.tandem.price') }}
          .text-caption.text-primary-light
            | {{ $t('entity.services.warehouse.storageTypes.title') }}
          q-item.q-px-none.items-start.q-mb-md
            q-item-section
              q-item-label
                | {{ $t('entity.services.warehouse.storageTypes.bikePark') }}
    q-space(v-if="false")
    div.text-center(v-if="false")
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
