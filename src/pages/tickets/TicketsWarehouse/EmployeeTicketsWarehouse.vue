<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :getData="getEmployeeTickets"
      :expanded.sync="expanded"
      :pagination="tablePagination"
      :is-loading="isLoading"
    )
      template(#body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="fullname" :props="props")
            | {{props.row.name.full}}
          q-td(key="warehouseAddress" :props="props")
            | ул. Спортивная, 130, паркинг
          q-td(key="warehouseType" :props="props")
            | {{ props.row.serviceOption.service.name }}
          q-td(key="price" :props="props")
            | {{ props.row.serviceOption.price ? props.row.serviceOption.price : "0" }}
          q-td(key="created" :props="props")
            | {{ props.row.created | ticketDate }}
          q-td(key="status" :props="props")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(key="controls")
            q-btn(flat icon="close" v-if="props.row.status.id === 2" color="red" @click.stop="onTicketReject(props.row.id)")
            q-btn(flat icon="done" v-if="props.row.status.id === 2" color="primary" @click.stop="onTicketApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="showDetails(props.row)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
                  q-item(clickable v-close-popup @click="showTerminate(props.row.id)" v-if="props.row.status.id === 8")
                    q-item-section(no-wrap).text-red
                      | {{$t("action.terminateContract")}}
        q-tr.bg-blue(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div.column(v-if="props.row.status.id === 2").q-pa-md
              div.text-body1.text-wrap
                | Примите или отклоните заявку
            div.column(v-if="props.row.status.id === 14").q-pa-md
              div.text-body1.text-wrap
                | Договор был расторгнут
            div.column(v-if="props.row.status.id === 6").q-pa-md
              div.text-right.text-body1.text-wrap
                | Для подписание договора направьте заявителю приглашение.<br>
                | Вы можете изменить шаблон сообщения по вашему желанию.
            ValidContractState(
              :contract="props.row.contract"
              v-if="props.row.status.id === 8"
            ).q-pa-lg
            ExpiredContractState(v-if="props.row.status.id === 13").q-pa-lg
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
            q-stepper.bg-blue(
              ref="stepper"
              :value="props.row.status.id"
              color="primary"
              flat
              animated
              v-if="props.row.status.id > 2 && props.row.status.id < 8 && props.row.status.id !== 4"
            )
              q-step(
                :title="$t('user.tickets.warehouse.steps.first')"
                :done="props.row.status.id > 4"
                :name="3"
              )
                div.text-body1.text-wrap.text-right
                  | Для продолжения оформления документов дождитесь оплаты.
              q-step(
                :title="$t('user.tickets.warehouse.steps.second')"
                :done="props.row.status.id > 7"
                :name="7"
              )
                .row
                  .col-6.offset-6
                    .text-body1.q-col-gutter-md
                      div
                        | Договор подписан.
                      div
                        | Введите данные договора.
                      FormContract(
                        @submit="sendContractInfo($event, props.row.id)"
                        :start="props.row.updated"
                        :lasts="props.row.serviceOption.storagePeriod"
                      )

    TicketWarehouseDetailsModal(v-model="showDetailsModal" :id.sync="activeId" v-if="showDetailsModal && activeId" @reject="onTicketReject" @approve="onTicketApprove")
    TerminateContractModal(v-model="showTerminateModal" :ticketId.sync="activeId" @submit="terminateTicket" v-if="showTerminateModal && activeId")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    GET_EMPLOYEE_TICKETS_WAREHOUSE,
    APPROVE_TICKET_WAREHOUSE,
    REJECT_TICKET_WAREHOUSE,
    SEND_CONTRACT_INFO_WAREHOUSE,
    TERMINATE_TICKET
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "components/common/BaseTable";
  import BaseInput from "components/common/BaseInput";
  import BaseDatepicker from "components/common/BaseDatepicker";
  import ApartmentsEmployeeDetailsModal from "components/user/tickets/apartments/ApartmentsTicketDetailsModal";
  import TicketWarehouseDetailsModal from "components/user/tickets/warehouse/TicketWarehouseDetailsModal";
  import FormContract from "components/common/form/FormContract";
  import ValidContractState from "components/user/tickets/ValidContractState";
  import ExpiredContractState from "components/user/tickets/ExpiredContractState";
  import TerminateContractModal from "components/user/tickets/TerminateContractModal";

  export default {
    name: "EmployeeTicketsWarehouse",
    components: {
      TerminateContractModal,
      FormContract,
      TicketWarehouseDetailsModal,
      ApartmentsEmployeeDetailsModal,
      BaseTable,
      BaseInput,
      BaseDatepicker,
      ApartmentTicketStatus,
      ValidContractState,
      ExpiredContractState
    },
    async created () {
      await this.getEmployeeTickets();
    },
    data () {
      return {
        activeId: null,
        showDetailsModal: false,
        showTerminateModal: false,
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
            name: "warehouseAddress",
            required: false,
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "warehouseType",
            required: false,
            label: this.$t("common.type"),
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
      ...mapGetters("user/tickets/warehouse", ["tablePagination", "tableData"]),
      ...mapFields("user/tickets/warehouse", {
        fields: ["limit", "offset", "sort"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      loadingContract () {
        return this.$store.state.wait[`user/tickets/warehouse/${ SEND_CONTRACT_INFO_WAREHOUSE }`];
      },
      isLoading () {
        return this.$store.state.wait[`user/tickets/warehouse/${ GET_EMPLOYEE_TICKETS_WAREHOUSE }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", {
        GET_EMPLOYEE_TICKETS_WAREHOUSE,
        REJECT_TICKET_WAREHOUSE,
        APPROVE_TICKET_WAREHOUSE,
        SEND_CONTRACT_INFO_WAREHOUSE,
        TERMINATE_TICKET
      }),

      async getEmployeeTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage, sortBy } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
          this.sort = sortBy;
        }

        await this.GET_EMPLOYEE_TICKETS_WAREHOUSE();
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
            label: this.$t("entity.services.ticketRejectionLabel"),
            outlined: true,
            stackLabel: true
          },
          persistent: false
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },

      rejectTicket (id, reason) {
        return this.REJECT_TICKET_WAREHOUSE({ id, reason })
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
        return this.APPROVE_TICKET_WAREHOUSE({ id })
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

      expandRow (props) {
        const row = this.expanded.indexOf(props.key);

        if (row === -1) {
          this.expanded.push(props.key);
        } else {
          this.expanded.splice(row, 1);
        }
      },

      showTerminate (id) {
        this.activeId = id;
        this.showTerminateModal = true;
      },

      async terminateTicket (payload) {
        try {
          await this.TERMINATE_TICKET(payload);
          this.$q.notify({
            type: "positive",
            message: this.$t("user.tickets.contract.terminateSuccess")
          });
          await this.getEmployeeTickets();
        } catch (e) {
          this.$q.notify({
            type: "negative",
            message: this.$t("user.tickets.contract.terminateFail")
          });
        }
      },

      showDetails (row) {
        this.activeId = row.id;
        this.showDetailsModal = true;
      },

      sendContractInfo (payload, id) {
        this.SEND_CONTRACT_INFO_WAREHOUSE({ id, payload })
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
