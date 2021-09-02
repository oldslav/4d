<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :loading="isLoading"
      :getData="getUserTickets"
      :expanded.sync="expanded"
      :pagination="tablePagination"
    )
      template(v-slot:top)
        .full-width.text-right
          q-btn(
            outline
            color="primary"
            @click="toServiceParking"
            :label="$t('action.toMap')"
          )
        TicketDetailsModal(:id.sync="currentId" v-model="isModalVisible" v-if="currentId")
      template(v-slot:body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="parkingAddress" :props="props" )
            | {{props.row.parkingPlace.address}}
          q-td(key="parkingNumber" :props="props")
            | {{props.row.parkingPlace.number}}
          q-td(key="type" :props="props")
            | {{parkingType(props.row)}}
          q-td(key="price" :props="props")
            | {{ props.row.price ? props.row.price.price : "0" }}
          q-td(key="created" :props="props")
            | {{ props.row.created | ticketDate }}
          q-td(key="status" :props="props")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id > 3" @click="cancelTicket(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}

        q-tr.step-details(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            q-stepper(
              ref="stepper"
              :value="props.row.status.id"
              color="primary"
              flat
              animated
              v-if="props.row.status.id >= 3 && props.row.status.id < 8"
            )
              q-step(
                title="Оплата"
                :done="props.row.status.id > 3"
                :name="3"
              )
              q-step(
                title="Подписание договора и получение ключа"
                :done="props.row.status.id > 7"
                :name="7"
              )
            div(v-if="props.row.status.id < 3").q-pa-md
              div.text-body1.text-wrap
                | Пожалуйста, дождитесь решения по вашей заявке.<br>
                | Фонд развития города Иннополис
            div(v-if="props.row.status.id === 3 && props.row.isGuestVisit").q-pa-md
              .row
                .col-6
                  .full-width
                .col-6
                  div.text-body1.text-wrap
                    | Поздравляем, ваша заявка одобрена!<br>
                    | Для вас  сформирована задолженность в размере обеспечительного платежа.<br>
                    | Перед оплатой задолженности ознакомьтесь с публичной офертой и примите ее.<br>
                    | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.<br>
                    | Фонд развития города Иннополис
                  div.text-right
                    q-btn(
                      :loading="isPaymentLinkLoading"
                      color="primary"
                      label="Перейти к оплате"
                      @click="goToPayment(props.row.id)"
                    )
            div(v-else-if="props.row.status.id === 3 && props.row.personCategory && props.row.personCategory.isSocial").q-pa-md
              .row
                .col-6
                  .full-width
                .col-6
                  div.text-body1.text-wrap
                    | Поздравляем, ваша заявка одобрена!
                    |  Фонд развития города Иннополис приступил к подготовке договора к подписанию.
                    |  После того, как договор будет готов, вам придет приглашение на подписание. Статус заявки обновится автоматически.
                    |  Фонд развития города Иннополис
            div(v-else-if="props.row.status.id === 3").q-pa-md
              .row
                .col-6
                  | Вы можете ознакомиться с образцом договора.
                  DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
                .col-6
                  div.text-body1.text-wrap
                    | Поздравляем, ваша заявка одобрена!<br>
                    | Для начала оформления договора на аренду парковочного места вам нужно внести оплату. В случае, если вы захотите отменить заявку, оплата вернется вам в полном размере.<br>
                    | Перед оплатой ознакомьтесь с публичной офертой и примите ее.<br>
                    | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.<br>
                    | Фонд развития города Иннополис
                  div.text-right
                    q-btn(
                      :loading="isPaymentLinkLoading"
                      color="primary"
                      label="Перейти к оплате"
                      @click="goToPayment(props.row.id)"
                    )
            div(v-if="props.row.status.id === 7 && props.row.isGuestVisit").q-pa-md
              .row
                .col-6
                  .full-width
                .col-6.text-body1.text-wrap
                  | Вам необходимо подойти в “Фонд развития города Иннополис” для получения ключей.
                  div.q-col-gutter-sm.q-mt-md
                    .text-primary-light
                      | Адрес
                    div
                      | г. Иннополис, ул. Спортивная, 112
                    .text-primary-light
                      | Время работы
                    .flex.items-center.justify-between
                      div
                        | понедельник - четверг
                      div
                        | 9:00 - 18:00
                    .flex.items-center.justify-between
                      div
                        | пятница
                      div
                        | 9:00 - 17:00
                    div
                      | Если вы хотите отменить заявку, свяжитесь с сотрудниками “Фонда развития города Иннополис”.<br>
                      | В рабочее время по телефону +7 (937) 622-93-84 или в телеграмме @Parking_Innopolis.<br>
                      | В выходные и праздничные дни по телефону +7 (939) 731-17-55<br>
                      | Фонд развития города Иннополис
            div(v-else-if="props.row.status.id === 7").q-pa-md
              .row
                .col-6.text-body1
                  | Вы можете ознакомиться с образцом договора.
                  DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
                .col-6.text-body1.text-wrap
                  | Ваш договор готов к подписанию!<br>
                  | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора.
                  div.q-col-gutter-sm.q-mt-md
                    .text-primary-light
                      | Адрес
                    div
                      | г. Иннополис, ул. Спортивная, 112
                    .text-primary-light
                      | Время работы
                    .flex.items-center.justify-between
                      div
                        | понедельник - четверг
                      div
                        | 9:00 - 18:00
                    .flex.items-center.justify-between
                      div
                        | пятница
                      div
                        | 9:00 - 17:00
                    div
                      | Если вы хотите отменить заявку, свяжитесь с сотрудниками “Фонда развития города Иннополис”.<br>
                      | В рабочее время по телефону +7 (937) 622-93-84 или в телеграмме @Parking_Innopolis.<br>
                      | В выходные и праздничные дни по телефону +7 (939) 731-17-55<br>
                      | Фонд развития города Иннополис
            ValidContractState(
              :contract="props.row.contract"
              v-if="props.row.status.id === 8"
              :termination="contractTermination"
            ).q-pa-lg
            div(v-if="props.row.status.id === 13").q-pa-md
              .row
                .col-6.text-body1
                  .full-width
                .col-6.text-body1.text-wrap
                  | Срок действия договора по вашей заявке истек.<br>
                  | Для уточнения информации свяжитесь с ответственным сотрудником фонда.
                  div.q-col-gutter-sm.q-mt-md
                    .text-primary-light
                      | Адрес
                    div
                      | г. Иннополис, ул. Спортивная, 112
                    .text-primary-light
                      | Время работы
                    .flex.items-center.justify-between
                      div
                        | понедельник - четверг
                      div
                        | 9:00 - 18:00
                    .flex.items-center.justify-between
                      div
                        | пятница
                      div
                        | 9:00 - 17:00
                    .text-primary-light
                      | Телефон
                    .flex.items-center.justify-between
                      div
                        | +7 (937) 622-93-84
                    .text-primary-light
                      | Телеграм
                    .flex.items-center.justify-between
                      div
                        | @Parking_Innopolis
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    DELETE_USER_TICKET_PARKING,
    GET_USER_TICKETS_PARKING,
    GET_USER_TICKET_PARKING_PAYMENT_LINK
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "../../components/common/BaseTable";
  import TicketDetailsModal from "components/user/tickets/parking/TicketDetailsModal";
  import ValidContractState from "components/user/tickets/ValidContractState";
  import DownloadTemplate from "components/user/tickets/DownloadTemplate";

  export default {
    name: "UserTicketsParking",
    components: { ApartmentTicketStatus, BaseTable, TicketDetailsModal, ValidContractState, DownloadTemplate },
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
            name: "parkingAddress",
            required: false,
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "parkingNumber",
            required: false,
            label: this.$t("common.number"),
            align: "left"
          },
          {
            name: "type",
            required: false,
            label: this.$t("common.type"),
            align: "left"
          },
          {
            name: "price",
            required: false,
            label: this.$t("common.rentPrice"),
            align: "left"
          },
          {
            name: "created",
            required: true,
            label: this.$t("common.created"),
            align: "left",
            field: row => row.created,
            format: val => moment(val).format("DD.MM.YYYY")
          },
          {
            name: "status",
            required: true,
            label: this.$t("common.status"),
            align: "left"
          },
          {
            name: "menu",
            align: "right"
          }
        ]
      };
    },
    computed: {
      ...mapGetters("user/tickets/parking", ["tableData", "tablePagination"]),

      ...mapFields("user/tickets/parking", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      isLoading () {
        return this.$store.state.wait[`user/tickets/parking/${ GET_USER_TICKETS_PARKING }`];
      },

      isPaymentLinkLoading () {
        return this.$store.state.wait[`user/tickets/parking/${ GET_USER_TICKET_PARKING_PAYMENT_LINK }`];
      },

      templatePath () {
        return this.isUserLegal ? "/uploads/templates/parking_contract_jur_template.pdf" : "/uploads/templates/parking_contract_template.pdf";
      },

      contractTermination () {
        return "/uploads/templates/parking_contract_termination.pdf";
      }
    },
    methods: {
      ...mapActions("user/tickets/parking", {
        GET_USER_TICKETS_PARKING,
        deleteUserTicket: DELETE_USER_TICKET_PARKING,
        GET_USER_TICKET_PARKING_PAYMENT_LINK
      }),

      parkingType (row) {
        if (row.isGuestVisit) {
          return this.$t("entity.services.parking.ticketType.guest");
        }
        return this.$t(`entity.services.parking.ticketType.${ row.parkingPlace.type.name }`);
      },

      async getUserTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_USER_TICKETS_PARKING();
      },

      openDetails (id) {
        this.currentId = id;
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

      goToPayment (id) {
        this.$router.push({ name: "user-bills-parking", params: { ticket: id } });
      }
    }
  };
</script>

<style lang="stylus" scoped>
.step-details
  background-color: #DEEFFE
.q-stepper
  background-color: #DEEFFE
</style>
