<template lang="pug">
  BaseTable(
    row-key="id"
    :columns="getTableColumns"
    :data="data"
    :pagination="pagination"
    :getData="getData"
    :isLoading="isLoading"
  )
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td(key="vac_position" :props="props")
          div.break-word.break-spaces {{ props.row.vac_position }}

        q-td(key="profIndustry" :props="props")
          div.break-word.break-spaces {{ props.row.profIndustry.description }}

        q-td(key="publishDate" :props="props")
          | {{  props.row.publishDate | formatDate }}

        q-td(key="respondsCount" :props="props")
          | {{  props.row.respondsCount }}

        q-td(key="status" :props="props")
          vacancy-ticket-status(:value="props.row.status")

        q-td(auto-width key="actions" :props="props")
          q-btn(flat round dense icon="more_vert")
            q-menu
              q-list
                q-item(:to="{ name: 'user-tickets-vacancy-page', params: { id: props.row.id} }" v-close-popup)
                  q-item-section(no-wrap)
                    | {{ $t("user.tickets.vacancies.table.viewVacancy") }}

                q-item(:to="{ name: 'user-tickets-vacancy-candidates', params: { id: props.row.id} }" v-close-popup)
                  q-item-section(no-wrap)
                    | {{ $t("user.tickets.vacancies.table.viewResponds") }}

                q-item(
                  v-if="vacancyStatuses.closed !== props.row.status.id"
                  v-close-popup
                  clickable
                  @click="onClickClose(props.row.id)"
                )
                  q-item-section(no-wrap).text-red
                    | {{ $t("user.tickets.vacancies.table.closeVacancy") }}

                q-item(
                  v-if="vacancyStatuses.closed === props.row.status.id"
                  v-close-popup
                  clickable
                  @click="onClickPublish(props.row.id)"
                )
                  q-item-section(no-wrap)
                    | {{ $t("user.tickets.vacancies.table.reopenVacancy") }}
</template>
<script>
  import BaseTable from "../../../../common/BaseTable";
  import VacancyTicketStatus from "../status/VacancyTicketStatus";
  import { VacancyStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    components:{ BaseTable, VacancyTicketStatus },
    props:{
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Function, default:() => () => ({}) },
      isLoading: { type: Boolean, default: false }
    },
    data (){
      return {
        vacancyStatuses: VacancyStatusesEnum
      };
    },
    computed: {
      getTableColumns () {
        return [
          {
            name: "vac_position",
            required: false,
            label: this.$t("user.tickets.vacancies.table.name"),
            align: "left",
            sortable: false
          },
          {
            name: "profIndustry",
            required: false,
            label: this.$t("user.tickets.vacancies.table.profIndustry"),
            align: "left",
            sortable: false
          },
          {
            name: "publishDate",
            required: false,
            label: this.$t("user.tickets.vacancies.table.publishDate"),
            align: "left",
            sortable: false
          },
          {
            name: "respondsCount",
            required: false,
            label: this.$t("user.tickets.vacancies.table.respondsCount"),
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
      onClickClose (vacancyId){
        this.$emit("vacancy:close", vacancyId);
      },
      onClickPublish (vacancyId){
        this.$emit("vacancy:publish", vacancyId);
      }
    }
  };
</script>
