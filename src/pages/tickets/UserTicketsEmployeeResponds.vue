<template lang="pug">
  div.full-width
    div.row.flex-break.items-center.q-mb-sm-lg
      div.col-md-8.col-xs-12.col-sm-6
        q-input(
          v-model="filter.query"
          @input.native="onTypingQuery"
          :placeholder="$t('user.tickets.responds.search')"
          debounce="500"
          outlined
          dense
        )
      div.col-md-4.col-sm-6.col-xs-12.q-pl-lg.q-pl-xs-none.q-mt-xs-lg
        q-btn.full-width(
          @click="onClickExportResponds"
          :label="$t('user.tickets.responds.export.action')"
          icon="download"
          outline
          size="sm"
          color="primary"
        )

    div.row.flex-break.items-start.q-mb-md.q-mt-xs-lg
      div.col-md-3.col-sm-12.col-xs-12
        div {{ $t('user.tickets.responds.respondDate') }}
        date-range-picker(v-model="filter.dateRange")

    employee-responds-table(
      :pagination="getEmployeeRespondsPagination"
      :data="getEmployeeRespondsData"
      :getData="fetchTable"
      :is-loading="isLoadingTable"
      @notify="trySendRespondNotification"
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
      return store.dispatch(`user/tickets/vacancy/${ FETCH_EMPLOYEE_RESPONDS }`, {
        pagination: { offset: 1 }
      });
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

      onTypingQuery () {
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

      trySendRespondNotification (respondId){
        this.$q.dialog({
          title: this.$t("user.tickets.responds.notify.title"),
          prompt: {
            model: "",
            isValid: val => val.length > 0,
            type: "textarea",
            outlined: true,
            placeholder: "PLACEHOLDER"
          },
          cancel: true,
          ok: { label: this.$t("action.send") },
          persistent: true
        })
          .onOk(
            text => this.sendRespondNotification(respondId, text)
          );
      },

      async sendRespondNotification (respondId, text){
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.responds.notify.progress")
        });

        try {
          await this.sendNotification({ respondId, text });
          notifyEnd({
            type: "positive",
            message: this.$t("user.tickets.responds.notify.success")
          });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.responds.notify.error")
          });
        }
      },

      async onClickExportResponds (){
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.responds.export.progress")
        });

        try {
          await this.exportResponds(this.getRequestQuery());
          notifyEnd({ timeout: 1 });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.responds.export.error")
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
