<template lang="pug">
  div
    base-table(
      v-if="data"
      row-key="id"
      :columns="columns"
      :data="data"
      :getData="() => []"
      :loading="isLoading"
      :expanded="[]"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="address" :props="props")
            | {{ props.row.address }}
          q-td(key="type" :props="props")
            | {{ props.row.type.nameRu }}
          q-td(key="date" :props="props")
            | {{ props.row.created | formatDate }}
          q-td(key="status" :props="props")
            | {{ props.row.status.nameRu }}
            base-status(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id > 3")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup)
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
</template>

<script>
  import BaseTable from "components/common/BaseTable";
  import BaseStatus from "components/common/BaseStatus";

  export default {
    name: "UserTicketsIdeas",
    components: { BaseTable, BaseStatus },
    data () {
      return {
        data: {
          items: [
            {
              title: "",
              type: {
                id: 1,
                name: "idea",
                nameRu: "Идея жителя"
              },
              created: new Date(),
              address: "ул.Пушкина д.1",
              status: {
                id: 1,
                name: "",
                nameRu: "Черновик"
              }
            },
            {
              title: "",
              type: {
                id: 1,
                name: "problem",
                nameRu: "Проблема в городе"
              },
              created: new Date(),
              address: "ул.Пушкина д.2",
              status: {
                id: 1,
                name: "",
                nameRu: "Черновик"
              }
            }
          ]
        }
      };
    },
    computed: {
      columns () {
        return [
          {
            name: "address",
            label: "Address",
            align: "left"
          },
          {
            name: "type",
            label: "Ticket type",
            align: "left"
          },
          {
            name: "date",
            label: "Ticket date",
            align: "left"
          },
          {
            name: "status",
            label: "Ticket status",
            align: "left"
          },
          {
            name: "menu",
            align: "right"
          }
        ];
      },
      isLoading () {
        return false;
      }
    }
  };
</script>

<style lang="stylus"></style>
