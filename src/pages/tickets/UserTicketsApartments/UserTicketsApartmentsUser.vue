<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :isLoading="isLoading"
      :pagination="tablePagination"
      :getData="getUserTickets"
      :expanded.sync="expanded"
    )
      template(#top)
        .full-width.text-right
          q-btn(
            icon="add"
            outline
            color="primary"
            @click="isModalVisible = true"
            :label="$t('user.tickets.actions.create')"
          )
        component(
          :is="ticketModal"
          v-model="isModalVisible"
          v-if="isModalVisible"
          :ticketId="currentRow && currentRow.id"
          @update="getUserTickets"
        )
      template(#body="props")
        q-tr(:props="props")
          q-td(key="address" :props="props" @click="expandRow(props)")
            span(v-if="props.row.apartment") {{ props.row.apartment.address  }}
            span(v-else).text-grey {{ $t("user.messages.apartmentNotSelected") }}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row.apartment ? props.row.apartment.price : "0" }}
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ props.row.created | fromNow }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id > 3" @click="onCancel(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}

        q-tr(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div.column(v-if="props.row.status.id === 1").q-pa-md
              div.text-body1.text-wrap
                | Для подачи заявки продолжите заполнение формы.
              div.text-right
                q-btn(color="primary" label="Отправить на рассмотрение" @click="sendOnApproval(props.row.id)")
            div.column(v-if="props.row.status.id === 2").q-pa-md
              div.text-body1.text-wrap
                | Дождитесь рассмотрения вашей заявки
            UserTicketsApartmentProgressState(
              v-if="[6,7,3,5,11,12].includes(props.row.status.id)"
              :value="props.row.status"
              @choose="toApartments(props.row.id)"
              @viewed="apartmentViewed(props.row.id)"
            )
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
    BaseModal(
      v-model="isApartmentsListModal"
      position="standard"
    )
      ApartmentsList(
        :requestId="requestId"
        @close="apartmentSelected"
      )
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters, mapState } from "vuex";
  import {
    REQUEST_APPROVAL_LIVING,
    DELETE_USER_TICKET_LIVING,
    GET_USER_TICKETS_LIVING,
    UPDATE_TICKET_APARTMENT_VIEWED
  } from "@/store/constants/action-constants";
  import BaseTable from "components/common/BaseTable";
  import UserTicketsApartmentsNewTicketModal
    from "components/user/tickets/apartments/UserTicketsApartmentsNewTicketModal";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import UserTicketsApartmentProgressState from "components/user/tickets/apartments/UserTicketsApartmentProgressState";
  import BaseModal from "../../../components/common/BaseModal";
  import ApartmentsList from "../../../components/services/apartments/ApartmentsList";
  import CompanyApartmentsNewTicketModal from "components/user/tickets/apartments/CompanyApartmentsNewTicketModal";

  export default {
    name: "UserTicketsApartmentsUser",
    components: {
      BaseModal,
      ApartmentsList,
      ApartmentTicketStatus,
      UserTicketsApartmentsNewTicketModal,
      UserTicketsApartmentProgressState,
      CompanyApartmentsNewTicketModal,
      BaseTable
    },
    async created () {
      await this.getUserTickets();
    },
    data () {
      return {
        isModalVisible: false,
        isApartmentsListModal: false,
        requestId: null,
        expanded: [],
        currentRow: null,
        columns: [
          {
            name: "address",
            required: true,
            label: this.$t("common.address"),
            align: "left",
            sortable: true
          },
          {
            name: "price",
            required: true,
            label: this.$t("common.rentPrice"),
            align: "left",
            sortable: true
          },
          {
            name: "created",
            required: true,
            label: this.$t("common.created"),
            align: "left",
            field: row => row.created,
            format: val => moment(val).fromNow(),
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
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapGetters("user/tickets/living", [
        "tablePagination"
      ]),
      ...mapGetters(["isUserLegal"]),

      ...mapState("user/tickets/living", {
        tableData: state => state.data
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/living/${ GET_USER_TICKETS_LIVING }`];
      },

      ticketModal () {
        return this.isUserLegal ? CompanyApartmentsNewTicketModal : UserTicketsApartmentsNewTicketModal;
      }
    },
    methods: {
      ...mapActions("user/tickets/living", {
        getUserTickets: GET_USER_TICKETS_LIVING,
        deleteUserTicket: DELETE_USER_TICKET_LIVING,
        requestApproval: REQUEST_APPROVAL_LIVING,
        setApartmentViewed: UPDATE_TICKET_APARTMENT_VIEWED
      }),

      toApartments (requestId) {
        this.isApartmentsListModal = true;
        this.requestId = requestId;
        // this.$router.push({
        //   name: "services-apartments",
        //   query: {
        //     requestId
        //   }
        // });
      },

      async apartmentViewed (requestId) {
        await this.setApartmentViewed({ requestId, apartmentViewed: true });
        await this.getUserTickets();
      },

      async apartmentSelected () {
        await this.getUserTickets();
        this.isApartmentsListModal = false;
        this.$q.notify({
          type: "positive",
          message: this.$t("entity.services.living.chooseApartmentSuccess")
        });
      },

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

      onCancel (id) {
        this.$q.dialog({
          title: this.$t("user.tickets.actions.cancel"),
          message: "Вы уверены, что хотите отменить эту заявку?",
          ok: this.$t("action.submit"),
          cancel: this.$t("action.cancel"),
          persistent: true
        })
          .onOk(() => this.cancelTicket(id));
      },

      cancelTicket (id) {
        return this.deleteUserTicket(id)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Заявка отменена"
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При отмене заявки произошла ошибка"
            });
          });
      },

      sendOnApproval (id) {
        id && this.requestApproval(id);
      },

      moment
    }
  };
</script>

<style lang="stylus">

</style>
