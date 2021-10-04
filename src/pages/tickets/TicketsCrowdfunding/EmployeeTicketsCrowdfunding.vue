<template lang="pug">
  div
    BaseTable(
      v-if="data"
      row-key="id"
      :columns="columns"
      :data="data"
      :loading="isLoading"
      :getData="getEmployeeTickets"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="author" :props="props")
            | {{props.row.author.name.full}}
          q-td(key="title" :props="props")
            | {{props.row.title}}
          q-td(key="created" :props="props")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
          q-td(key="status" :props="props")
            ApartmentTicketStatus(:value="getStatusValue(props.row)")
          q-td(key="controls")
            q-btn(flat icon="close" v-if="!props.row.rejected" color="red" @click="onTicketReject(props.row.id)")
            q-btn(flat icon="done" v-if="!props.row.approved && !props.row.rejected" color="primary" @click="onTicketApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="openDetails(props.row)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
    q-inner-loading(v-else showing)
    TicketCrowdfundingDetailsModal(
      v-if="currentRow"
      :info="currentRow"
      v-model="isDetailsModalVisible"
    )
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import TicketCrowdfundingDetailsModal from "components/user/tickets/crowdfunding/TicketCrowdfundingDetailsModal";
  import BaseTable from "@/components/common/BaseTable";
  import {
    GET_EMPLOYEE_TICKETS_CROWDFUNDING,
    REJECT_TICKET_CROWDFUNDING,
    APPROVE_TICKET_CROWDFUNDING
  } from "@/store/constants/action-constants";

  export default {
    name: "EmployeeTicketsCrowdfunding",
    components: { ApartmentTicketStatus, TicketCrowdfundingDetailsModal, BaseTable },
    async created () {
      await this.getEmployeeTickets();
    },
    data () {
      return {
        isDetailsModalVisible: false,
        currentRow: null,
        columns: [
          {
            name: "author",
            required: false,
            label: "Ф.И.О. заявителя",
            align: "left",
            sortable: true
          },
          {
            name: "title",
            required: false,
            label: "Название",
            align: "left",
            sortable: true
          },
          {
            name: "created",
            required: true,
            label: "Дата заявки",
            align: "left",
            field: row => row.created,
            format: val => moment(val).format("DD.MM.YYYY"),
            sortable: true
          },
          {
            name: "status",
            required: true,
            label: "Ticket status",
            align: "left",
            sortable: true
          },
          {
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapState("user/tickets/crowdfunding", {
        data: state => state.data
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/crowdfunding/${ GET_EMPLOYEE_TICKETS_CROWDFUNDING }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/crowdfunding", {
        getEmployeeTickets: GET_EMPLOYEE_TICKETS_CROWDFUNDING,
        REJECT_TICKET_CROWDFUNDING,
        APPROVE_TICKET_CROWDFUNDING
      }),

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
            label: this.$t("entity.services.ticketRejectionLabel"),
            outlined: true,
            stackLabel: true
          },
          persistent: false
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },

      rejectTicket (id, reason) {
        return this.REJECT_TICKET_CROWDFUNDING({ id, reason })
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
        this.approvedId = id;
        this.approveTicket();
      },

      approveTicket () {
        return this.APPROVE_TICKET_CROWDFUNDING({ id: this.approvedId })
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
          })
          .finally(() => {
            this.approvedId = null;
          });
      },

      openDetails (row) {
        this.currentRow = row;
        this.isDetailsModalVisible = true;
      },

      cancelTicket (id) {
        this.deleteUserTicket(id);
      },

      getStatusValue (ticket) {
        if (ticket.rejected) return 4;
        if (ticket.approved) return 3;
        return 2;
      },

      moment
    }
  };
</script>

<style lang="stylus" scoped>

</style>
