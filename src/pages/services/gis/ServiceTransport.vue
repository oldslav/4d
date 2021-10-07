<template lang="pug">
  q-page.q-pa-lg.bg-white
    BaseTabs(v-model="tab").q-mb-lg
      q-route-tab(name="trobjects" :to="{ name: 'gis-services-transport-trobjects' }" :label="$t('entity.transport.sub.trobjects')")
      q-route-tab(name="parking" :to="{ name: 'gis-services-transport-parking' }" :label="$t('entity.transport.sub.parking')")
      q-route-tab(name="navigation" :to="{ name: 'gis-services-transport-navigation' }" :label="$t('entity.transport.sub.navigation')")
      q-route-tab(name="plan" :to="{ name: 'gis-services-transport-plan' }" :label="$t('entity.transport.sub.plan')")
      q-route-tab(name="crosswalk" :to="{ name: 'gis-services-transport-crosswalk' }" :label="$t('entity.transport.sub.crosswalk')")
      q-route-tab(name="highway" :to="{ name: 'gis-services-transport-highway' }" :label="$t('entity.transport.sub.highway')")

    router-view
</template>

<script>
  import BaseTabs from "../../../components/common/BaseTabs";

  export default {
    name: "ServiceTransport",
    components: { BaseTabs },
    data () {
      return {
        tab: "trobjects"
      };
    }
  };
</script>

<style scoped>

</style>
