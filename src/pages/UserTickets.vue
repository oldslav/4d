<template lang="pug">
  div.q-pa-lg.column.q-gutter-y-lg
    BaseTabs
      q-route-tab(:to="{ name: 'user-tickets-apartments' }" name="apartments" :label="$t('entity.tickets.apartments')")

    BaseTable(
      v-if="data"
      row-key="id"
      :columns="columns"
      :data="data"
      :loading="isLoading"
      :getData="getUserTickets"
    )
      template(v-slot:top-right)
        q-btn(
          icon="add"
          outline
          color="primary"
          @click="isModalVisible = true"
          :label="$t('user.tickets.actions.create')"
        )
        UserTicketsApartmentsNewTicketModal(v-model="isModalVisible")
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="address" :props="props" @click="expandRow(props)")
            span(v-if="props.row.apartment") {{ props.row.apartment.address  }}
            span(v-else).text-grey {{ $t("user.messages.apartmentNotSelected") }}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row.apartment ? props.row.apartment.price : "0" }}
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ moment(props.row.created).fromNow() }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            | {{ props.row.status.description }}
            BaseStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup disable)
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup disable)
                    q-item-section(no-wrap).text-red
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
                UserTicketsApartmentsStepAccept
              q-step(
                title="В работе"
                :done="props.row.status.id > 2"
                :name="2"
              )
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
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import BaseStatus from "../components/common/BaseStatus";
  import BaseTable from "../components/common/BaseTable";
  import BaseTabs from "../components/common/BaseTabs";
  import UserTicketsApartmentsNewTicketModal
    from "../components/user/tickets/apartments/UserTicketsApartmentsNewTicketModal";
  import UserTicketsApartmentsStepAccept from "../components/user/tickets/apartments/UserTicketsApartmentsStepAccept";
  import { GET_USER_TICKETS } from "../store/constants/action-constants";

  export default {
    name: "UserTickets",
    components: { BaseStatus, UserTicketsApartmentsStepAccept, UserTicketsApartmentsNewTicketModal, BaseTable, BaseTabs },
    async created () {
      await this.getUserTickets();
    },
    data () {
      return {
        isModalVisible: false,
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
      ...mapState("user/userTickets", {
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
        return this.$store.state.wait[`user/userTickets/${ GET_USER_TICKETS }`];
      }
    },
    methods: {
      ...mapActions("user/userTickets", {
        getUserTickets: GET_USER_TICKETS
      }),

      expandRow (props) {
        props.expand = !props.expand;
      },

      moment
    }
  };
</script>

<style scoped>

</style>
