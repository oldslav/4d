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
          outline
          color="primary"
          @click="toServiceWarehouse"
          :label="$t('action.toMap')"
        )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="warehouseAddress" :props="props" @click="expandRow(props)")
            | ул. Спортивная, 130, паркинг
          q-td(key="warehouseType" :props="props" @click="expandRow(props)")
            | {{ props.row.serviceOption.service.name }}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row.serviceOption.price ? props.row.serviceOption.price : "0" }}
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
          q-td(key="status" :props="props" @click="expandRow(props)")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert")
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id > 3" @click="cancelTicket(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}

        q-tr(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div(v-if="props.row.status.id < 3").q-pa-md
              div.text-body1.text-wrap
                | Пожалуйста, дождитесь решения по вашей заявке.
                | Фонд развития города Иннополис
            q-stepper(
              ref="stepper"
              :value="props.row.status.id"
              color="primary"
              flat
              animated
              v-if="props.row.status.id >= 3"
            )
              q-step(
                title="Оплата"
                :done="props.row.status.id > 3"
                :name="3"
              )
                div.text-body1.text-wrap
                  | Поздравляем, ваша заявка одобрена!
                  | Для начала оформления договора на аренду парковочного места вам нужно внести оплату. В случае, если вы захотите отменить заявку, оплата вернется вам в полном размере.
                  | Перед оплатой ознакомьтесь с публичной офертой и примите ее.
                  | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.
                  | Фонд развития города Иннополис.
                div.text-right
                  q-btn(
                    color="primary"
                    label="Перейти к оплате"
                    @click="goToPayment(props.row.id)"
                  )
              q-step(
                title="Подписание договора и получение ключа"
                :done="props.row.status.id > 7"
                :name="7"
              )
                div.text-body1.text-wrap
                  | Ваш договор готов к подписанию!
                  | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
    q-inner-loading(v-else showing)
    TicketWarehouseDetailsModal(:id.sync="currentId" v-model="isModalVisible" v-if="currentId")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import {
    DELETE_USER_TICKET_WAREHOUSE,
    GET_USER_TICKETS_WAREHOUSE
  } from "@/store/constants/action-constants";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "components/common/BaseTable";
  import TicketWarehouseDetailsModal from "components/user/tickets/warehouse/TicketWarehouseDetailsModal";

  export default {
    name: "UserTicketsWarehouse",
    components: { TicketWarehouseDetailsModal, ApartmentTicketStatus, BaseTable },
    async created () {
      await this.getUserTickets();
    },
    data () {
      return {
        isModalVisible: false,
        expanded: [],
        currentId: null,
        columns: [
          {
            name: "warehouseAddress",
            required: false,
            label: "Address",
            align: "left",
            sortable: true
          },
          {
            name: "warehouseType",
            required: false,
            label: "Type",
            align: "left",
            sortable: true
          },
          {
            name: "price",
            required: false,
            label: "Price, rub",
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
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapState("user/tickets/warehouse", {
        data: state => state.data
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/warehouse/${ GET_USER_TICKETS_WAREHOUSE }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", {
        getUserTickets: GET_USER_TICKETS_WAREHOUSE,
        deleteUserTicket: DELETE_USER_TICKET_WAREHOUSE
      }),

      openDetails (id) {
        this.currentId = id;
        this.isModalVisible = true;
      },

      toServiceWarehouse () {
        this.$router.push({ name: "services-warehouse" });
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

      goToPayment (id) {
        this.$router.push({ name: "user-bills-warehouse", params: { ticket: id } });
      },

      moment
    }
  };
</script>
