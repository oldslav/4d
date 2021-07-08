<template lang="pug">
  q-card
    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :expanded.sync="expanded"
      :getData="GET_DATA"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
          q-td(key="address" :props="props" @click="expandRow(props)")
            span(v-if="props.row") {{ getFullAddress(props.row.address) }}
            span(v-else).text-grey {{ $t("user.messages.apartmentNotSelected") }}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row ? props.row.amount.total : "0" }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            BaseStatus(:value="Number(props.row.paid*10)")

        q-tr(v-show="props.expand")
          q-td(colspan="100%").bill-description.bg-white
            .flex.row.q-pa-md
              .col-xs-12.col-md-4.row.q-pa-sm
                .title
                  | {{ $t("user.bills.contractNumber") }}
                | {{ props.row.contractNumber }}
              .col-xs-12.col-md-4.q-pa-sm
                .row.justify-between
                  .title
                    | {{ $t("user.bills.monthlyPrice") }}
                  | {{ props.row.amount.details[0].amount }}
              .col-xs-12.col-md-4.column.q-pa-sm
                .title
                  | {{ $t("user.bills.totalPrice") }}
                .text-weight-bold
                  | {{ props.row.amount.total }}
                q-btn.q-mt-lg(
                  color="primary"
                  :disable="props.row.paid"
                  :label="$t('action.pay')"
                  @click="getPaymentLink(props.row.id)")
    q-inner-loading(v-else showing)
</template>

<script>
  import moment from "moment";
  import BaseStatus from "components/common/BaseStatus";
  import BaseTable from "components/common/BaseTable";
  import { mapActions, mapState } from "vuex";
  import { GET_DATA, GET_PAYMENT_LINK } from "../../../store/constants/action-constants";

  export default {
    name: "UserBillsParking",
    components: {
      BaseStatus,
      BaseTable
    },
    async created () {
      await this.GET_DATA();
    },
    data () {
      return {
        isModalVisible: false,
        expanded: [],
        currentRow: null,
        columns: [
          {
            name: "created",
            required: true,
            label: this.$t("common.created"),
            align: "left",
            field: row => row.created,
            format: val => moment(val).format("DD.MM.YYYY"),
            sortable: true
          },
          {
            name: "address",
            required: true,
            label: this.$t("common.address"),
            align: "left",
            sortable: true
          },
          {
            name: "price",
            required: true,
            label: this.$t("user.bills.columns.paymentAmount"),
            align: "left",
            field: row => row.amount.total,
            sortable: true
          },
          {
            name: "status",
            required: true,
            label: this.$t("common.status"),
            align: "left",
            sortable: true
          }
        ]
      };
    },
    computed: {
      ...mapState("user/bills/parking", {
        tableData: state => state.data
      })
    },
    methods: {
      ...mapActions("user/bills/parking", {
        GET_DATA,
        GET_PAYMENT_LINK
      }),

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
      },

      getPaymentLink (id) {
        return this.GET_PAYMENT_LINK(id)
          .then(({ data }) => {
            window.open(data);
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "Ошибка при получении ссылки на оплату"
            });
          });
      },

      getFullAddress (address) {
        return `${ address.street } ${ address.house }`;
      },
      
      moment
    }
  };
</script>

<style lang="stylus" scoped>
  .bill-description

    .title
      margin-right: 1rem
</style>
