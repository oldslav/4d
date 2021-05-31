<template lang="pug">
  div
    BaseTable(
      v-if="data"
      row-key="id"
      :columns="columns"
      :data="data"
      :loading="isLoading"
      :getData="getUserTickets"
      :expanded.sync="expanded"
    )
      template(v-slot:top-right)
        q-btn(
          icon="add"
          outline
          color="primary"
          @click="isModalVisible = true"
          :label="$t('user.tickets.actions.create')"
        )
        UserTicketsApartmentsNewTicketModal(v-model="isModalVisible" :data="currentRow" @update="getUserTickets")
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="address" :props="props" @click="expandRow(props)")
            span(v-if="props.row.apartment") {{ props.row.apartment.address  }}
            span(v-else).text-grey {{ $t("user.messages.apartmentNotSelected") }}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row.apartment ? props.row.apartment.price : "0" }}
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ props.row.created | fromNow }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            | {{ props.row.status.description }}
            BaseStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id > 3" @click="cancelTicket(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row)")
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
                title="Новая"
                :done="props.row.status.id > 1"
                :name="1"
              )
                UserTicketsApartmentsStepReceived
              q-step(
                title="В работе"
                :done="props.row.status.id > 2"
                :name="2"
              )
                UserTicketsApartmentsStepApproved
              q-step(
                title="Действие договора"
                :done="props.row.status.id > 3"
                :name="3"
              )
              q-step(
                title="Завершена"
                :done="props.row.status.id > 10"
                :name="4"
              )
    q-inner-loading(v-else showing)
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import BaseStatus from "components/common/BaseStatus";
  import BaseTable from "components/common/BaseTable";
  import UserTicketsApartmentsNewTicketModal
    from "components/user/tickets/apartments/UserTicketsApartmentsNewTicketModal";
  import UserTicketsApartmentsStepDraft from "components/user/tickets/apartments/UserTicketsApartmentsStepDraft";
  import UserTicketsApartmentsStepReceived from "components/user/tickets/apartments/UserTicketsApartmentsStepReceived";
  import { DELETE_USER_TICKET_LIVING, GET_USER_TICKETS_LIVING } from "../../store/constants/action-constants";

  export default {
    name: "ApartmentRent",
    components: {
      UserTicketsApartmentsStepReceived,
      UserTicketsApartmentsStepDraft,
      BaseStatus,
      UserTicketsApartmentsNewTicketModal,
      BaseTable
    },
    async created () {
      await this.getUserTickets();
    },
    data () {
      return {
        isModalVisible: false,
        expanded: [],
        currentRow: null,
        columns: [
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
            name: "created",
            required: true,
            label: "Ticket created",
            align: "left",
            field: row => row.created,
            format: val => moment(val).fromNow(),
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
      ...mapState("user/tickets/living", {
        data: state => state.data
        // data: () => ({
        //   items: [
        //     {
        //       apartment: {
        //         address: "Address 1",
        //         number: "1",
        //         price: 3000,
        //         created: new Date("2020.11.12"),
        //         status: 5
        //       }
        //     },
        //     {
        //       apartment: {
        //         address: "Address 2",
        //         number: "2",
        //         price: 55000,
        //         created: new Date("2021.1.1"),
        //         status: 3
        //       }
        //     }
        //   ],
        //   pagination: {
        //     page: 1,
        //     rowsPerPage: 1,
        //     rowsNumber: 2
        //   }
        // })
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/living/${ GET_USER_TICKETS_LIVING }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/living", {
        getUserTickets: GET_USER_TICKETS_LIVING,
        deleteUserTicket: DELETE_USER_TICKET_LIVING
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

      cancelTicket (id) {
        this.deleteUserTicket(id);
      },

      moment
    }
  };
</script>

<style lang="stylus">

</style>
