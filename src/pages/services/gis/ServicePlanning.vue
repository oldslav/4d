<template lang="pug">
  q-page.q-pa-lg.bg-white
    BaseTabs(v-model="tab").q-mb-lg
      q-route-tab(name="border" :to="{ name: 'gis-services-planning-border' }" :label="$t('entity.services.planning.sub.border')")

    router-view
</template>

<script>
  import BaseTabs from "../../../components/common/BaseTabs";

  export default {
    name: "ServicePlanning",
    components: { BaseTabs },
    data () {
      return {
        tab: "border"
      };
    }
  };
</script>

<style scoped>

</style>
