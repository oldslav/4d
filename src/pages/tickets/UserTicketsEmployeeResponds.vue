<template lang="pug">
  div
    div.row.flex-break.items-center.q-mb-lg-lg
      div.col-md-8
        q-input(
          v-model="filter.query"
          @input.native="onTypingQuery"
          debounce="500"
          outlined
          dense
          placeholder='Поиск по названию'
        )
      div.col-md-4.q-pl-lg
        q-btn.float-right.full-width(
          icon="download"
          outline
          size="sm"
          color="primary"
          label="Скачать список всех откликов"
          @click="onClickExportResponds"
        )

    div.row.flex-break.items-start.q-mb-md
      div.col-md-3
        div Дата отлика
        date-range-picker(v-model="filter.dateRange")

    employee-responds-table(
      :pagination="getEmployeeRespondsPagination"
      :data="getEmployeeRespondsData"
      :getData="fetchTable"
      :is-loading="isLoadingTable"
      @notify="sendRespondNotification"
    )
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    EXPORT_RESPONDS,
    FETCH_EMPLOYEE_RESPONDS,
    SEND_COMPANY_RESPOND_NOTIFICATION
  } from "../../store/constants/action-constants";

  import DateRangePicker from "../../components/common/DateRangePicker";
  import EmployeeRespondsTable from "../../components/user/tickets/vacancy/table/EmployeeRespondsTable";

  export default {
    name: "UserTicketsEmployeeResponds",
    components: { EmployeeRespondsTable, DateRangePicker },
    preFetch ({ store, redirect }) {
      if (!store.getters.isEmployee) {
        return redirect({ name:"user-tickets" });
      }
      return store.dispatch(`user/tickets/vacancy/${ FETCH_EMPLOYEE_RESPONDS }`);
    },
    data () {
      return {
        isTypingQuery: false,
        filter: {
          dateRange: { from: null, to: null },
          query: ""
        }
      };
    },
    computed: {
      ...mapGetters("user/tickets/vacancy", ["getEmployeeRespondsData", "getEmployeeRespondsPagination"]),
      isLoadingTable () {
        return this.isTypingQuery || this.$store.state.wait[`user/tickets/vacancy/${ FETCH_EMPLOYEE_RESPONDS }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/vacancy", {
        findResponds: FETCH_EMPLOYEE_RESPONDS,
        sendNotification: SEND_COMPANY_RESPOND_NOTIFICATION,
        exportResponds: EXPORT_RESPONDS
      }),

      onTypingQuery (){
        this.isTypingQuery = true;
      },

      getRequestQuery () {
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

        return query;
      },

      onChangeFilter () {
        this.fetchResponds();
      },

      fetchResponds (pagination = { offset: 1 }) {
        const query = this.getRequestQuery();
        this.findResponds({ query, pagination });
        this.isTypingQuery = false;
      },

      fetchTable ({ pagination }) {
        this.fetchResponds(pagination);
      },

      async sendRespondNotification (respondId){
        const notifyEnd = this.$q.notify({ type: "ongoing", message: "Отправляем уведомление" });

        try {
          await this.sendNotification({ respondId });
          notifyEnd({ type: "positive", message: "Уведомление успешно отправлено" });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При отправке уведомления произошла ошибка, пожалуйста попробуйте позже"
          });
        }
      },

      async onClickExportResponds (){
        const notifyEnd = this.$q.notify({ type: "ongoing", message: "Подготавливаем файл" });

        try {
          await this.exportResponds(this.getVacancyFilter());
          notifyEnd({ timeout: 1 });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: "При экспорте откликов произошла ошибка, пожалуйста попробуйте позже"
          });
        }
      }
    },
    watch: {
      filter: {
        deep: true,
        handler: "onChangeFilter"
      }
    }
  };
</script>
<style>
.candidate-workflow-dialog {
  max-width: 816px !important;
  width: 100%;
}
</style>
