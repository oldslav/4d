<template lang="pug">
  div.full-width
    div.row.flex-break.items-start.q-mb-md
      div.col-md-3.col-sm-6.col-xs-12.q-mb-xs-lg
        div {{ $t('user.tickets.responds.respondDate') }}
        date-range-picker(v-model="filter.dateRange")

      div.col-md-3.q-pl-sm-lg.q-pl-md-lg.q-pl-lg-lg.col-sm-6.col-xs-12
        div {{ $t('user.tickets.responds.respondStatus') }}
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

    vacancy-candidates-table(
      :data="getVacancyCandidatesTableData"
      :getData="fetchTable"
      :pagination="getVacancyCandidatesTablePagination"
      :is-loading="isLoadingTable"
      @candidate:reject="onRejectCandidateRequest"
      @candidate:accept="onAcceptCandidateRequest"
      @candidate:details="showCandidateDetails"
      @candidate:interview-success="trySuccessCandidateInterview"
      @candidate:offer="trySendCandidateOffer"
    )

    candidate-details-modal(
      v-model="visibleDetails"
      :candidate="currentDetailsCandidate"
      @candidate:reject="onRejectCandidateRequest"
      @candidate:accept="onAcceptCandidateRequest"
    )
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    CANDIDATE_INTERVIEW_PASSED_AND_RELOAD,
    FETCH_VACANCY_RESPONDS_FOR_COMPANY,
    GET_VACANCY_REFERENCES,
    INVITE_AND_RELOAD_VACANCY_CANDIDATE,
    REJECT_AND_RELOAD_VACANCY_CANDIDATE,
    SEND_CANDIDATE_JOB_OFFER_AND_RELOAD,
    VIEW_RESPOND_AND_RELOAD_CANDIDATE
  } from "../../../store/constants/action-constants";
  import { VacancyReferencesEnum } from "../../../store/types/vacancy";
  import VacancyCandidatesTable from "../../../components/user/tickets/vacancy/table/VacancyCandidatesTable";
  import CandidateDetailsModal from "../../../components/user/tickets/vacancy/CandidateDetailsModal";
  import DateRangePicker from "../../../components/common/DateRangePicker";

  export default {
    name: "UserVacancyCandidates",
    components: { DateRangePicker, CandidateDetailsModal, VacancyCandidatesTable },
    preFetch ({ store, currentRoute }) {
      return Promise.all([
        store.dispatch(
          `user/tickets/vacancy/${ FETCH_VACANCY_RESPONDS_FOR_COMPANY }`,
          {
            id: currentRoute.params.id,
            pagination: {
              offset: 1
            }
          }
        ),
        store.dispatch(`services/vacancy/${ GET_VACANCY_REFERENCES }`)
      ]);
    },
    data (){
      return {
        visibleDetails: false,
        currentDetailsCandidate: null,
        filter: {
          dateRange: { from: null, to: null },
          statusId: ""
        }
      };
    },
    computed: {
      ...mapGetters("user/tickets/vacancy", ["getVacancyCandidatesTableData", "getVacancyCandidatesTablePagination"]),
      ...mapGetters("services/vacancy", ["getVacancyReferences"]),
      getRespondsStatuses () {
        return [
          { id:"", description: this.$t("common.all") },
          ...this.getVacancyReferences[VacancyReferencesEnum.respondStatus]
        ];
      },
      isLoadingTable (){
        return this.$store.state.wait[`user/tickets/vacancy/${ FETCH_VACANCY_RESPONDS_FOR_COMPANY }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/vacancy", {
        findResponds: FETCH_VACANCY_RESPONDS_FOR_COMPANY,
        viewRespond: VIEW_RESPOND_AND_RELOAD_CANDIDATE,
        rejectCandidate: REJECT_AND_RELOAD_VACANCY_CANDIDATE,
        inviteCandidate: INVITE_AND_RELOAD_VACANCY_CANDIDATE,
        interviewPassed: CANDIDATE_INTERVIEW_PASSED_AND_RELOAD,
        sendCandidateOffer: SEND_CANDIDATE_JOB_OFFER_AND_RELOAD
      }),

      getRequestQuery (){
        const { filter } = this;
        const query = {};

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

      onChangeFilter (){
        this.fetchCandidates();
      },

      fetchCandidates (pagination = { offset: 1 }) {
        const query = this.getRequestQuery();

        this.findResponds({ id: this.$route.params.id, query, pagination });
      },

      fetchTable ({ pagination }){
        this.fetchCandidates(pagination);
      },

      onRejectCandidateRequest (candidateId){
        this.visibleDetails = false;

        this.showRejectDialog().onOk(
          result => this.tryRejectCandidate(candidateId, result)
        );
      },

      onAcceptCandidateRequest (candidateId){
        this.visibleDetails = false;

        this.showAcceptDialog().onOk(
          result => this.tryAcceptCandidate(candidateId, result)
        );
      },

      async tryRejectCandidate (id, reason) {
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.responds.reject.progress")
        });

        try {
          await this.rejectCandidate({ id, reason });
          notifyEnd({
            type: "positive",
            message: this.$t("user.tickets.responds.reject.success")
          });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.responds.reject.error")
          });
        }
      },

      async tryAcceptCandidate (id, text) {
        const notifyEnd = this.$q.notify({ type: "ongoing", message: this.$t("user.tickets.responds.approve.progress") });

        try {
          await this.inviteCandidate({ id, text });
          notifyEnd({ type: "positive", message: this.$t("user.tickets.responds.approve.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.responds.approve.error")
          });
        }
      },

      async trySuccessCandidateInterview (candidateId){
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.responds.interviewApprove.progress")
        });

        try {
          await this.interviewPassed(candidateId);
          notifyEnd({
            type: "positive",
            message: this.$t("user.tickets.responds.interviewApprove.success")
          });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.responds.interviewApprove.error")
          });
        }
      },

      async trySendCandidateOffer (candidateId){
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.tickets.responds.sendOffer.progress")
        });

        try {
          await this.sendCandidateOffer(candidateId);
          notifyEnd({ type: "positive", message: this.$t("user.tickets.responds.sendOffer.success") });
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.tickets.responds.sendOffer.error")
          });
        }
      },

      async showCandidateDetails (candidateId){
        const candidate = this.getVacancyCandidatesTableData.items.find(x => x.id === candidateId);

        this.currentDetailsCandidate = candidate;
        this.visibleDetails = !!candidate;

        try {
          await this.viewRespond(candidateId);
        } catch (e) {
          // Do nothing
        }
      },

      showAcceptDialog (){
        return this.$q.dialog({
          title: this.$t("user.tickets.responds.approve.title"),
          message: this.$t("user.tickets.responds.approve.hint"),
          class: "candidate-workflow-dialog",
          prompt: {
            model: this.$t("user.tickets.responds.approve.message"),
            isValid: val => val.length > 0,
            type: "textarea",
            outlined: true
          },
          cancel: true,
          ok: { label: this.$t("action.send") },
          persistent: true
        });
      },

      showRejectDialog (){
        return this.$q.dialog({
          title: this.$t("user.tickets.responds.reject.title"),
          message: this.$t("user.tickets.responds.reject.title"),
          class: "candidate-workflow-dialog",
          prompt: {
            model: this.$t("user.tickets.responds.reject.title"),
            isValid: val => val.length > 0,
            type: "textarea",
            outlined: true
          },
          cancel: true,
          ok: { label: this.$t("action.send") },
          persistent: true
        });
      }
    },
    watch:{
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
