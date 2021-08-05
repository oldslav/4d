<template lang="pug">
  .q-pa-lg.column.q-gutter-y-lg
    BaseTabs
      q-route-tab(:to="{ name: 'user-bills-apartments' }" name="apartments" :label="$t('entity.tickets.apartments')")
      q-route-tab(:to="{ name: 'user-bills-parking' }" name="parking" :label="$t('entity.tickets.parking')")
      q-route-tab(:to="{ name: 'user-bills-warehouse' }" name="warehouse" :label="$t('entity.tickets.warehouse')")
    router-view
</template>

<script>
  import BaseTabs from "../components/common/BaseTabs";
  export default {
    name: "UserBills",
    components: { BaseTabs }
  };
</script>

<style lang="stylus" scoped>
  .bill-description

    .title
      margin-right: 1rem
</style>
