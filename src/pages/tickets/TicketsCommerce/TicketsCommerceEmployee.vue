<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      :data="tableData"
      :getData="getEmployeeTickets"
      :columns="columns"
      row-key="id"
      :is-loading="isLoading"
      :pagination="tablePagination"
      :expanded.sync="expanded"
    )
      template(#body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="companyName" :props="props")
            | {{ props.row.companyName }}
          q-td(key="address" :props="props")
            | {{ props.row.commerce.address.street }} {{ props.row.commerce.address.house }}
          q-td(key="premisesNumber" :props="props")
            | {{ props.row.commerce.id }}
          q-td(key="created" :props="props")
            | {{ props.row.created | ticketDate }}
          q-td(key="status" :props="props")
            CommerceTicketStatus(:value="props.row.status.id")
          q-td(key="controls")
            q-btn(flat icon="close" v-if="props.row.status.id === 2" color="red" @click.stop="onTicketReject(props.row.id)")
            q-btn(flat icon="done" v-if="props.row.status.id === 2" color="primary" @click.stop="onTicketApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup v-if="props.row.status.id === 2" @click="onTicketReject(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup v-if="props.row.status.id === 2" @click="onTicketApprove(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("action.accept") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
        q-tr(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div.column(v-if="props.row.status.id === 2").q-pa-md
              div.text-body1.text-wrap
                | Примите или отклоните заявку
            div.column(v-if="props.row.status.id === 7").q-pa-md.q-col-gutter-md
              div.text-body1.text-wrap
                | Подпишите договор аренды с арендатором.
              div.text-right
                q-btn(color="primary" label="Договор подписан" :loading="signingContract" @click="onContractSigned(props.row.id)")
            div.column(v-if="props.row.status.id === 8").q-pa-md
              div.text-body1.text-wrap
                | Договор подписан
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
    CommerceTicketDetailsModal(
      v-model="isModalVisible"
      :id.sync="currentId"
      v-if="currentId"
      @reject="onTicketReject"
      @approve="onTicketApprove"
    )
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    APPROVE_TICKET_COMMERCE,
    GET_EMPLOYEE_COMMERCE_TICKETS,
    REJECT_TICKET_COMMERCE, SIGN_CONTRACT_COMMERCE
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import BaseTable from "components/common/BaseTable";
  import CommerceTicketDetailsModal from "components/user/tickets/commerce/CommerceTicketDetailsModal";
  import CommerceTicketStatus from "components/user/tickets/commerce/CommerceTicketStatus";

  export default {
    name: "TicketsCommerceEmployee",
    components: { CommerceTicketStatus, CommerceTicketDetailsModal, BaseTable },
    async created () {
      await this.getEmployeeTickets();
    },
    data () {
      return {
        currentId: null,
        isModalVisible: false,
        expanded: [],
        columns: [
          {
            name: "companyName",
            required: true,
            label: this.$t("user.companyName"),
            align: "left"
          },
          {
            name: "address",
            required: true,
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "premisesNumber",
            required: true,
            label: this.$t("common.premisesNumber"),
            align: "left"
          },
          {
            name: "created",
            required: true,
            label: this.$t("common.created"),
            align: "left"
          },
          {
            name: "status",
            required: true,
            label: this.$t("common.status"),
            align: "left"
          },
          {
            name: "controls",
            align: "right"
          },
          {
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapGetters("user/tickets/commerce", ["tableData", "tablePagination"]),
      ...mapFields("user/tickets/commerce", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      isLoading () {
        return this.$store.state.wait[`user/tickets/commerce/${ GET_EMPLOYEE_COMMERCE_TICKETS }`];
      },
      signingContract () {
        return this.$store.state.wait[`user/tickets/commerce/${ SIGN_CONTRACT_COMMERCE }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/commerce", [GET_EMPLOYEE_COMMERCE_TICKETS, REJECT_TICKET_COMMERCE, APPROVE_TICKET_COMMERCE, SIGN_CONTRACT_COMMERCE]),
      async getEmployeeTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_EMPLOYEE_COMMERCE_TICKETS();
      },
      expandRow (props) {
        const row = this.expanded.indexOf(props.key);
        if (row === -1) {
          this.expanded.push(props.key);
        } else {
          this.expanded.splice(row, 1);
        }
      },
      openDetails (id) {
        this.currentId = id;
        this.isModalVisible = true;
      },
      onTicketReject (id) {
        this.$q.dialog({
          title: this.$t("entity.services.ticketRejection"),
          message: this.$t("user.messages.ticketStatusUpdate"),
          ok: this.$t("action.submit"),
          cancel: this.$t("action.cancel"),
          prompt: {
            model: "",
            type: "textarea",
            isValid: val => !!val,
            label: "Reason",
            outlined: true,
            stackLabel: true
          },
          persistent: false
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },
      rejectTicket (id, reason) {
        return this.REJECT_TICKET_COMMERCE({ id, reason })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.services.messages.reject.success")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.services.messages.reject.success")
            });
          });
      },
      onTicketApprove (id) {
        return this.APPROVE_TICKET_COMMERCE(id)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.services.messages.approve.success")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.services.messages.approve.fail")
            });
          });
      },
      onContractSigned (id) {
        return this.SIGN_CONTRACT_COMMERCE(id)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("user.tickets.contract.sendSuccess")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("user.tickets.contract.sendFail")
            });
          });
      }
    }
  };
</script>
