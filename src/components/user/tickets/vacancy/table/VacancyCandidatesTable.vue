<template lang="pug">
  BaseTable(
    row-key="id"
    :columns="getTableColumns"
    :data="data"
    :pagination="pagination"
    :getData="getData"
    :isLoading="isLoading"
    :expanded.sync="expanded"
  )
    template(v-slot:body="props")
      q-tr(
        :props="props"
        :class="{'cursor-pointer': activeExpandStatuses.includes(props.row.status.id)}"
        @click="expandRow(props)"
      )
        q-td(key="fullName" :props="props")
          q-icon.q-mr-sm.text-grey-8(
            v-if="activeExpandStatuses.includes(props.row.status.id)"
            :class="{'rotate-180': props.expand}"
            name="expand_more"
            style="font-size: 18px"
          )
          div.break-word.break-spaces {{ props.row.name.full }}

        q-td(key="respondDate" :props="props")
          | {{ props.row.created | formatDate }}

        q-td(key="status" :props="props")
          candidate-status(:value="props.row.status" workflow="company")

        q-td(key="actions" auto-width :props="props")
          q-btn(
            v-show="showActionsStatuses.includes(props.row.status.id)"
            @click.stop="onClickRejectCandidate(props.row.id)"
            icon="close"
            color="red"
            flat
            round
            dense
          )

          q-btn(
            v-show="showActionsStatuses.includes(props.row.status.id)"
            @click.stop="onClickAcceptCandidate(props.row.id)"
            icon="done"
            color="primary"
            size="md"
            flat
            round
            dense
          )

          q-btn(flat round dense icon="more_vert" @click.stop)
            q-menu
              q-list
                q-item(@click="onClickDetails(props.row.id)" clickable v-close-popup)
                  q-item-section(no-wrap)
                    | {{ $t('user.tickets.responds.details') }}

      q-tr(v-show="props.expand && activeExpandStatuses.includes(props.row.status.id)")
        q-td.no-padding(colspan="100%" no-hover)
          vacancy-candidate-workflow(
            :value="props.row"
            @candidate:reject="onClickRejectCandidate(props.row.id)"
            @candidate:interview-success="onClickSuccessCandidateInterview(props.row.id)"
            @candidate:offer="onClickCandidateOffer(props.row.id)"
          )
</template>
<script>
  import { RespondStatusesEnum, VacancyStatusesEnum } from "../../../../../store/types/vacancy";
  import BaseTable from "../../../../common/BaseTable";
  import VacancyCandidateWorkflow from "../workflow/VacancyCandidateWorkflow";
  import CandidateStatus from "../status/CandidateStatus";

  export default {
    name:"VacancyCandidatesTable",
    components: { CandidateStatus, VacancyCandidateWorkflow, BaseTable },
    props: {
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Function, default:() => () => ({}) },
      isLoading: { type: Boolean, default: false }
    },
    data () {
      return {
        vacancyStatuses: VacancyStatusesEnum,
        expanded: []
      };
    },
    computed: {
      activeExpandStatuses (){
        return [RespondStatusesEnum.invite, RespondStatusesEnum.interview_success];
      },
      showActionsStatuses (){
        return [RespondStatusesEnum.viewed, RespondStatusesEnum.not_viewed];
      },
      getTableColumns () {
        return [
          {
            name: "fullName",
            required: false,
            label: this.$t("user.tickets.responds.table.fullName"),
            align: "left",
            sortable: false
          },
          {
            name: "respondDate",
            required: false,
            label: this.$t("user.tickets.responds.respondDate"),
            align: "left",
            sortable: false
          },
          {
            name: "status",
            required: false,
            label: this.$t("user.tickets.responds.table.status"),
            align: "left",
            sortable: false
          },
          {
            name: "actions",
            required: false,
            label: "",
            align: "right",
            sortable: false
          }
        ];
      }
    },
    methods: {
      expandRow (props){
        if (!this.activeExpandStatuses.includes(props.row.status.id)) {
          return;
        }

        const key = props.key;
        if (this.expanded[0] === key) {
          this.expanded = [];
        } else {
          this.expanded = [key];
        }
      },

      onClickDetails (candidateId){
        this.$emit("candidate:details", candidateId);
      },

      onClickRejectCandidate (candidateId){
        this.$emit("candidate:reject", candidateId);
      },

      onClickAcceptCandidate (candidateId){
        this.$emit("candidate:accept", candidateId);
      },

      onClickSuccessCandidateInterview (candidateId){
        this.$emit("candidate:interview-success", candidateId);
      },

      onClickCandidateOffer (candidateId){
        this.$emit("candidate:offer", candidateId);
      }
    }
  };
</script>
