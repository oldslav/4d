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
            | {{ moment(props.row.created).fromNow() }}
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
    q-inner-loading(v-else showing)
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import BaseTable from "../../components/common/BaseTable";
  import {
    DELETE_USER_TICKET_PARKING,
    GET_USER_TICKETS_PARKING
  } from "../../store/constants/action-constants";

  export default {
    name: "UserTicketsParking",
    components: { BaseTable },
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
      ...mapState("user/tickets/parking", {
        data: state => state.data
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/parking/${ GET_USER_TICKETS_PARKING }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", {
        getUserTickets: GET_USER_TICKETS_PARKING,
        deleteUserTicket: DELETE_USER_TICKET_PARKING
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

<style lang="stylus" scoped>

</style>
