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
          @click="toServiceParking"
          :label="$t('action.toMap')"
        )
      template(v-slot:body="props")
        q-tr(:props="props")
          q-td(key="parkingAddress" :props="props" @click="expandRow(props)")
            | {{props.row.parkingPlace.address}}
          q-td(key="parkingNumber" :props="props" @click="expandRow(props)")
            | {{props.row.parkingPlace.number}}
          q-td(key="type" :props="props" @click="expandRow(props)")
            | {{props.row.parkingPlace.type.description}}
          q-td(key="price" :props="props" @click="expandRow(props)")
            | {{ props.row.price ? props.row.price.price : "0" }}
          q-td(key="created" :props="props" @click="expandRow(props)")
            | {{ moment(props.row.created).format("DD.MM.YYYY") }}
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
                title="Оплата"
                :done="props.row.status.id > 3"
                :name="3"
              )
              q-step(
                title="Подписание договора и получение ключа"
                :done="props.row.status.id === 5"
                :name="5"
              )
            div(v-if="props.row.status.id < 3").q-pa-md
              div.text-body1.text-wrap
                | Пожалуйста, дождитесь решения по вашей заявки.
                | Фонд развития города Иннополис
            div(v-if="props.row.status.id === 3").q-pa-md
              div.text-body1.text-wrap
                | Поздравляем, ваша заявка одобрена!
                | Для начала оформления договора на аренду парковочного места вам нужно внести оплату. В случае, если вы захотите отменить заявку, оплата вернется вам в полном размере.
                | Перед оплатой ознакомьтесь с публичной офертой и примите ее.
                | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.
                | Фонд развития города Иннополис.
              div.text-right
                q-btn(
                  :loading="isPaymentLinkLoading"
                  color="primary"
                  label="Перейти к оплате"
                  @click="getPaymentLink(props.row.id)"
                )
            div(v-if="props.row.status.id === 5").q-pa-md
              div.text-body1.text-wrap
                | Ваш договор готов к подписанию!
                | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
    q-inner-loading(v-else showing)
</template>

<script>
  import moment from "moment";
  import { mapActions, mapState } from "vuex";
  import BaseStatus from "../../components/common/BaseStatus";
  import BaseTable from "../../components/common/BaseTable";
  import UserTicketsApartmentsNewTicketModal
    from "../../components/user/tickets/apartments/UserTicketsApartmentsNewTicketModal";
  import {
    DELETE_USER_TICKET_PARKING,
    GET_USER_TICKETS_PARKING,
    GET_USER_TICKET_PARKING_PAYMENT_LINK
  } from "../../store/constants/action-constants";

  export default {
    name: "UserTicketsParking",
    components: { UserTicketsApartmentsNewTicketModal, BaseStatus, BaseTable },
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
            name: "price",
            required: false,
            label: "Parking price, rub",
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
      ...mapState("user/tickets/parking", {
        data: state => state.data
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/parking/${ GET_USER_TICKETS_PARKING }`];
      },

      isPaymentLinkLoading () {
        return this.$store.state.wait[`user/tickets/parking/${ GET_USER_TICKET_PARKING_PAYMENT_LINK }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", {
        getUserTickets: GET_USER_TICKETS_PARKING,
        deleteUserTicket: DELETE_USER_TICKET_PARKING,
        GET_USER_TICKET_PARKING_PAYMENT_LINK
      }),

      openDetails (data) {
        this.currentRow = data;
        this.isModalVisible = true;
      },

      toServiceParking () {
        this.$router.push({ name: "services-parking" });
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

      getPaymentLink (id) {
        return this.GET_USER_TICKET_PARKING_PAYMENT_LINK(id)
          .then(({ data }) => {
            window.open(data);
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "Ошибка при получении ссылки на оплату"
            });
          });
      },

      moment
    }
  };
</script>

<style lang="stylus" scoped>

</style>
