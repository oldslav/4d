<template lang="pug">
  div
    div(v-if="canVisibleHeading")
      div.row.flex-break.items-center.q-mb-lg-lg
        div.col-md-9
          q-input(v-model="filter.query" outlined dense placeholder='Поиск по названию')
        div.col-md-3.q-pl-lg
          q-btn.float-right.full-width(
            v-if="isUserLegal"
            icon="add"
            outline
            size="sm"
            color="primary"
            :label="$t('entity.vacancy.add')"
            @click="isVisibleCreateModal=true"
          )
          q-btn.float-right.full-width(
            v-if="!isUserLegal"
            icon="download"
            outline
            size="sm"
            color="primary"
            label="Скачать Excel"
            @click="onClickExportVacancies"
          )

      div.row.flex-break.items-start.q-mb-lg-lg
        div.col-md-3
          div Дата размещения вакансии
          date-range-picker(v-model='filter.dateRange')

        div.col-md-3.q-pl-lg
          div Статус вакансии
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

    div(v-if="tableData")
      legal-user-vacancy-tickets-table(
        v-if="isUserLegal"
        v-bind="getTableProps"
        @vacancy:close="handleCloseVacancy"
        @vacancy:publish="handlePublishVacancy"
      )

      manager-user-vacancy-tickets-table(
        v-else-if="isUserManager"
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
  import BaseInput from "../../../components/common/BaseInput";
  import BaseTable from "../../../components/common/BaseTable";
  import UserTicketsVacancyNewVacancyModal
    from "../../../components/user/tickets/vacancy/UserTicketsVacancyNewVacancyModal";
  import {
    CLOSE_VACANCY,
    EXPORT_USER_VACANCIES,
    GET_USER_VACANCY,
    GET_VACANCY_REFERENCES,
    PUBLISH_VACANCY,
    REJECT_VACANCY
  } from "../../../store/constants/action-constants";
  import DateRangePicker from "../../../components/common/DateRangePicker";
  import LegalUserVacancyTicketsTable
    from "../../../components/user/tickets/vacancy/table/LegalUserVacancyTicketsTable";
  import ManagerUserVacancyTicketsTable
    from "../../../components/user/tickets/vacancy/table/ManagerUserVacancyTicketsTable";
  import UserVacancyRespondsTable from "../../../components/user/tickets/vacancy/table/UserVacancyRespondsTable";

  export default {
    name: "UserTicketsVacancy",
    components: {
      UserVacancyRespondsTable,
      ManagerUserVacancyTicketsTable,
      LegalUserVacancyTicketsTable,
      DateRangePicker,
      BaseInput,
      BaseTable,
      UserTicketsVacancyNewVacancyModal
    },
    preFetch ({ store }){
      return Promise.all([
        store.dispatch(`user/tickets/vacancy/${ GET_USER_VACANCY }`),
        store.dispatch(`services/vacancy/${ GET_VACANCY_REFERENCES }`)
      ]);
    },
    data () {
      return {
        isVisibleCreateModal: false,
        filter: {
          dateRange: { "from": null, "to": null },
          query: "",
          statusId: ""
        }
      };
    },
    computed: {
      ...mapGetters(["isUserLegal"]),
      ...mapGetters("user/tickets/vacancy", [
        "tablePagination"
      ]),
      ...mapState("user/tickets/vacancy", {
        tableData: state => state.data
      }),
      ...mapGetters("services/vacancy", ["getVacancyReferences"]),
      isUserManager (){
        return false;
      },
      canVisibleHeading (){
        return this.isUserLegal || this.isUserManager;
      },
      getTableProps (){
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
          { id: "", description: "Все" },
          ...this.getVacancyReferences[VacancyReferencesEnum.vacancyStatus]
        ];
      },
      isLoading () {
        return this.$store.state.wait[`user/tickets/vacancy/${ GET_USER_VACANCY }`] ||
          this.$store.state.wait[`services/vacancy/${ GET_VACANCY_REFERENCES }`];
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
        return this.getUserTickets({ query: this.getVacancyFilter() });
      },

      getDataForTable ({ pagination }) {
        return this.getUserTickets({ pagination, query: this.getVacancyFilter() });
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

      handleCloseVacancy (vacancyId){
        const options = this.getClosureReasonsOptions;
        this.$q.dialog({
          title: "Закрытие вакансии",
          options: { type: "radio", model: options[0].value, items: options },
          ok: { color: "primary", label: "Отправить" },
          cancel: true,
          persistent: true
        }).onOk(
          closeReasonId => this.closeVacancy(vacancyId, closeReasonId)
        );
      },

      async closeVacancy (vacancyId, closeReasonId) {
        const notifyEnd = this.$q.notify({ type: "ongoing", message: "Закрываем вакансию" });

        try {
          await this.closeVacancyById({ id: vacancyId, closeReasonId });
          notifyEnd({ type: "positive", message: "Вакансия успешно закрыта" });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При закрытии вакансии произошла ошибка, пожалуйста попробуйте позже"
          });
          return;
        }

        await this.fetchTickets();
      },

      async handlePublishVacancy (vacancyId){
        const notifyEnd = this.$q.notify({ type: "ongoing", message: "Публикуем вакансию" });

        try {
          await this.publishVacancyById(vacancyId);
          notifyEnd({ type: "positive", message: "Вакансия успешно опубликована" });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При публикации вакансии произошла ошибка, пожалуйста попробуйте позже"
          });
          return;
        }

        await this.fetchTickets();
      },

      async handleRejectVacancy (vacancyId){
        const notifyEnd = this.$q.notify({ type: "ongoing", message: "Отправляем на доработку" });

        try {
          await this.rejectVacancyById(vacancyId);
          notifyEnd({ type: "positive", message: "Вакансия успешно отклонена" });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При отправке вакансии на доработку произошла ошибка, пожалуйста попробуйте позже"
          });
          return;
        }

        await this.fetchTickets();
      },

      async onClickExportVacancies () {
        const notifyEnd = this.$q.notify({ type: "ongoing", message: "Подготавливаем файл" });

        try {
          await this.exportVacancies(this.getVacancyFilter());
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При экспорте вакансий произошла ошибка, пожалуйста попробуйте позже"
          });
        }
      }
    },

    watch: {
      filter: { deep: true, handler: "fetchTickets" }
    }
  };
</script>
