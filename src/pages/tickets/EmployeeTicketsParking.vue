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
                title="Оплата"
                :done="props.row.status.id > 4"
                :name="3"
              )
              q-step(
                title="Подписание договора и получение ключа"
                :done="props.row.status.id === 5"
                :name="5"
              )
            div(v-if="props.row.status.id === 3").q-pa-md
              div.text-body1.text-wrap
                | Для продолжения оформления документов дождитесь оплаты.
    q-inner-loading(v-else showing)
    ApartmentsEmployeeDetailsModal(v-model="showDetailsModal" :info="activeRow" v-if="activeRow" @reject="onTicketReject" @approve="onTicketApprove")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "components/common/BaseTable";
  import {
    GET_EMPLOYEE_TICKETS_PARKING,
    APPROVE_TICKET_PARKING,
    REJECT_TICKET_PARKING
  } from "@/store/constants/action-constants";
  import ApartmentsEmployeeDetailsModal from "components/user/tickets/apartments/ApartmentsEmployeeDetailsModal";

  export default {
    name: "EmployeeTicketsParking",
    components: { ApartmentsEmployeeDetailsModal, BaseTable, ApartmentTicketStatus },
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
        ]
      };
    },
    computed: {
      ...mapState("user/tickets/parking", {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions("user/tickets/parking", {
        getEmployeeTickets: GET_EMPLOYEE_TICKETS_PARKING,
        REJECT_TICKET_PARKING,
        APPROVE_TICKET_PARKING
      }),

      onTicketReject (id) {
        this.$q.dialog({
          title: this.$t("Отклонение заявки"),
          message: "Статус заявки обновится автоматически.",
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
              message: "Заявка отклонена"
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При отклонении заявки произошла ошибка"
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
              message: "Заявка одобрена"
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При одобрении заявки произошла ошибка"
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
        } else {
          this.expanded.splice(row, 1);
        }
      },

      showDetails (row) {
        this.activeRow = row;
        this.showDetailsModal = true;
      },

      moment
    }
  };
</script>
