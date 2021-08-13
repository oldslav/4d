<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator
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
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import BaseTabs from "@/components/common/BaseTabs";
  import { GET_TREES_STATS } from "@/store/constants/action-constants";

  export default {
    name: "AsideServicesTrees",
    components: { BaseTabs },
    data () {
      return {
      };
    },
    computed: {
      ...mapState("services/trees", {
        treesStats: state => state.treesStats
      })
    },
    methods: {
      ...mapActions("services/trees", [
        GET_TREES_STATS
      ])
    }
  };
</script>

<style scoped>

</style>
