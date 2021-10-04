<template lang="pug">
  div
    BaseTable(
      v-if="userProjects"
      row-key="id"
      :columns="columns"
      :data="userProjects"
      :loading="isLoading"
      :getData="getUserTickets"
    )
      template(v-slot:top)
        .row.full-width.justify-between
          .row.q-gutter-sm.col
          q-btn(
            icon="add"
            outline
            color="primary"
            @click="toNewCrowdfundingProject"
            :label="$t('user.tickets.actions.create')"
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
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="cancelTicket(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
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
    DELETE_USER_TICKET_CROWDFUNDING,
    GET_USER_TICKETS_CROWDFUNDING,
    GET_USER_TICKET_CROWDFUNDING_PAYMENT_LINK
  } from "@/store/constants/action-constants";

  export default {
    name: "UserTicketsCrowdfunding",
    components: { ApartmentTicketStatus, TicketCrowdfundingDetailsModal, BaseTable },
    async created () {
      await this.getUserTickets();
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

      userProjects () {
        return this.data ? { ...this.data, items: this.data.items.filter(item => item.author.id === this.$store.getters.getAccount.id) } : null;
      },

      isLoading () {
        return this.$store.state.wait[`user/tickets/crowdfunding/${ GET_USER_TICKETS_CROWDFUNDING }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/crowdfunding", {
        getUserTickets: GET_USER_TICKETS_CROWDFUNDING,
        deleteUserTicket: DELETE_USER_TICKET_CROWDFUNDING,
        GET_USER_TICKET_CROWDFUNDING_PAYMENT_LINK
      }),

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

      toNewCrowdfundingProject () {
        this.$router.push({ name: "services-crowdfunding", params: { newProject: "true" } });
      },

      moment
    }
  };
</script>

<style lang="stylus" scoped>

</style>
