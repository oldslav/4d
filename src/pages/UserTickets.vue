<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg
    BaseTabs
      q-route-tab(:to="{ name: 'user-tickets-apartments' }" name="apartments" :label="$t('entity.tickets.apartments')")
      q-route-tab(:to="{ name: 'user-tickets-parking' }" name="parking" :label="$t('entity.tickets.parking')")
      q-route-tab(:to="{ name: 'user-tickets-ideas' }" name="ideas" :label="$t('entity.tickets.ideas')")
    router-view
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";

  export default {
    name: "UserTickets",
    components: { BaseTabs }
  };
</script>

<style scoped>

</style>
