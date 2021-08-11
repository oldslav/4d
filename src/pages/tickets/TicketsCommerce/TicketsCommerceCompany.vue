<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      :data="tableData"
      :getData="getCompanyTickets"
      row-key="id"
      :is-loading="isLoading"
      :columns="columns"
      :pagination="tablePagination"
      :expanded.sync="expanded"
    )
      template(#top)
        .full-width.text-right
          q-btn(
            outline
            color="primary"
            @click="toServiceCommerce()"
            :label="$t('action.toMap')"
          )
      template(#body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="address" :props="props")
            | {{ props.row.commerce.address.street }} {{ props.row.commerce.address.house }}
          q-td(key="premisesNumber" :props="props")
            | {{ props.row.commerce.id }}
          q-td(key="created" :props="props")
            | {{ props.row.created | ticketDate }}
          q-td(key="status" :props="props")
            CommerceTicketStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id === 2" @click="onCancel(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup :disable="![9, 4, 1].includes(props.row.status.id)" @click="onDelete(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("action.delete") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
        q-tr(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div.column(v-if="props.row.status.id === 2").q-pa-md
              div.text-body1.text-wrap
                | Дождитесь рассмотрения вашей заявки
            div.column(v-if="props.row.status.id === 7").q-pa-md.q-col-gutter-md
              div.text-body1.text-wrap
                | Ваш договор готов к подписанию!
              div.text-body1.text-wrap
                | Вам необходимо подойти в “Фонд развития города Иннополис” для подписания договора и получения ключей.
            div.column(v-if="props.row.status.id === 8").q-pa-md
              div.text-body1.text-wrap
                | Договор подписан
            div.column(v-if="[4, 9].includes(props.row.status.id)").q-pa-md
              div.text-body1.text-wrap
                | Работа над заявкой завершена
    CommerceTicketDetailsModal(v-model="isModalVisible" :id.sync="currentId" v-if="currentId")
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    CANCEL_TICKET_COMMERCE,
    DELETE_TICKET_COMMERCE,
    GET_COMPANY_COMMERCE_TICKETS
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import BaseTable from "components/common/BaseTable";
  import CommerceTicketDetailsModal from "components/user/tickets/commerce/CommerceTicketDetailsModal";
  import CommerceTicketStatus from "components/user/tickets/commerce/CommerceTicketStatus";

  export default {
    name: "TicketsCommerceCompany",
    components: { CommerceTicketStatus, CommerceTicketDetailsModal, BaseTable },
    async created () {
      await this.getCompanyTickets();
    },
    data () {
      return {
        currentId: null,
        isModalVisible: false,
        expanded: [],
        columns: [
          {
            name: "address",
            required: true,
            label: this.$t("common.address"),
            align: "left"
          },
          {
            name: "premisesNumber",
            required: true,
            label: this.$t("common.premisesNumber"),
            align: "left"
          },
          {
            name: "created",
            required: true,
            label: this.$t("common.created"),
            align: "left"
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
      ...mapGetters("user/tickets/commerce", ["tableData", "tablePagination"]),
      ...mapFields("user/tickets/commerce", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      isLoading () {
        return this.$store.state.wait[`user/tickets/commerce/${ GET_COMPANY_COMMERCE_TICKETS }`] || this.$store.state.wait[`user/tickets/commerce/${ DELETE_TICKET_COMMERCE }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/commerce", [GET_COMPANY_COMMERCE_TICKETS, CANCEL_TICKET_COMMERCE, DELETE_TICKET_COMMERCE]),
      async getCompanyTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_COMPANY_COMMERCE_TICKETS();
      },
      openDetails (id) {
        this.currentId = id;
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
        return this.CANCEL_TICKET_COMMERCE(id)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Заявка отменена"
            });
            this.GET_COMPANY_COMMERCE_TICKETS();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При отмене заявки произошла ошибка"
            });
          });
      },
      onDelete (id) {
        return this.DELETE_TICKET_COMMERCE(id)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Заявка удалена"
            });
            this.GET_COMPANY_COMMERCE_TICKETS();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При удалении заявки произошла ошибка"
            });
          });
      },
      toServiceCommerce () {
        this.$router.push({ name: "services-commerce" });
      }
    }
  };
</script>
