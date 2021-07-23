<template lang="pug">
  div
    BaseTable(
      v-if="tableData"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :getData="getEmployeeTickets"
      :expanded.sync="expanded"
      :pagination="tablePagination"
      :is-loading="isLoading"
    )
      template(#body="props")
        q-tr(:props="props" @click="expandRow(props)")
          q-td(key="fullname" :props="props")
            | {{props.row.name.full}}
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
          q-td(key="controls")
            q-btn(flat icon="close" v-if="props.row.status.id === 2" color="red" @click="onTicketReject(props.row.id)")
            q-btn(flat icon="done" v-if="props.row.status.id === 2" color="primary" @click="onTicketApprove(props.row.id)")
          q-td(auto-width)
            q-btn(flat round dense icon="more_vert" @click.stop)
              q-menu
                q-list
                  q-item(clickable v-close-popup @click="showDetails(props.row)")
                    q-item-section(no-wrap)
                      | {{ $t("user.tickets.actions.details") }}

        q-tr(v-show="props.expand" :props="props")
          q-td(colspan="100%").is-paddingless
            div(v-if="props.row.status.id === 8").q-pa-md
            q-stepper(
              ref="stepper"
              :value="props.row.status.id"
              color="primary"
              flat
              animated
            )
              q-step(
                :title="$t('user.tickets.warehouse.steps.first')"
                :done="props.row.status.id > 4"
                :name="3"
              )
                div.text-body1.text-wrap
                  | Для продолжения оформления документов дождитесь оплаты.
              q-step(
                :title="$t('user.tickets.warehouse.steps.second')"
                :done="props.row.status.id > 7"
                :name="7"
              )
                div.text-body1.text-wrap
                  | Договор подписан.
                  | Введите данные договора.
                .row
                  BaseInput.col-2.q-my-md(
                    v-model="contractInfo.number"
                    :rules="[ val => val !== null && val !== '' || '']"
                    :label="$t('user.bills.contractNumber')"
                  )
                .row
                  q-input.col-2.q-mr-lg(
                    ref="date"
                    filled
                    v-model="contractInfo.startDate"
                    :label="$t('user.bills.dateContractConcluded')"
                    lazy-rules
                    :rules="[ val => val !== null && val !== '' || '']"
                    @click="$refs.qDateConcludedProxy.show()"
                  )
                    template(v-slot:append)
                      q-icon(name="event" class="cursor-pointer")
                        q-popup-proxy(ref="qDateConcludedProxy")
                          q-date(
                            v-model="contractInfo.startDate"
                            :mask="'YYYY-MM-DD'"
                            @input="$refs.qDateConcludedProxy.hide()"
                          )
                  q-input.col-2(
                    ref="date"
                    filled
                    v-model="contractInfo.endDate"
                    :label="$t('user.bills.dateContractExpire')"
                    lazy-rules
                    :rules="[ val => val !== null && val !== '' || '']"
                    @click="$refs.qDateExpireProxy.show()"
                  )
                    template(v-slot:append)
                      q-icon(name="event" class="cursor-pointer")
                        q-popup-proxy(ref="qDateExpireProxy")
                          q-date(
                            v-model="contractInfo.endDate"
                            :mask="'YYYY-MM-DD'"
                            @input="$refs.qDateExpireProxy.hide()"
                          )
                .row
                  q-btn(
                    :disable="!isContractInfoFilled"
                    color="primary"
                    :loading="loadingContract"
                    :label="$t('user.tickets.actions.next')"
                    @click="sendContractInfo(props.row.id)"
                  )
    TicketWarehouseDetailsModal(v-model="showDetailsModal" :id.sync="activeId" v-if="activeId" @reject="onTicketReject" @approve="onTicketApprove")
</template>

<script>
  import moment from "moment";
  import { mapActions, mapGetters } from "vuex";
  import { mapFields } from "@/plugins/mapFields";
  import {
    GET_EMPLOYEE_TICKETS_WAREHOUSE,
    APPROVE_TICKET_WAREHOUSE,
    REJECT_TICKET_WAREHOUSE,
    SEND_CONTRACT_INFO_WAREHOUSE
  } from "@/store/constants/action-constants";
  import { UPDATE_PAGINATION } from "@/store/constants/mutation-constants";
  import ApartmentTicketStatus from "components/user/tickets/apartments/ApartmentTicketStatus";
  import BaseTable from "components/common/BaseTable";
  import BaseInput from "components/common/BaseInput";
  import BaseDatepicker from "components/common/BaseDatepicker";
  import ApartmentsEmployeeDetailsModal from "components/user/tickets/apartments/ApartmentsEmployeeDetailsModal";
  import TicketWarehouseDetailsModal from "components/user/tickets/warehouse/TicketWarehouseDetailsModal";

  export default {
    name: "EmployeeTicketsWarehouse",
    components: {
      TicketWarehouseDetailsModal,
      ApartmentsEmployeeDetailsModal,
      BaseTable,
      BaseInput,
      BaseDatepicker,
      ApartmentTicketStatus
    },
    async created () {
      await this.getEmployeeTickets();
    },
    data () {
      return {
        activeId: null,
        showDetailsModal: false,
        rejectionReason: "",
        expanded: [],
        columns: [
          {
            name: "fullname",
            required: true,
            label: this.$t("common.fullname"),
            align: "left"
          },
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
            format: val => moment(val).format("DD.MM.YYYY"),
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
            name: "controls",
            align: "right"
          },
          {
            name: "menu",
            align: "right"
          }
        ],
        contractInfo: {
          number: null,
          startDate: null,
          endDate: null
        }
      };
    },
    computed: {
      ...mapGetters("user/tickets/warehouse", ["tablePagination", "tableData"]),
      ...mapFields("user/tickets/warehouse", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),
      isContractInfoFilled () {
        return !!this.contractInfo.number
          && !!this.contractInfo.startDate
          && !!this.contractInfo.endDate;
      },
      loadingContract () {
        return this.$store.state.wait[`user/tickets/warehouse/${ SEND_CONTRACT_INFO_WAREHOUSE }`];
      },
      isLoading (){
        return this.$store.state.wait[`user/tickets/warehouse/${ GET_EMPLOYEE_TICKETS_WAREHOUSE }`];
      }
    },
    methods: {
      ...mapActions("user/tickets/warehouse", {
        GET_EMPLOYEE_TICKETS_WAREHOUSE,
        REJECT_TICKET_WAREHOUSE,
        APPROVE_TICKET_WAREHOUSE,
        SEND_CONTRACT_INFO_WAREHOUSE
      }),

      async getEmployeeTickets (props) {
        if (props) {
          const { pagination: { page, rowsPerPage } } = props;

          this.limit = rowsPerPage;
          this.offset = page;
        }

        await this.GET_EMPLOYEE_TICKETS_WAREHOUSE();
      },

      onTicketReject (id) {
        this.$q.dialog({
          title: this.$t("entity.services.ticketRejection"),
          message: this.$t("user.messages.ticketStatusUpdate"),
          ok: this.$t("action.submit"),
          cancel: this.$t("action.cancel"),
          prompt: {
            model: "",
            type: "textarea",
            isValid: val => !!val,
            label: "Reason",
            outlined: true,
            stackLabel: true
          },
          persistent: false
        })
          .onOk((reason) => this.rejectTicket(id, reason));
      },

      rejectTicket (id, reason) {
        return this.REJECT_TICKET_WAREHOUSE({ id, reason })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.services.messages.reject.success")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.services.messages.reject.success")
            });
          });
      },

      onTicketApprove (id) {
        return this.APPROVE_TICKET_WAREHOUSE({ id })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("entity.services.messages.approve.success")
            });
            return this.getEmployeeTickets();
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("entity.services.messages.approve.fail")
            });
          });
      },

      expandRow (props) {
        const row = this.expanded.indexOf(props.key);

        if (row === -1) {
          this.expanded.push(props.key);
          this.contractInfo.contractNumber = null;
          this.contractInfo.dateContractConcluded = null;
          this.contractInfo.dateContractExpire = null;
        } else {
          this.expanded.splice(row, 1);
        }
      },

      showDetails (row) {
        this.activeId = row.id;
        this.showDetailsModal = true;
      },

      sendContractInfo (id) {
        this.SEND_CONTRACT_INFO_WAREHOUSE({ id, payload: this.contractInfo })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t("user.tickets.contract.sendSuccess")
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t("user.tickets.contract.sendFail")
            });
          });
      }
    }
  };
</script>
