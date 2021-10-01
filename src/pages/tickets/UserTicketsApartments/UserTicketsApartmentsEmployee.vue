<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      row-key="id"
      :data="tableData"
      :columns="columns"
      :is-loading="isLoading"
      :getData="getEmployeeTickets"
      :expanded.sync="expanded"
      :pagination="tablePagination"
    )
      template(#body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="fullname" :props="props")
            | {{props.row.name.full}}
          q-td(key="address" :props="props")
            span(v-if="props.row.apartment") {{ props.row.apartment.address  }}
            span(v-else).text-grey {{ $t("user.messages.apartmentNotSelected") }}
          q-td(key="price" :props="props")
            | {{ props.row.apartment ? props.row.apartment.price : "0" }}
          q-td(key="created" :props="props")
            | {{ props.row.created | ticketDate }}
          q-td(key="status" :props="props")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(key="controls")
            q-btn(flat icon="close" v-if="props.row.status.id === 2" color="red" @click.stop="onReject(props.row.id)")
            q-btn(flat icon="done" v-if="props.row.status.id === 2" color="primary" @click.stop="onApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="showDetails(props.row)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
                  q-item(clickable v-close-popup @click="showTerminate(props.row.id)" v-if="props.row.status.id === 8")
                    q-item-section(no-wrap).text-red
                      | Расторгнуть договор
        q-tr.bg-blue(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div.column(v-if="props.row.status.id === 2").q-pa-md
              div.text-body1.text-wrap
                | Примите или отклоните заявку
            ApartmentTicketEmployeeFlow(
              v-if="[6,7,3,5,11,12].includes(props.row.status.id)"
              :value="props.row"
              @contract="sendContractInfo($event, props.row.id)"
            )
            ValidContractState(
              :contract="props.row.contract"
              v-if="props.row.status.id === 8"
            ).q-pa-lg
            ExpiredContractState(v-if="props.row.status.id === 13").q-pa-lg
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
            div.column(v-if="props.row.status.id === 14").q-pa-md
              div.text-body1.text-wrap
                | Договор был расторгнут
    ApproveTicketModal(v-model="showApprove" @approve="approveTicket")
    ApartmentsTicketDetailsModal(v-model="showDetailsModal" :id.sync="activeId" v-if="showDetailsModal && activeId" @reject="onReject" @approve="onApprove")
    TerminateContractModal(
      v-model="showTerminateModal"
      :ticketId.sync="activeId"
      v-if="showTerminateModal && activeId"
      @submit="terminateContract"
    )
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    APPROVE_TICKET_LIVING,
    GET_EMPLOYEE_TICKETS_LIVING, REJECT_TICKET_LIVING, SEND_CONTRACT_INFO_LIVING, TERMINATE_TICKET
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import ApproveTicketModal from "components/user/tickets/apartments/ApproveTicketModal";
  import BaseTable from "components/common/BaseTable";
  import ApartmentsTicketDetailsModal from "components/user/tickets/apartments/ApartmentsTicketDetailsModal";
  import ApartmentTicketEmployeeFlow from "components/user/tickets/apartments/ApartmentTicketEmployeeFlow";
  import ValidContractState from "components/user/tickets/ValidContractState";
  import ExpiredContractState from "components/user/tickets/ExpiredContractState";
  import TerminateContractModal from "components/user/tickets/TerminateContractModal";

  export default {
    name: "UserTicketsApartmentsEmployee",
    components: {
      TerminateContractModal,
      ExpiredContractState,
      ApartmentsTicketDetailsModal,
      BaseTable,
      ApartmentTicketStatus,
      ApproveTicketModal,
      ApartmentTicketEmployeeFlow,
      ValidContractState
    },
    async created () {
      await this.getEmployeeTickets();
    },
    data () {
      return {
        activeId: null,
        approvedId: null,
        showApprove: false,
        showTerminateModal: false,
        showDetailsModal: false,
        rejectionReason: "",
        expanded: [],
        columns: [
          {
            name: "fullname",
            required: true,
            label: this.$t("common.fullname"),
            align: "left"
          },
          {
            name: "address",
            required: false,
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "price",
            required: false,
            label: this.$t("common.rentPrice"),
            align: "left"
          },
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
            name: "status",
            required: true,
            label: this.$t("common.status"),
            align: "left",
            sortable: true
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
      ...mapGetters("user/tickets/living", ["tableData", "tablePagination"]),
      ...mapFields("user/tickets/living", {
        fields: ["limit", "offset", "sort"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      isLoading () {
        return this.$store.state.wait[`user/tickets/living/${ GET_EMPLOYEE_TICKETS_LIVING }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/living", {
        GET_EMPLOYEE_TICKETS_LIVING,
        REJECT_TICKET_LIVING,
        APPROVE_TICKET_LIVING,
        SEND_CONTRACT_INFO_LIVING,
        TERMINATE_TICKET
      }),

      async getEmployeeTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage, sortBy } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
          this.sort = sortBy;
        }

        await this.GET_EMPLOYEE_TICKETS_LIVING();
      },

      expandRow (props) {
        const row = this.expanded.indexOf(props.key);
        if (row === -1) {
          this.expanded.push(props.key);
        } else {
          this.expanded.splice(row, 1);
        }
      },
      onReject (id) {
        this.$q.dialog({
          title: this.$t("entity.services.ticketRejection"),
          message: this.$t("user.messages.ticketStatusUpdate"),
          ok: this.$t("action.submit"),
          cancel: this.$t("action.cancel"),
          prompt: {
            model: "",
            type: "textarea",
            isValid: val => !!val,
            label: this.$t("common.reason"),
            outlined: true,
            stackLabel: true
          },
          persistent: false
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },
      rejectTicket (id, reason) {
        return this.REJECT_TICKET_LIVING({ id, reason })
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
              message: this.$t("entity.services.messages.reject.fail")
            });
          });
      },
      onApprove (id) {
        this.approvedId = id;
        this.showApprove = true;
      },
      approveTicket (payload) {
        return this.APPROVE_TICKET_LIVING({ id: this.approvedId, payload })
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
      showTerminate (id) {
        this.activeId = id;
        this.showTerminateModal = true;
      },
      async terminateContract (payload) {
        try {
          await this.TERMINATE_TICKET(payload);
          this.$q.notify({
            type: "positive",
            message: "Договор расторгнут"
          });
          await this.getEmployeeTickets();
        } catch (e) {
          this.$q.notify({
            type: "negative",
            message: "При расторжении договора произошла ошибка"
          });
        }
      },
      showDetails (row) {
        this.activeId = row.id;
        this.showDetailsModal = true;
      },
      sendContractInfo (payload, id) {
        return this.SEND_CONTRACT_INFO_LIVING({ id, payload })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("user.tickets.contract.sendSuccess")
            });
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
