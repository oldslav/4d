<template lang="pug">
  verify-company-card(
    v-if="canVisibleVerifyCompanyCard"
    service="vacancy"
  )
  div(v-else)
    div
      div.row.flex-break.items-center.q-mb-lg-lg(v-if="!isUserNature")
        div.col-md-9
          q-input(
            v-model="filter.query"
            @input.native="onTypingQuery"
            :placeholder="$t('entity.vacancy.search')"
            debounce="500"
            outlined
            dense
          )
        div.col-md-3.q-pl-lg
          q-btn.float-right.full-width(
            v-if="isUserLegal"
            icon="add"
            outline
            size="sm"
            color="primary"
            :label="$t('user.tickets.vacancies.add')"
            @click="isVisibleCreateModal=true"
          )
          q-btn.float-right.full-width(
            v-if="!isUserLegal"
            :label="$t('user.tickets.vacancies.export')"
            icon="download"
            outline
            size="sm"
            color="primary"
            @click="onClickExportVacancies"
          )

      div.row.flex-break.items-start.q-mb-lg-lg
        div.col-md-3
          div {{ isUserNature ? $t('user.tickets.vacancies.respondDate') : $t('user.tickets.vacancies.createdEntity') }}
          date-range-picker(v-model='filter.dateRange')

        div.col-md-3.q-pl-lg
          div(v-if="!isUserNature") {{ $t('user.tickets.vacancies.entityStatus') }}
            q-select.q-mb-md(
              v-model="filter.statusId"
              :options="getVacancyStatuses"
              option-value="id"
              option-label="description"
              map-options
              emit-value
              outlined
              dense
            )
          div(v-else) {{ $t('user.tickets.vacancies.respondStatus') }}
            q-select.q-mb-md(
              v-model="filter.statusId"
              :options="getRespondsStatuses"
              option-value="id"
              option-label="description"
              map-options
              emit-value
              outlined
              dense
            )

    div(v-if="tableData")
      legal-user-vacancy-tickets-table(
        v-if="isUserLegal"
        v-bind="getTableProps"
        @vacancy:close="handleCloseVacancy"
        @vacancy:publish="handlePublishVacancy"
      )

      employee-user-vacancy-tickets-table(
        v-else-if="isEmployee"
        v-bind="getTableProps"
        @vacancy:reject="handleRejectVacancy"
      )

      user-vacancy-responds-table(v-else v-bind="getTableProps")

      q-inner-loading(v-else showing)

    UserTicketsVacancyNewVacancyModal(v-model="isVisibleCreateModal" @done="onCreateVacancy")
</template>

