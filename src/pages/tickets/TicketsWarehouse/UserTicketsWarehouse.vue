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
            @click="toServiceWarehouse"
            :label="$t('action.toMap')"
          )
      template(v-slot:body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="warehouseAddress" :props="props")
            | ул. Спортивная, 130, паркинг
          q-td(key="warehouseType" :props="props")
            | {{ props.row.serviceOption.service.name }}
          q-td(key="price" :props="props")
            | {{ props.row.serviceOption.price ? props.row.serviceOption.price : "0" }}
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
            div.column(v-if="props.row.status.id === 1").q-pa-md
              div.text-body1.text-wrap
                | Для подачи заявки продолжите заполнение формы.
            div(v-if="props.row.status.id === 2").q-pa-md
              div.text-body1.text-wrap
                | Пожалуйста, дождитесь решения по вашей заявке.<br>
                | Фонд развития города Иннополис
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
            div(v-if="props.row.status.id === 13").q-pa-md
              .row
                .col-6.text-body1
                  .full-width
                .col-6.text-body1.text-wrap
                  | Срок действия по вашей заявке истек.<br>
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
            q-stepper(
              ref="stepper"
              :value="props.row.status.id"
              color="primary"
              flat
              animated
              v-if="[3, 7].includes(props.row.status.id)"
            )
              q-step(
                :title="$t('user.tickets.warehouse.steps.first')"
                :done="props.row.status.id > 3"
                :name="3"
              )
                .row
                  .col-6
                    | Вы можете ознакомиться с образцом договора.
                    DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
                  .col-6.text-wrap
                    | Поздравляем, ваша заявка одобрена!<br>
                    | Для начала оформления договора на хранение шин вам нужно внести оплату. В случае, если вы захотите отменить заявку, оплата вернется вам в полном размере.<br>
                    | Перед оплатой ознакомьтесь с публичной офертой и примите ее.<br>
                    | Обращаем ваше внимание, что согласно публичной оферте действие договора начинается в момент оплаты.<br>
                    | Фонд развития города Иннополис
                    div.text-right
                      q-btn(
                        color="primary"
                        label="Перейти к оплате"
                        @click="goToPayment(props.row.id)"
                      )

              q-step(
                :title="$t('user.tickets.warehouse.steps.second')"
                :done="props.row.status.id > 7"
                :name="7"
              )
                .row
                  .col-6
                    | Вы можете ознакомиться с образцом договора.
                    DownloadTemplate(name="Образец договора" :path="templatePath" style="max-width: 50%")
                  .col-6.text-body1.text-wrap
                    | Ваш договор готов к подписанию!<br>
                    | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
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
                        | Если вы хотите отменить заявку, свяжитесь с сотрудниками “Фонда развития города Иннополис” по телефону +7xxxxxxxxxxxx или в телеграмме @алиас<br>
                        | Фонд развития города Иннополис
                        div.text-body1.text-wrap
                          | Ваш договор готов к подписанию!
                          | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
            ValidContractState(
              :contract="props.row.contract"
              v-if="props.row.status.id === 8"
            ).q-pa-lg
    q-inner-loading(v-else showing)
    TicketWarehouseDetailsModal(:id.sync="currentId" v-model="isModalVisible" v-if="currentId")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    DELETE_USER_TICKET_WAREHOUSE,
    GET_USER_TICKETS_WAREHOUSE
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "components/common/BaseTable";
  import TicketWarehouseDetailsModal from "components/user/tickets/warehouse/TicketWarehouseDetailsModal";
  import ValidContractState from "components/user/tickets/ValidContractState";
  import DownloadTemplate from "components/user/tickets/DownloadTemplate";

  export default {
    name: "UserTicketsWarehouse",
    components: { DownloadTemplate, ValidContractState, TicketWarehouseDetailsModal, ApartmentTicketStatus, BaseTable },
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
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "warehouseType",
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
      ...mapGetters("user/tickets/warehouse", ["tableData", "tablePagination"]),
      ...mapFields("user/tickets/warehouse", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      templatePath () {
        return "/uploads/templates/warehouse_contract_template.pdf";
      },
      isLoading () {
        return this.$store.state.wait[`user/tickets/warehouse/${ GET_USER_TICKETS_WAREHOUSE }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", {
        GET_USER_TICKETS_WAREHOUSE,
        deleteUserTicket: DELETE_USER_TICKET_WAREHOUSE
      }),
      async getUserTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_USER_TICKETS_WAREHOUSE();
      },

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
      }
    }
  };
</script>

<style lang="stylus">
.step-details
  background-color: #DEEFFE
.q-stepper
  background-color: #DEEFFE
</style>
