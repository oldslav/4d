<template lang="pug">
  div
    BaseTable(
      v-if="data"
      row-key="id"
      :columns="columns"
      :data="data"
      :getData="getEmployeeTickets"
      :expanded.sync="expanded"
    )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="fullname" :props="props" @click="expandRow(props)")
            | {{props.row.name.full}}
          q-td(key="parkingAddress" :props="props" @click="expandRow(props)")
            | {{props.row.parkingPlace.address}}
          q-td(key="parkingNumber" :props="props" @click="expandRow(props)")
            | {{props.row.parkingPlace.number}}
          q-td(key="type" :props="props" @click="expandRow(props)")
            | {{props.row.parkingPlace.type.description}}
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(key="controls")
            q-btn(flat icon="close" v-if="![9, 4].includes(props.row.status.id)" color="red" @click="onTicketReject(props.row.id)")
            q-btn(flat icon="done" v-if="props.row.status.id === 2" color="primary" @click="onTicketApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="showDetails(props.row)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
          

        q-tr(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            q-stepper(
              ref="stepper"
              :value="props.row.status.id"
              color="primary"
              flat
              animated
            )
              q-step(
                :title="$t('users.tickets.parking.steps.first')"
                :done="props.row.status.id > 4"
                :name="3"
              )
              q-step(
                :title="$t('users.tickets.parking.steps.second')"
                :done="props.row.status.id > 7"
                :name="7"
              )
            div(v-if="props.row.status.id === 3").q-pa-md
              div.text-body1.text-wrap
                  | Для продолжения оформления документов дождитесь оплаты.
            div(v-if="props.row.status.id === 7").q-pa-md
              div.text-body1.text-wrap
                | Договор подписан.
                | Введите данные договора.
              .row
                BaseInput.col-2.q-my-md(
                  v-model="contractInfo.contractNumber"
                  :rules="[ val => val !== null && val !== '' || '']"
                  :label="$t('user.bills.contractNumber')"
                )
              .row
                q-input.col-2.q-mr-lg(
                  ref="date"
                  filled
                  v-model="contractInfo.dateContractConcluded"
                  :label="$t('user.bills.dateContractConcluded')"
                  lazy-rules
                  :rules="[ val => val !== null && val !== '' || '']"
                  @click="$refs.qDateConcludedProxy.show()"
                )
                  template(v-slot:append)
                    q-icon(name="event" class="cursor-pointer")
                      q-popup-proxy(ref="qDateConcludedProxy")
                        q-date(
                          v-model="contractInfo.dateContractConcluded"
                          :mask="'YYYY-MM-DD'"
                          @input="$refs.qDateConcludedProxy.hide()"
                        )
                q-input.col-2(
                  ref="date"
                  filled
                  v-model="contractInfo.dateContractExpire"
                  :label="$t('user.bills.dateContractExpire')"
                  lazy-rules
                  :rules="[ val => val !== null && val !== '' || '']"
                  @click="$refs.qDateExpireProxy.show()"
                )
                  template(v-slot:append)
                    q-icon(name="event" class="cursor-pointer")
                      q-popup-proxy(ref="qDateExpireProxy")
                        q-date(
                          v-model="contractInfo.dateContractExpire"
                          :mask="'YYYY-MM-DD'"
                          @input="$refs.qDateExpireProxy.hide()"
                        )
              .row
                q-btn(
                  :disable="!isContractInfoFilled"
                  color="primary"
                  :label="$t('user.tickets.actions.next')"
                  @click="sendContractInfo(props.row.id)"
                )

    q-inner-loading(v-else showing)
    TicketDetailsModal(v-model="showDetailsModal" :info="activeRow" @reject="onTicketReject" @approve="onTicketApprove")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import TicketDetailsModal from "components/user/tickets/parking/TicketDetailsModal";
  import BaseTable from "components/common/BaseTable";
  import BaseInput from "components/common/BaseInput";
  import BaseDatepicker from "components/common/BaseDatepicker";
  import {
    GET_EMPLOYEE_TICKETS_PARKING,
    APPROVE_TICKET_PARKING,
    REJECT_TICKET_PARKING,
    SEND_CONTRACT_INFO_PARKING
  } from "@/store/constants/action-constants";
  import ApartmentsEmployeeDetailsModal from "components/user/tickets/apartments/ApartmentsEmployeeDetailsModal";

  export default {
    name: "EmployeeTicketsParking",
    components: { ApartmentsEmployeeDetailsModal, BaseTable, BaseInput, BaseDatepicker, ApartmentTicketStatus, TicketDetailsModal },
    async created () {
      await this.getEmployeeTickets();
    },
    data () {
      return {
        activeRow: null,
        approvedId: null,
        showDetailsModal: false,
        rejectionReason: "",
        expanded: [],
        columns: [
          {
            name: "fullname",
            required: true,
            label: "Full name",
            align: "left",
            sortable: true
          },
          {
            name: "parkingAddress",
            required: false,
            label: "Address",
            align: "left",
            sortable: true
          },
          {
            name: "parkingNumber",
            required: false,
            label: "Number",
            align: "left",
            sortable: true
          },
          {
            name: "type",
            required: false,
            label: "Parking type",
            align: "left",
            sortable: true
          },
          {
            name: "created",
            required: true,
            label: "Ticket created",
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
            name: "controls",
            align: "right"
          },
          {
            name: "menu",
            align: "right"
          }
        ],
        contractInfo: {
          contractNumber: null,
          dateContractConcluded: null,
          dateContractExpire: null
        }
      };
    },
    computed: {
      ...mapState("user/tickets/parking", {
        data: state => state.data
      }),
      isContractInfoFilled () {        
        return !!this.contractInfo.contractNumber
          && !!this.contractInfo.dateContractConcluded
          && !!this.contractInfo.dateContractExpire;
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", {
        getEmployeeTickets: GET_EMPLOYEE_TICKETS_PARKING,
        REJECT_TICKET_PARKING,
        APPROVE_TICKET_PARKING,
        SEND_CONTRACT_INFO_PARKING
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
            label: "Reason",
            outlined: true,
            stackLabel: true
          },
          persistent: false
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },

      rejectTicket (id, reason) {
        return this.REJECT_TICKET_PARKING({ id, reason })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: $t("entity.services.messages.reject.success")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: $t("entity.services.messages.reject.success")
            });
          });
      },

      onTicketApprove (id) {
        this.approvedId = id;
        this.approveTicket();
      },

      approveTicket () {
        return this.APPROVE_TICKET_PARKING({ id: this.approvedId })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: $t("entity.services.messages.approve.success")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: $t("entity.services.messages.approve.fail")
            });
          })
          .finally(() => {
            this.approvedId = null;
          });
      },

      expandRow (props) {
        const row = this.expanded.indexOf(props.key);

        if (row === -1) {
          this.expanded.push(props.key);
          this.contractInfo.contractNumber = null;
          this.contractInfo.dateContractConcluded = null;
          this.contractInfo.dateContractExpire = null;
        } else {
          this.expanded.splice(row, 1);
        }
      },

      showDetails (row) {
        this.activeRow = row;
        this.showDetailsModal = true;
      },

      sendContractInfo (id) {
        const { contractNumber, dateContractConcluded, dateContractExpire } = this.contractInfo;
        const payload = {
          startDate: dateContractConcluded,
          endDate: dateContractExpire,
          number: contractNumber
        };
        this.SEND_CONTRACT_INFO_PARKING({ id, payload })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: $t("user.tickets.contract.sendSuccess")
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: $t("user.tickets.contract.sendFail")
            });
          });
      },

      moment
    }
  };
</script>
