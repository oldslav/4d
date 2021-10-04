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
        q-td(key="position" :props="props")
          div.flex.row
            q-icon.q-mr-sm.text-grey-8.col-auto(
              v-if="activeExpandStatuses.includes(props.row.status.id)"
              :class="{'rotate-180': props.expand}"
              name="expand_more"
              style="font-size: 18px"
            )
            div.break-word.break-spaces.col {{ props.row.vacancy.position }}

        q-td(key="company" :props="props")
          div.break-word.break-spaces {{  props.row.vacancy.companyName }}

        q-td(key="publishDate" :props="props")
          | {{  props.row.created | formatDate }}

        q-td(key="status" :props="props")
          candidate-status(:value="props.row.status")

        q-td(auto-width key="actions" :props="props")
          q-btn(flat round dense icon="more_vert" @click.stop)
            q-menu
              q-list
                q-item(:to="{ name: 'services-vacancies-item', params: { id: props.row.vacancy.id} }" v-close-popup)
                  q-item-section(no-wrap)
                    | {{ $t("user.tickets.vacancies.table.viewDetails") }}

      q-tr(v-show="props.expand")
        q-td.no-padding(colspan="100%" no-hover)
          vacancy-applicant-workflow(:value="props.row")
</template>
<script>
  import BaseTable from "../../../../common/BaseTable";
  import { RespondStatusesEnum, VacancyStatusesEnum } from "../../../../../store/types/vacancy";
  import VacancyApplicantWorkflow from "../workflow/VacancyApplicantWorkflow";
  import CandidateStatus from "../status/CandidateStatus";

  export default {
    components: { CandidateStatus, VacancyApplicantWorkflow, BaseTable },
    props:{
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Function, default:() => () => ({}) },
      isLoading: { type: Boolean, default: false }
    },
    data (){
      return {
        vacancyStatuses: VacancyStatusesEnum,
        expanded: []
      };
    },
    computed: {
      activeExpandStatuses (){
        return [RespondStatusesEnum.invite, RespondStatusesEnum.interview_success, RespondStatusesEnum.reject];
      },
      getTableColumns () {
        return [
          {
            name: "position",
            required: false,
            label: this.$t("user.tickets.vacancies.table.name"),
            align: "left",
            sortable: false
          },
          {
            name: "company",
            required: false,
            label: this.$t("user.tickets.vacancies.table.companyName"),
            align: "left",
            sortable: false
          },
          {
            name: "publishDate",
            required: false,
            label: this.$t("user.tickets.vacancies.table.respondDate"),
            align: "left",
            sortable: false
          },
          {
            name: "status",
            required: false,
            label: this.$t("user.tickets.vacancies.table.status"),
            align: "left",
            sortable: false
          },
          {
            name: "actions",
            required: false,
            label: "",
            align: "left",
            sortable: false
          }
        ];
      }
    },
    methods:{
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
      }
    }
  };
</script>
