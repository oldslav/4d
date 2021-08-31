<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg(:style="{'min-height': `${this.$q.screen.height - 26}px`}")
    BaseTabs(is-full-width)
      q-route-tab(:to="{ name: 'user-tickets-apartments' }" name="apartments" :label="$t('entity.tickets.apartments')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-parking' }" name="parking" :label="$t('entity.tickets.parking')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-ideas' }" name="ideas" :label="$t('entity.tickets.ideas.title')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-warehouse' }" name="warehouse" :label="$t('entity.tickets.warehouse')")
      q-route-tab(v-if="!isUserNature" :to="{name: 'user-tickets-commerce'}" name="user-tickets-commerce" :label="$t('entity.tickets.commerce.title')")
      q-route-tab(v-if="!isUserLegal" :to="{ name: 'user-tickets-crowdfunding' }" name="crowdfunding" :label="$t('entity.tickets.crowdfunding')")
      q-route-tab(:to="{ name: 'user-tickets-vacancy' }" name="vacancy" :label="$t('entity.tickets.vacancy')")
      q-route-tab(v-if="isEmployee" :to="{ name: 'user-tickets-employee-responds' }" name="employee-responds" :label="$t('entity.tickets.responds')")
      q-route-tab(v-if="isEmployee" :to="{ name: 'user-tickets-verify-requests' }" name="verify-requests" :label="$t('entity.tickets.verifyRequests')")
    router-view
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";
  import { mapGetters } from "vuex";

  export default {
    name: "UserTickets",
    components: { BaseTabs },
    computed: {
      ...mapGetters(["isUserLegal", "isEmployee", "isUserNature"])
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
