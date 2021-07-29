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
          q-icon.q-mr-sm.text-grey-8(
            v-if="activeExpandStatuses.includes(props.row.status.id)"
            :class="{'rotate-180': props.expand}"
            name="expand_more"
            style="font-size: 18px"
          )
          | {{ props.row.vacancy.position }}

        q-td(key="company" :props="props")
          | {{  props.row.vacancy.companyName }}

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
                    | Просмотреть детали вакансии

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
            label: "Название",
            align: "left",
            sortable: false
          },
          {
            name: "company",
            required: false,
            label: "Компания",
            align: "left",
            sortable: false
          },
          {
            name: "publishDate",
            required: false,
            label: "Дата отклика",
            align: "left",
            sortable: false
          },
          {
            name: "status",
            required: false,
            label: "Статус",
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
