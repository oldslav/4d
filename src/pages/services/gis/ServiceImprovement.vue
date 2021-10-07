<template lang="pug">
  q-page.q-pa-lg.bg-white
    BaseTabs(v-model="tab").q-mb-lg
      //q-route-tab(name="forms" :to="{ name: 'gis-services-improvement-forms' }" :label="$t('entity.services.improvement.sub.forms')")
      q-route-tab(name="objects" :to="{ name: 'gis-services-improvement-objects' }" :label="$t('entity.services.improvement.sub.objects')")
      q-route-tab(name="flower" :to="{ name: 'gis-services-improvement-flower' }" :label="$t('entity.services.improvement.sub.flower')")
      q-route-tab(name="park" :to="{ name: 'gis-services-improvement-park' }" :label="$t('entity.services.improvement.sub.park')")
      q-route-tab(name="square" :to="{ name: 'gis-services-improvement-square' }" :label="$t('entity.services.improvement.sub.square')")
      q-route-tab(name="trees" :to="{ name: 'gis-services-improvement-trees' }" :label="$t('entity.services.improvement.sub.trees')")

    router-view
</template>

<script>
  import BaseTabs from "../../../components/common/BaseTabs";

  export default {
    name: "ServiceImprovement",
    components: { BaseTabs },
    data () {
      return {
        tab: "trees"
      };
    }
  };
</script>

<style scoped>

</style>
