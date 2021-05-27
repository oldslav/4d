<template lang="pug">
  q-card.q-ma-lg
    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :expanded.sync="expanded"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="payDate" :props="props" @click="expandRow(props)")
            | {{ props.row.payDate }}
          q-td(key="address" :props="props" @click="expandRow(props)")
            span(v-if="props.row") {{ props.row.address  }}
            span(v-else).text-grey {{ $t("user.messages.apartmentNotSelected") }}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row ? props.row.totalPrice : "0" }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            BaseStatus(:value="props.row.status.id")  

        q-tr(v-show="props.expand")
          q-td.bill-description(colspan="100%")
            .flex.row.q-pa-md
              .col-xs-12.col-md-4.row.q-pa-sm
                .title
                  | Номер договора
                | {{ props.row.contractNumber }}
              .col-xs-12.col-md-4.q-pa-sm
                .row.justify-between
                  .title
                    | Сумма ежемесячной аренды
                  | {{ props.row.monthlyPrice }}
                .row.justify-between
                  .title
                    | Сумма обеспечительного платежа
                  | {{ props.row.secondPrice }}
              .col-xs-12.col-md-4.column.q-pa-sm
                .title
                  | Итоговая сумма
                .text-weight-bold
                  | {{ props.row.totalPrice }}
                q-btn.q-mt-lg(color="primary" label="Оплатить")
    q-inner-loading(v-else showing)
</template>

<script>
  import BaseStatus from "components/common/BaseStatus";
  import BaseTable from "components/common/BaseTable";

  export default {
    name: "UserBills",
    components: {
      BaseStatus,
      BaseTable
    },
    data () {
      return {
        isModalVisible: false,
        expanded: [],
        currentRow: null,
        columns: [
          {
            name: "payDate",
            required: true,
            label: "Pay date",
            align: "left",
            field: row => row.created,
            sortable: true
          },
          {
            name: "address",
            required: true,
            label: "Address",
            align: "left",
            sortable: true
          },
          {
            name: "price",
            required: true,
            label: "Rent price",
            align: "left",
            sortable: true
          },
          {
            name: "status",
            required: true,
            label: "Status",
            align: "left",
            sortable: true
          }
        ],
        tableData: {
          items: [
            {
              id: 1,
              payDate: "2020.11.12",
              address: "Address 1",
              totalPrice: 26000,
              secondPrice: 13000,
              monthlyPrice: 13000,
              contractNumber: "1346-6789",
              status: {
                id: 10
              }
            },
            {
              id: 2,
              payDate: "2021.1.1",
              address: "Address 2",
              totalPrice: 22000,
              secondPrice: 9000,
              monthlyPrice: 13000,
              contractNumber: "1126-2189",
              status: {
                id: 10
              }
            },
            {
              id: 3,
              payDate: "2021.04.05",
              address: "Address 3",
              totalPrice: 30000,
              secondPrice: 15000,
              monthlyPrice: 15000,
              contractNumber: "1441-3531",
              status: {
                id: 10
              }
            },
            {
              id: 4,
              payDate: "2020.11.12",
              address: "Address 1",
              totalPrice: 26000,
              secondPrice: 13000,
              monthlyPrice: 13000,
              contractNumber: "1346-6789",
              status: {
                id: 10
              }
            },
            {
              id: 5,
              payDate: "2020.11.12",
              address: "Address 1",
              totalPrice: 26000,
              secondPrice: 13000,
              monthlyPrice: 13000,
              contractNumber: "1346-6789",
              status: {
                id: 10
              }
            },
            {
              id: 6,
              payDate: "2020.11.12",
              address: "Address 1",
              totalPrice: 26000,
              secondPrice: 13000,
              monthlyPrice: 13000,
              contractNumber: "1346-6789",
              status: {
                id: 10
              }
            },
            {
              id: 7,
              payDate: "2020.11.12",
              address: "Address 1",
              totalPrice: 26000,
              secondPrice: 13000,
              monthlyPrice: 13000,
              contractNumber: "1346-6789",
              status: {
                id: 10
              }
            }
          ],
          pagination: {
            page: 1,
            rowsPerPage: 1,
            rowsNumber: 2
          }
        }
      };
    },
    methods: {
      openDetails (data) {
        this.currentRow = data;
        this.isModalVisible = true;
      },

      expandRow (props) {
        const row = this.expanded.indexOf(props.key);

        if (row === -1) {
          this.expanded.push(props.key);
        } else {
          this.expanded.splice(row, 1);
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
.bill-description
  background-color: $illustration-light-blue
  .title
    color: $illustration-dark-gray
    margin-right: 1rem
</style>
