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

        q-td(key="companyName" :props="props")
          | {{  props.row.companyName }}

        q-td(key="publishDate" :props="props")
          | {{  props.row.publishDate | formatDate }}

        q-td(key="closedDate" :props="props")
          | {{  props.row.closedDate | formatDate }}

        q-td(key="closeReason" :props="props")
          | {{  props.row.closedDate | formatDate }}

        q-td(key="status" :props="props")
          vacancy-ticket-status(:value="props.row.status")

        q-td(auto-width key="actions" :props="props")
          //q-btn(flat round dense icon="more_vert")
          //  q-menu
          //    q-list
          //      q-item(:to="{ name: 'user-tickets-vacancy-page', params: { id: props.row.id} }" v-close-popup)
          //        q-item-section(no-wrap)
          //          | Просмотреть вакансию
          //
          //      q-item(
          //        v-if="vacancyStatuses.closed !== props.row.status.id"
          //        v-close-popup
          //        clickable
          //        @click="onClickReject(props.row.id)"
          //      )
          //        q-item-section(no-wrap)
          //          | Отправить на доработку
</template>
<script>
  import BaseTable from "../../../../common/BaseTable";
  import VacancyTicketStatus from "../status/VacancyTicketStatus";
  import { VacancyStatusesEnum } from "../../../../../store/types/vacancy";

  export default {
    components: { BaseTable, VacancyTicketStatus },
    props: {
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Function, default:() => () => ({}) },
      isLoading: { type: Boolean, default: false },
      statusId: { type: [Number, String], default:"" }
    },
    data () {
      return {
        vacancyStatuses: VacancyStatusesEnum
      };
    },
    computed: {
      isVisibleFinishedVacancies () {
        return this.statusId === VacancyStatusesEnum.closed;
      },
      getTableColumns () {
        const { isVisibleFinishedVacancies } = this;
        return [
          {
            name: "position",
            required: false,
            label: "Название",
            align: "left",
            sortable: false
          },
          {
            name: "companyName",
            required: false,
            label: "Компания",
            align: "left",
            sortable: false
          },
          {
            name: "publishDate",
            required: false,
            label: isVisibleFinishedVacancies ? "Дата открытия" : "Дата размещения",
            align: "left",
            sortable: false
          },
          isVisibleFinishedVacancies ? {
            name: "closedDate",
            required: false,
            label: "Дата закрытия",
            align: "left",
            sortable: false
          } : null,
          isVisibleFinishedVacancies ? {
            name: "closeReason",
            required: false,
            label: "Причина закрытия",
            align: "left",
            sortable: false
          } : {
            name: "status",
            required: false,
            label: "Статус",
            align: "left",
            sortable: false
          },
          isVisibleFinishedVacancies ? null : {
            name: "actions",
            required: false,
            label: "",
            align: "left",
            sortable: false
          }
        ].filter(x => x !== null);
      }
    },
    methods: {
      onClickReject (vacancyId) {
        this.$emit("vacancy:reject", vacancyId);
      }
    }
  };
</script>
