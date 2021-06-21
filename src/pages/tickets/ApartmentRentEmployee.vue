<template lang="pug">
  div
    BaseTable(
      v-if="data"
      row-key="id"
      :data="data",
      :columns="columns"
      :getData="getEmployeeTickets"
      :expanded.sync="expanded"
    )
      template(#body="props")
        q-tr(:props="props")
          q-td(key="fullname" :props="props")
            | {{props.row.name.full}}
          q-td(key="address" :props="props")
            | -
          q-td(key="price" :props="props")
            | -
          q-td(key="created" :props="props")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
          q-td(key="status" :props="props")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(key="controls" auto-width)
            q-btn(flat icon="close" color="red" @click="onReject(props.row.id)")
            q-btn(flat icon="done" color="primary" @click="onApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="showDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
    q-inner-loading(v-else showing)
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "components/common/BaseTable";
  import {
    GET_EMPLOYEE_TICKETS_LIVING, REJECT_TICKET_LIVING
  } from "@/store/constants/action-constants";

  export default {
    name: "ApartmentRentEmployee",
    components: { BaseTable, ApartmentTicketStatus },
    async created () {
      await this.getEmployeeTickets();
      // eslint-disable-next-line no-console
      console.log("data", this.data);
    },
    data () {
      return {
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
            name: "address",
            required: false,
            label: "Address",
            align: "left",
            sortable: true
          },
          {
            name: "price",
            required: false,
            label: "Price",
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
      ...mapState("user/tickets/living", {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions("user/tickets/living", {
        getEmployeeTickets: GET_EMPLOYEE_TICKETS_LIVING,
        REJECT_TICKET_LIVING
      }),
      moment,
      onReject (id) {
        // eslint-disable-next-line no-console
        console.log("on reject", id);
        this.$q.dialog({
          title: this.$t("user.tickets.actions.cancel"),
          message: "Вы уверены, что хотите отклонить эту заявку?",
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
          persistent: true
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },
      rejectTicket (id, reason) {
        return this.REJECT_TICKET_LIVING({ id, reason })
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
          })
          .finally(() => {
            this.rejectionReason = "";
          });
      },
      onApprove (id) {
        // eslint-disable-next-line no-console
        console.log("on approve", id);
      },
      showDetails (id) {
        // eslint-disable-next-line no-console
        console.log("show details", id);
      }
    }
  };
</script>
