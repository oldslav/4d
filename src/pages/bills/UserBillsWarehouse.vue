<template lang="pug">
  div
    BaseTable(
      v-if="getWarehouseBills"
      :data="getWarehouseBills"
      row-key="id"
      :get-data="fetchWarehouseBills"
      :columns="columns"
      :expanded="expanded"
    )
      template(#body="props")
        q-tr(:props="props")
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
          q-td(key="address" :props="props" @click="expandRow(props)")
            .text-grey -
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row ? props.row.amount.total : "0" }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            BaseStatus(:value="+props.row.paid*10")

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
                  :loading="loadingPayment"
                  @click="getPaymentLink(props.row.id)")
    q-inner-loading(v-else showing)
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import { GET_DATA, GET_PAYMENT_LINK } from "@/store/constants/action-constants";
  import BaseTable from "components/common/BaseTable";
  import BaseStatus from "components/common/BaseStatus";
  import { SET_TICKET_ID } from "@/store/constants/mutation-constants";

  export default {
    name: "UserBillsWarehouse",
    components: { BaseTable, BaseStatus },
    async created () {
      const { ticket } = this.$route.params;
      if (ticket) {
        this.ticketId = ticket;
      } else {
        this.ticketId = null;
      }
      await this.fetchWarehouseBills();
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
      ...mapGetters("user/bills/warehouse", ["getWarehouseBills"]),
      loadingPayment () {
        return this.$store.state.wait[`user/bills/warehouse/${ GET_PAYMENT_LINK }`];
      },
      ticketId: {
        get () {
          return this.$store.state["user/bills/warehouse"].filters.ticketId;
        },
        set (id) {
          this.SET_TICKET_ID(id);
        }
      }
    },
    methods: {
      ...mapActions("user/bills/warehouse", { fetchWarehouseBills: GET_DATA, GET_PAYMENT_LINK }),
      ...mapMutations("user/bills/warehouse", [SET_TICKET_ID]),
      moment,
      getFullAddress (address) {
        return `${ address.street } ${ address.house }`;
      },
      expandRow (props) {
        const row = this.expanded.indexOf(props.key);

        if (row === -1) {
          this.expanded.push(props.key);
        } else {
          this.expanded.splice(row, 1);
        }
      },
      openDetails (data) {
        this.currentRow = data;
        this.isModalVisible = true;
      },
      getPaymentLink (id) {
        return this.GET_PAYMENT_LINK(id)
          .then(({ data }) => {
            window.open(data);
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: $t("user.bills.paymentLinkError")
            });
          });
      }
    }
  };
</script>
