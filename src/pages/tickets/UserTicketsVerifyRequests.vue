<template lang="pug">
  div
    div.full.q-mb-lg
      q-input(
        v-model="filter.query"
        :placeholder="$t('user.tickets.verifyRequests.search')"
        @input.native="onTypingQuery"
        debounce="500"
        outlined
        dense
      )

    div.row.flex-break.items-start.q-mb-lg-lg
      div.col-md-3
        div {{ $t('user.tickets.verifyRequests.publishDate') }}
        date-range-picker(v-model='filter.dateRange')

      div.col-md-3.q-pl-lg
        div {{ $t('user.tickets.verifyRequests.status') }}
          q-select.q-mb-md(
            v-model="filter.statusId"
            :options="getVerificationRequestsStatuses"
            option-value="id"
            option-label="description"
            map-options
            emit-value
            outlined
            dense
          )

    tickets-verification-requests-table(
      :data="tableData"
      :isLoading="isLoading"
      :pagination="tablePagination"
      :statusId="filter.statusId"
      :getData="getTableData"
      @request:reject="onRejectRequest"
      @request:approve="onApproveRequest"
      @request:details="showRequestDetails"
    )
    verification-request-details(
      v-model="visibleDetails"
      :request="detailedRequest"
    )
</template>

<script>
  import {
    APPROVE_VERIFICATION_REQUEST,
    FETCH_VERIFICATION_REQUESTS, FETCH_VERIFICATION_REQUESTS_REFERENCES,
    REJECT_VERIFICATION_REQUEST
  } from "../../store/constants/action-constants";
  import { mapActions, mapGetters } from "vuex";
  import TicketsVerificationRequestsTable
    from "../../components/user/tickets/verification-requests/TicketsVerificationRequestsTable";
  import VerificationRequestDetails
    from "../../components/user/tickets/verification-requests/VerificationRequestDetails";
  import DateRangePicker from "../../components/common/DateRangePicker";
  import { CompanyVerificationRequestStatuses } from "../../store/types/user/company";

  export default {
    name: "UserTicketsVerifyRequests",
    components: { DateRangePicker, VerificationRequestDetails, TicketsVerificationRequestsTable },
    preFetch ({ store }) {
      return Promise.all([
        store.dispatch(`user/tickets/verification-request/${ FETCH_VERIFICATION_REQUESTS_REFERENCES }`),
        store.dispatch(`user/tickets/verification-request/${ FETCH_VERIFICATION_REQUESTS }`, {
          query: {
            "filters.statusId": CompanyVerificationRequestStatuses.inProgress
          },
          pagination: {
            offset: 1
          }
        })
      ]);
    },
    data () {
      return {
        visibleDetails: false,
        isTypingQuery: false,
        detailedRequest: null,
        filter: {
          dateRange: { "from": null, "to": null },
          query: "",
          statusId: CompanyVerificationRequestStatuses.inProgress
        }
      };
    },
    computed: {
      ...mapGetters("user/tickets/verification-request", ["tableData", "tablePagination", "getVerificationRequestsStatuses"]),
      isLoading () {
        return this.$store.state.wait[`user/tickets/verification-request/${ FETCH_VERIFICATION_REQUESTS }`] || this.isTypingQuery;
      }
    },
    methods: {
      ...mapActions("user/tickets/verification-request", {
        rejectRequestById: REJECT_VERIFICATION_REQUEST,
        approveRequestById: APPROVE_VERIFICATION_REQUEST,
        fetchRequests: FETCH_VERIFICATION_REQUESTS
      }),

      getFilter () {
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

      onTypingQuery () {
        this.isTypingQuery = true;
      },

      onChangeFilter () {
        this.fetchRequests({
          query: this.getFilter(),
          pagination:{ offset: 1 }
        });
        this.isTypingQuery = false;
      },

      getTableData ({ pagination }) {
        this.fetchRequests({ query: this.getFilter(), pagination });
        this.isTypingQuery = false;
      },

      showRequestDetails (id) {
        this.detailedRequest = this.tableData.items.find(x => x.id === id);
        this.visibleDetails = true;
      },

      onApproveRequest (id) {
        this.visibleDetails = false;
        this.confirmApproveRequest().onOk(
          (text) => this.approveRequest(id, text)
        );
      },

      onRejectRequest (id) {
        this.visibleDetails = false;
        const request = this.tableData.items.find(x => x.id === id);
        this.confirmRejectRequest(request).onOk(
          (reason) => this.rejectRequest(id, reason)
        );
      },

      confirmApproveRequest () {
        return this.$q.dialog({
          title: this.$t("user.tickets.verifyRequests.approve.title"),
          class: "verify-request-action-dialog",
          prompt: {
            model: this.$t("user.tickets.verifyRequests.approve.message"),
            isValid: val => val.length > 0,
            type: "textarea",
            outlined: true
          },
          cancel: true,
          ok: { label: this.$t("action.accept"), unelevated: true },
          persistent: true
        });
      },

      confirmRejectRequest (request) {
        return this.$q.dialog({
          title: this.$t("user.tickets.verifyRequests.reject.title"),
          class: "verify-request-action-dialog",
          prompt: {
            model: this.$t("user.tickets.verifyRequests.reject.message", { authorName: request.author.name.full }),
            isValid: val => val.length > 0,
            type: "textarea",
            outlined: true
          },
          cancel: true,
          ok: { label: this.$t("action.send"), unelevated: true },
          persistent: true
        });
      },

      async rejectRequest (id, reason) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.verifyRequests.reject.progress")
        });

        try {
          await this.rejectRequestById({ id, reason });
          notifyEnd({ type: "positive", message: this.$t("user.tickets.verifyRequests.reject.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.verifyRequests.reject.error")
          });
        }
      },

      async approveRequest (id, text) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.verifyRequests.approve.progress")
        });

        try {
          await this.approveRequestById({ id, text });
          notifyEnd({ type: "positive", message: this.$t("user.tickets.verifyRequests.approve.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.verifyRequests.approve.error")
          });
        }
      }
    },
    watch: {
      filter: { deep: true, handler: "onChangeFilter" }
    }
  };
</script>
<style>
.verify-request-action-dialog {
  max-width: 547px !important;
  width: 100%;
}
</style>
