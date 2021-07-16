<template lang="pug">
  q-page.q-pa-lg.bg-white(:class="{ column: !canVisibleContent }")
    div.row.items-center
      div.col-md-6
        div.text-subtitle1(:class="{ invisible: isFailedLastSearch }")
          | {{ $tc("entity.services.vacancies.searchResult", getVacancies.count) }}

      div.col-md-6
        q-input(
          v-model="filter.query"
          :placeholder="$t('entity.services.vacancies.searchPlaceholder')"
          @input.native="onTypingQuery"
          debounce="500"
          outlined
          dense
        )

    div.q-mt-lg-lg(v-if="canVisibleContent")
      vacancy-card.q-mb-lg-lg(
        v-for="vacancy in getVacancies.items"
        :key="vacancy.id"
        :value="vacancy"
      )

      div.row.justify-center
        q-pagination(
          v-model="currentPage"
          :max-pages="10"
          :max="getPagesCount"
          color="primary"
          boundary-numbers
          @input="onChangeCurrentPage"
        )

    div.flex.flex-break.items-center.justify-center(v-if="isEmpty && !visibleLoading")
      page-error(
        :title="$t('entity.services.vacancies.searchEmptyTitle')"
        :subtitle="$t('entity.services.vacancies.searchEmptyDescription')"
        :retry-label="$t('entity.services.vacancies.searchEmptyRetry')"
        @retry="clearQuery"
      )

    div.flex.flex-break.items-center.justify-center(v-if="isFailedLastSearch && !visibleLoading")
      page-error(
        :title="$t('entity.services.vacancies.searchErrorTitle')"
        :subtitle="$t('entity.services.vacancies.searchErrorSubtitle')"
        :retry-label="$t('entity.services.vacancies.searchErrorRetry')"
        @retry="refreshVacancies"
      )
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import { SEARCH_VACANCY } from "../../../store/constants/action-constants";
  import VacancyCard from "../../../components/services/vacancy/VacancyCard";
  import PageError from "../../../components/common/PageError";

  const PER_PAGE_COUNT = 15;

  const getQueryFromRoute = (route) => {
    const { industry, query } = route.query;
    const page = parseInt(route.query.page, 10);
    const result = { limit: PER_PAGE_COUNT };

    if (!Number.isNaN(page)) {
      result.offset = Math.max(0, page - 1);
    }

    if (industry) {
      result.profIndustryId = industry;
    }

    if (query) {
      result.query = query;
    }

    return result;
  };

  export default {
    components: { PageError, VacancyCard },
    preFetch ({ store, currentRoute }) {
      const query = getQueryFromRoute(currentRoute);

      return store.dispatch(`services/vacancy/${ SEARCH_VACANCY }`, query);
    },
    created () {
      const page = parseInt(this.$route.query.page, 10);

      if (!isNaN(page) && page <= this.getPagesCount){
        this.currentPage = Math.max(page, 1);
      }
    },
    data () {
      return {
        filter: { query: this.$route.query.query || "" },
        isChangedPagination: false,
        currentPage: 1,
        isTypingQuery: false
      };
    },
    computed: {
      ...mapGetters("services/vacancy", ["getVacancies", "isFailedLastSearch"]),
      visibleLoading (){
        return this.isTypingQuery || this.$store.state.wait[`services/vacancy/${ SEARCH_VACANCY }`];
      },
      isEmpty (){
        return this.getVacancies.count === 0 && !this.isFailedLastSearch;
      },
      canVisibleContent (){
        return !this.isFailedLastSearch && !this.isEmpty;
      },
      getPagesCount (){
        return Math.ceil(this.getVacancies.count / PER_PAGE_COUNT);
      }
    },
    methods: {
      ...mapActions("services/vacancy", {
        searchVacancy: SEARCH_VACANCY
      }),
      async replaceQuery (newValues) {
        const query = { ...this.$route.query, ...newValues };
        try {
          await this.$router.replace({ query });
        } catch (e) {
          // Do nothing
        }
      },


      async clearQuery (){
        this.filter.query = "";
        try {
          await this.$router.replace({ query:{} });
        } catch (e) {
          // Do nothing
        }
      },

      async refreshVacancies () {
        const query = getQueryFromRoute(this.$route);
        await this.searchVacancy(query);
        this.isChangedPagination = false;
      },

      async handleUpdateSearchQuery (){
        await this.replaceQuery({ query: this.filter.query || undefined });
        await this.$nextTick();
        this.isTypingQuery = false;
      },

      onTypingQuery (){
        this.isTypingQuery = true;
      },

      showLoading (){
        const message = this.isChangedPagination ?
          this.$t("entity.services.vacancies.processLoadPage")
          : this.$t("entity.services.vacancies.processSearch");

        if (!this.$notifyEndSearch) {
          this.$notifyEndSearch = this.$q.notify({ type: "ongoing", message });
        }
      },

      hideLoading (){
        if (this.$notifyEndSearch && !this.isFailedLastSearch) {
          const message = this.isChangedPagination ?
            this.$t("entity.services.vacancies.successLoadPage")
            : this.$t("entity.services.vacancies.successSearch");

          this.$notifyEndSearch({ type: "positive", message });
        } else if (this.$notifyEndSearch && this.isFailedLastSearch) {
          const message = this.isChangedPagination ?
            this.$t("entity.services.vacancies.errorLoadPage")
            : this.$t("entity.services.vacancies.errorSearch");

          this.$notifyEndSearch({ type: "negative", message });
        }

        this.$notifyEndSearch = null;
      },

      async onChangeCurrentPage (){
        this.isChangedPagination = true;
        await this.replaceQuery({ page: this.currentPage === 1 ? undefined : this.currentPage });
      }
    },
    watch: {
      visibleLoading (val) {
        if (val) {
          this.showLoading();
        } else {
          this.hideLoading();
        }
      },
      "filter.query": "handleUpdateSearchQuery",
      "$route.query": "refreshVacancies",
      "$route.industry": "refreshVacancies"
    }
  };
</script>
