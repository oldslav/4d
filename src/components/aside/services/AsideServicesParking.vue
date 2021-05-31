<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator
    BaseTabs(v-model="tab")
      q-tab(name="rent" :label="$t('common.rent')")
      q-tab(name="guest" :label="$t('common.guestVisit')")
    q-tab-panels(v-model="tab" animated)
      q-tab-panel(name="rent")
        q-list
          q-item
            q-item-section
              q-item-label {{ $t(`entity.services.parking.rentTypes.short.title`) }}
            q-item-section(side)
              q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.short.price.title`) }}
          q-item
            q-item-section
              q-item-label {{ $t(`entity.services.parking.rentTypes.mid.title`) }}
            q-item-section(side)
              q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.mid.price.title`) }}
              q-item-label(caption) {{ $t(`entity.services.parking.rentTypes.mid.price.description`) }}
          q-item
            q-item-section
              q-item-label {{ $t(`entity.services.parking.rentTypes.long.title`) }}
            q-item-section(side)
              q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.long.price.title`) }}
              q-item-label(caption) {{ $t(`entity.services.parking.rentTypes.long.price.description`) }}
      q-tab-panel(name="guest")
        q-list
          q-item
            q-item-section
              q-item-label {{ $t(`entity.services.parking.rentTypes.guest.title`) }}
            q-item-section(side)
              q-item-label.text-primary {{ $t(`entity.services.parking.rentTypes.guest.price.title`) }}
          q-item
            q-item-section
              q-item-label {{ $t(`entity.guestCard.title`) }}
              q-item-label(caption) {{ $t(`entity.guestCard.period`) }}
            q-item-section(side)
              q-item-label.text-primary {{ $t(`entity.guestCard.price`) }}
      q-tab-panel(name="description")
        | Description
</template>

<script>
  import BaseTabs from "../../common/BaseTabs";

  export default {
    name: "AsideServicesParking",
    components: { BaseTabs },
    data () {
      return {
        rentTypes: ["short", "mid", "long"],
        tab: "rent"
      };
    }
  };
</script>

<style scoped>

</style>
