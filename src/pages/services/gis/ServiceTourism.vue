<template lang="pug">
  q-page.q-pa-lg.bg-white
    BaseTabs(v-model="tab").q-mb-lg
      q-route-tab(name="places" :to="{ name: 'gis-services-tourism-places' }" :label="$t('entity.services.tourism.labels.places')")
      q-route-tab(name="routes" :to="{ name: 'gis-services-tourism-routes' }" :label="$t('entity.services.tourism.labels.routes')")

    router-view
</template>

<script>
  import BaseTabs from "../../../components/common/BaseTabs";

  export default {
    name: "ServiceTourism",
    components: { BaseTabs },
    data () {
      return {
        tab: "places"
      };
    }
  };
</script>

<style scoped>

</style>
