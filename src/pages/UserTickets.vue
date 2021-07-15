<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg
    BaseTabs
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-apartments' }" name="apartments" :label="$t('entity.tickets.apartments')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-parking' }" name="parking" :label="$t('entity.tickets.parking')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-ideas' }" name="ideas" :label="$t('entity.tickets.ideas')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-warehouse' }" name="warehouse" :label="$t('entity.tickets.warehouse')")
      q-route-tab(:to="{ name: 'user-tickets-vacancy' }" name="vacancy" :label="$t('entity.tickets.vacancy')")
    router-view
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";
  import { mapGetters } from "vuex";

  export default {
    name: "UserTickets",
    components: { BaseTabs },
    computed: {
      ...mapGetters(["isUserLegal"])
    },
    preFetch ({ store, currentRoute, redirect }) {
      const { isUserLegal } = store.getters;
      if (currentRoute.name === "user-tickets") {
        if (isUserLegal) {
          return redirect({ name: "user-tickets-vacancy" });
        } else {
          return redirect({ name:"user-tickets-apartments" });
        }
      }
    }
  };
</script>

<style scoped>

</style>