<script>
  import { mapActions, mapGetters, mapState } from "vuex";
  import { VacancyReferencesEnum } from "../../../store/types/vacancy";
  import {
    CLOSE_VACANCY,
    EXPORT_USER_VACANCIES, GET_COMPANY,
    GET_USER_VACANCY,
    GET_VACANCY_REFERENCES,
    PUBLISH_VACANCY,
    REJECT_VACANCY
  } from "../../../store/constants/action-constants";
  import BaseInput from "../../../components/common/BaseInput";
  import BaseTable from "../../../components/common/BaseTable";
  import UserTicketsVacancyNewVacancyModal
    from "../../../components/user/tickets/vacancy/UserTicketsVacancyNewVacancyModal";
  import DateRangePicker from "../../../components/common/DateRangePicker";
  import LegalUserVacancyTicketsTable
    from "../../../components/user/tickets/vacancy/table/LegalUserVacancyTicketsTable";
  import EmployeeUserVacancyTicketsTable
    from "../../../components/user/tickets/vacancy/table/EmployeeUserVacancyTicketsTable";
  import UserVacancyRespondsTable from "../../../components/user/tickets/vacancy/table/UserVacancyRespondsTable";
  import VerifyCompanyCard from "../../../components/user/company/verify/VerifyCompanyCard";

  export default {
    name: "UserTicketsVacancy",
    components: {
      VerifyCompanyCard,
      UserVacancyRespondsTable,
      EmployeeUserVacancyTicketsTable,
      LegalUserVacancyTicketsTable,
      DateRangePicker,
      BaseInput,
      BaseTable,
      UserTicketsVacancyNewVacancyModal
    },
    preFetch ({ store }) {
      return Promise.all([
        store.getters.isUserLegal ? store.dispatch(`user/company/${ GET_COMPANY }`) : null,
        store.dispatch(`user/tickets/vacancy/${ GET_USER_VACANCY }`),
        store.dispatch(`services/vacancy/${ GET_VACANCY_REFERENCES }`)
      ]);
    },
    data () {
      return {
        isVisibleCreateModal: false,
        isTypingQuery: false,
        filter: {
          dateRange: { "from": null, "to": null },
          query: "",
          statusId: ""
        }
      };
    },
    computed: {
      ...mapGetters(["isUserLegal", "isEmployee", "isUserNature"]),
      ...mapGetters("user/tickets/vacancy", [
        "tablePagination"
      ]),
      ...mapState("user/tickets/vacancy", {
        tableData: state => state.data
      }),
      ...mapGetters("services/vacancy", ["getVacancyReferences"]),
      ...mapGetters("user/company", ["isServicesAvailable"]),
      canVisibleVerifyCompanyCard (){
        return !this.isServicesAvailable && this.isUserLegal;
      },
      getTableProps () {
        return {
          data: this.tableData,
          isLoading: this.isLoading,
          getData: this.getDataForTable,
          pagination: this.tablePagination,
          statusId: this.filter.statusId
        };
      },
      getVacancyStatuses () {
        return [
          { id: "", description: this.$t("common.all") },
          ...this.getVacancyReferences[VacancyReferencesEnum.vacancyStatus]
        ];
      },
      getRespondsStatuses () {
        return [
          { id: "", description: this.$t("common.all") },
          ...this.getVacancyReferences[VacancyReferencesEnum.respondStatus]
        ];
      },
      isLoading () {
        return this.$store.state.wait[`user/tickets/vacancy/${ GET_USER_VACANCY }`] || this.isTypingQuery;
      },
      getClosureReasonsOptions () {
        return this.getVacancyReferences[VacancyReferencesEnum.closureReason]
          .map(closureReason => ({ value: closureReason.id, label: closureReason.description }));
      }
    },
    methods: {
      ...mapActions("user/tickets/vacancy", {
        getUserTickets: GET_USER_VACANCY,
        exportVacancies: EXPORT_USER_VACANCIES
      }),
      ...mapActions("services/vacancy", {
        fetchVacancyReferences: GET_VACANCY_REFERENCES,
        rejectVacancyById: REJECT_VACANCY,
        closeVacancyById: CLOSE_VACANCY,
        publishVacancyById: PUBLISH_VACANCY
      }),

      onTypingQuery (){
        this.isTypingQuery = true;
      },

      getVacancyFilter () {
        const { filter } = this;
        const query = {};

        if (filter.query) {
          query["filters.query"] = filter.query;
        }

        if (filter.dateRange && filter.dateRange.from) {
          query["filters.dateStart"] = filter.dateRange.from;
        }

        if (filter.dateRange && filter.dateRange.to) {
          query["filters.dateEnd"] = filter.dateRange.to;
        }

        if (filter.statusId) {
          query["filters.statusId"] = filter.statusId;
        }

        return query;
      },

      fetchTickets () {
        this.getUserTickets({ query: this.getVacancyFilter() });
        this.isTypingQuery = false;
      },

      getDataForTable ({ pagination }) {
        this.getUserTickets({ pagination, query: this.getVacancyFilter() });
        this.isTypingQuery = false;
      },

      onCreateVacancy () {
        this.isVisibleCreateModal = false;
        this.clearFilter();
      },

      clearFilter () {
        this.filter = {
          date: { from: null, to: null },
          query: "",
          statusId: null
        };
      },

      handleCloseVacancy (vacancyId) {
        const options = this.getClosureReasonsOptions;
        this.$q.dialog({
          title: this.$t("user.tickets.vacancies.closeVacancy.modalTitle"),
          options: { type: "radio", model: options[0].value, items: options },
          ok: { color: "primary", label: this.$t("action.send") },
          cancel: true,
          persistent: true
        }).onOk(
          closeReasonId => this.closeVacancy(vacancyId, closeReasonId)
        );
      },

      async closeVacancy (vacancyId, closeReasonId) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.vacancies.closeVacancy.progress")
        });

        try {
          await this.closeVacancyById({ id: vacancyId, closeReasonId });
          notifyEnd({ type: "positive", message: this.$t("user.tickets.vacancies.closeVacancy.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.vacancies.closeVacancy.error")
          });
          return;
        }

        await this.fetchTickets();
      },

      async handlePublishVacancy (vacancyId) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.vacancies.publishVacancy.progress")
        });

        try {
          await this.publishVacancyById(vacancyId);
          notifyEnd({ type: "positive", message: this.$t("user.tickets.vacancies.publishVacancy.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.vacancies.publishVacancy.error")
          });
          return;
        }

        await this.fetchTickets();
      },

      async handleRejectVacancy (vacancyId) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.vacancies.rejectVacancy.error")
        });

        try {
          await this.rejectVacancyById(vacancyId);
          notifyEnd({ type: "positive", message: this.$t("user.tickets.vacancies.rejectVacancy.error") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.vacancies.rejectVacancy.error")
          });
          return;
        }

        await this.fetchTickets();
      },

      async onClickExportVacancies () {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.vacancies.exportVacancies.error")
        });

        try {
          await this.exportVacancies(this.getVacancyFilter());
          notifyEnd({ timeout: 1 });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.vacancies.exportVacancies.error")
          });
        }
      }
    },

    watch: {
      filter: {
        deep: true,
        handler: "fetchTickets"
      }
    }
  };
</script>
