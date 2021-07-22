<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg
    div.q-mb-lg
      q-btn(
        :color="$q.dark.isActive ? 'white' : 'primary'"
        icon="arrow_back"
        label="Назад"
        flat
        :ripple="false"
        :to="{ name: 'user-tickets-vacancy' }"
      )

    BaseTabs
      q-route-tab(:to="{ name: 'user-tickets-vacancy-info' }" name="info" label="Описание вакансии")
      q-route-tab(:to="{ name: 'user-tickets-vacancy-candidates' }" name="candidates")
        div
          span.text-capitalize Кандитаты
          span.q-ml-sm.text-blue {{ getVacancy.respondsCount }}

    router-view.q-mt-lg-lg
</template>
<script>
  import BaseTabs from "../../../components/common/BaseTabs";
  import { mapGetters } from "vuex";
  import {
    FETCH_USER_VACANCY_BY_ID,
    GET_VACANCY_REFERENCES
  } from "../../../store/constants/action-constants";

  export default {
    components: { BaseTabs },
    preFetch ({ store, currentRoute }) {
      const { id } = currentRoute.params;
      return Promise.all([
        store.dispatch(`user/tickets/vacancy/${ FETCH_USER_VACANCY_BY_ID }`, id),
        store.dispatch(`services/vacancy/${ GET_VACANCY_REFERENCES }`)
      ]);
    },
    computed:{
      ...mapGetters("user/tickets/vacancy", [ "getVacancy" ])
    }
  };
</script>
