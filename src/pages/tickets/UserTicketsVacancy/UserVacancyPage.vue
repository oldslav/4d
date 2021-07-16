<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg
    div(v-if="!isLoading")
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
      router-view.q-mt-lg-lg
    q-inner-loading(v-else showing)
</template>
<script>
  import BaseTabs from "../../../components/common/BaseTabs";
  import { mapActions, mapGetters } from "vuex";
  import {
    FETCH_USER_VACANCY_BY_ID,
    GET_VACANCY_REFERENCES
  } from "../../../store/constants/action-constants";

  export default {
    components: { BaseTabs },
    created () {
      const { id } = this.$route.params;
      return Promise.all([
        this.fetchVacancy(id),
        this.fetchVacancyReferences()
      ]);
    },
    computed:{
      ...mapGetters("user/tickets/vacancy", [
        "getVacancy"
      ]),
      isLoading () {
        return this.$store.state.wait[`user/tickets/vacancy/${ FETCH_USER_VACANCY_BY_ID }`] ||
          this.$store.state.wait[`services/vacancy/${ GET_VACANCY_REFERENCES }`];
      }
    },
    methods:{
      ...mapActions("user/tickets/vacancy", {
        fetchVacancy: FETCH_USER_VACANCY_BY_ID
      }),
      ...mapActions("services/vacancy", {
        fetchVacancyReferences: GET_VACANCY_REFERENCES
      })
    }
  };
</script>
