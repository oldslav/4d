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
      q-tr
        q-td(key="name" :props="props")
          div.break-word.break-spaces {{ props.row.name.full }}

        q-td(key="companyName" :props="props")
          div.break-word.break-spaces {{ props.row.vacancy.companyName }}

        q-td(key="created" :props="props")
          | {{ props.row.created | formatDate }}

        q-td(auto-width key="actions" :props="props")
          q-btn(
            @click="onClickSendNotification(props.row.id)"
            :label="$t('user.tickets.responds.sendNotify')"
            flat
            color="primary"
          )
</template>
<script>
  import BaseTable from "../../../../common/BaseTable";

  export default {
    components: { BaseTable },
    props:{
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Function, default:() => () => ({}) },
      isLoading: { type: Boolean, default: false }
    },
    computed: {
      getTableColumns () {
        return [
          {
            name: "name",
            required: false,
            label: this.$t("user.tickets.responds.applicantName"),
            align: "left",
            sortable: false
          },
          {
            name: "companyName",
            required: false,
            label: this.$t("user.tickets.vacancies.table.companyName"),
            align: "left",
            sortable: false
          },
          {
            name: "created",
            required: false,
            label: this.$t("user.tickets.vacancies.table.respondDate"),
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
      onClickSendNotification (id) {
        this.$emit("notify", id);
      }
    }
  };
</script>
