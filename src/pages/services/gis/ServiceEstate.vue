<template lang="pug">
  q-page.q-pa-lg.bg-white
    BaseTabs(v-model="tab").q-mb-lg
      q-route-tab(name="buildings" :to="{ name: 'gis-services-estate-buildings' }" :label="$t('entity.estate.sub.buildings')")
      q-route-tab(name="commerce" :to="{ name: 'gis-services-estate-commerce' }" :label="$t('entity.estate.sub.commerce')")

    router-view
</template>

<script>
  import BaseTabs from "../../../components/common/BaseTabs";

  export default {
    name: "ServiceEstate",
    components: { BaseTabs },
    data () {
      return {
        tab: "buildings"
      };
    }
  };
</script>

<style scoped>

</style>
