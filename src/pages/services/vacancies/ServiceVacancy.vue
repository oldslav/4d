<template lang="pug">
  q-page.q-pa-lg.bg-white
    div
      | Всего {{ getVacancies.count }} вакансии
</template>
<script>
  import { SEARCH_VACANCY } from "../../../store/constants/action-constants";
  import { mapGetters } from "vuex";

  export default {
    preFetch ({ store }) {
      return store.dispatch(`services/vacancy/${ SEARCH_VACANCY }`);
    },
    computed: {
      ...mapGetters("services/vacancy", ["getVacancies"])
    }
  };
</script>
