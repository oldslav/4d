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
          | {{ props.row.name.full }}

        q-td(key="companyName" :props="props")
          | {{ props.row.vacancy.companyName }}

        q-td(key="created" :props="props")
          | {{ props.row.created | formatDate }}

        q-td(auto-width key="actions" :props="props")
          q-btn(
            @click="onClickSendNotification(props.row.id)"
            flat
            color="primary"
            label="Уведомить компанию"
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
            label: "Ф.И.О. заявителя",
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
            name: "created",
            required: false,
            label: "Дата отклика",
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
