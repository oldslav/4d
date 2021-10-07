<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg(:style="{'min-height': `${this.$q.screen.height - 26}px`}")
    BaseTabs(is-full-width)
      q-route-tab(v-if="isDev && (isUserNature || isUserLegal || isEmployeeLiving)" :to="{ name: 'user-tickets-apartments' }" name="apartments" :label="$t('entity.tickets.apartments')")
      q-route-tab(v-if="isUserNature || isEmployeeParking" :to="{ name: 'user-tickets-parking' }" name="parking" :label="$t('entity.tickets.parking')")
      q-route-tab(v-if="isDev && (isUserNature || isEmployeeIdea)" :to="{ name: 'user-tickets-ideas' }" name="ideas" :label="$t('entity.tickets.ideas.title')")
      q-route-tab(v-if="isUserNature || isEmployeeWarehouse" :to="{ name: 'user-tickets-warehouse' }" name="warehouse" :label="$t('entity.tickets.warehouse')")
      q-route-tab(v-if="isDev && (isUserLegal || isEmployeeCommerce)" :to="{name: 'user-tickets-commerce'}" name="commerce" :label="$t('entity.tickets.commerce.title')")
      q-route-tab(v-if="isDev && (isUserNature || isEmployeeCrowdfunding)" :to="{ name: 'user-tickets-crowdfunding' }" name="crowdfunding" :label="$t('entity.tickets.crowdfunding')")
      q-route-tab(v-if="isUserLegal || isUserNature || isEmployeeEmploymentCenter" :to="{ name: 'user-tickets-vacancy' }" name="vacancy" :label="$t('entity.tickets.vacancy')")
      q-route-tab(v-if="isDev && isEmployeeEmploymentCenter" :to="{ name: 'user-tickets-employee-responds' }" name="employee-responds" :label="$t('entity.tickets.responds')")
      q-route-tab(v-if="isDev && isEmployeeEmploymentCenter" :to="{ name: 'user-tickets-verify-requests' }" name="verify-requests" :label="$t('entity.tickets.verifyRequests')")
    router-view
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";
  import { mapGetters } from "vuex";

  export default {
    name: "UserTickets",
    components: { BaseTabs },
    computed: {
      ...mapGetters([
        "isUserLegal",
        "isEmployee",
        "isUserNature",
        "isEmployeeLiving",
        "isEmployeeParking",
        "isEmployeeCommerce",
        "isEmployeeCrowdfunding",
        "isEmployeeIdea",
        "isEmployeeEmploymentCenter",
        "isEmployeeWarehouse",
        "isDev"
      ])
    },

    preFetch ({ store, currentRoute, redirect }) {
      const tabs = getTabsForRole(store);
      if (currentRoute.name === "user-tickets") {
        return redirect({ name: tabs[0].route });
      }
    }
  };

  const getTabsForRole = (store) => {
    const {
      isEmployeeLiving,
      isEmployeeParking,
      isEmployeeCommerce,
      isEmployeeCrowdfunding,
      isEmployeeIdea,
      isEmployeeEmploymentCenter,
      isEmployeeWarehouse,
      isUserLegal,
      isUserNature,
      isDev
    } = store.getters;

    const tabs = [
      { route: "user-tickets-apartments", visible: isDev && (isUserNature || isUserLegal || isEmployeeLiving) },
      { route: "user-tickets-parking", visible: isUserNature || isEmployeeParking },
      { route: "user-tickets-ideas", visible: isDev && (isUserNature || isEmployeeIdea) },
      { route: "user-tickets-warehouse", visible: isUserNature || isEmployeeWarehouse },
      { route: "user-tickets-commerce", visible: isDev && (isUserLegal || isEmployeeCommerce) },
      { route: "user-tickets-crowdfunding", visible: isDev && (isUserNature || isEmployeeCrowdfunding) },
      { route: "user-tickets-vacancy", visible: isUserLegal || isUserNature || isEmployeeEmploymentCenter },
      { route: "user-tickets-employee-responds", visible: isDev || isEmployeeEmploymentCenter },
      { route: "user-tickets-verify-requests", visible: isDev || isEmployeeEmploymentCenter }
    ];

    return tabs.filter(t => t.visible);
  };
</script>
<style scoped>

</style>
