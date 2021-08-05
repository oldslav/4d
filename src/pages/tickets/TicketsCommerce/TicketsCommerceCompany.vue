<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      :data="tableData"
      :getData="getCompanyTickets"
      row-key="id"
      :loading="isLoading"
      :columns="columns"
      :pagination="tablePagination"
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
        q-tr(:props="props" @click="expandRow")
          q-td(key="address" :props="props")
            | {{ props.row.commerce.address.street }} {{ props.row.commerce.address.house }}
          q-td(key="premisesNumber" :props="props")
            | {{ props.row.commerce.id }}
          q-td(key="created" :props="props")
            | {{ props.row.created | ticketDate }}
          q-td(key="status" :props="props")
            ApartmentTicketStatus(:value="props.row.status.id")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup :disable="props.row.status.id > 3" @click="onCancel(props.row.id)")
                    q-item-section(no-wrap).text-red
                      | {{ $t("user.tickets.actions.cancel") }}
                  q-item(clickable v-close-popup @click="openDetails(props.row.id)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}
    CommerceTicketDetailsModal(v-model="isModalVisible" :id.sync="currentId" v-if="currentId")
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import { CANCEL_TICKET_COMMERCE, GET_COMPANY_COMMERCE_TICKETS } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import BaseTable from "components/common/BaseTable";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import CommerceTicketDetailsModal from "components/user/tickets/commerce/CommerceTicketDetailsModal";

  export default {
    name: "TicketsCommerceCompany",
    components: { CommerceTicketDetailsModal, ApartmentTicketStatus, BaseTable },
    async created () {
      await this.getCompanyTickets();
    },
    data () {
      return {
        currentId: null,
        isModalVisible: false,
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
        return this.$store.state.wait[`user/tickets/commerce/${ GET_COMPANY_COMMERCE_TICKETS }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/commerce", [GET_COMPANY_COMMERCE_TICKETS, CANCEL_TICKET_COMMERCE]),
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
      expandRow () {

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
      toServiceCommerce () {
        this.$router.push({ name: "services-commerce" });
      }
    }
  };
</script>
