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
        q-td(key="position" :props="props")
          | {{ props.row.position }}

        q-td(key="company" :props="props")
          | {{  props.row.companyName }}

        q-td(key="publishDate" :props="props") Дата отклика

        q-td(key="status" :props="props") status

</template>
<script>
  import BaseTable from "../../../../common/BaseTable";
  import VacancyTickerStatus from "../VacancyTickerStatus";
  import { VacancyStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    components:{ BaseTable, VacancyTickerStatus },
    props:{
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Object, default:() => ({}) },
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
