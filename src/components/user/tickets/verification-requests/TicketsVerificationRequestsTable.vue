<template lang="pug">
  BaseTable(
    row-key="id"
    :columns="getTableColumns"
    :data="data"
    :pagination="pagination"
    :getData="getData"
    :isLoading="isLoading"
  )
    template(v-slot:body="props")
      q-tr(:props="props")
        q-td(key="companyName" :props="props")
          div.break-word.break-spaces {{ props.row.name }}

        q-td(key="legalAddress" :props="props")
          div.break-word.break-spaces {{ props.row.legalAddress }}

        q-td(key="created" :props="props")
          | {{ props.row.created | formatDate }}

        q-td(key="status" :props="props")
          verification-request-status(:value="props.row.status")

        q-td(auto-width key="actions" :props="props")
          q-btn(
            v-show="verificationStatuses.inProgress === props.row.status.id"
            @click.stop="onClickRejectRequest(props.row.id)"
            icon="close"
            color="red"
            flat
            round
            dense
          )

          q-btn(
            v-show="verificationStatuses.inProgress === props.row.status.id"
            @click.stop="onClickApproveRequest(props.row.id)"
            icon="done"
            color="primary"
            size="md"
            flat
            round
            dense
          )

          q-btn(flat round dense icon="more_vert")
            q-menu
              q-list
                q-item(@click="onClickShowRequestDetails(props.row.id)" clickable v-close-popup)
                  q-item-section(no-wrap)
                    | {{ $t('user.tickets.verifyRequests.table.details') }}
</template>
<script>
  import BaseTable from "../../../common/BaseTable";
  import VerificationRequestStatus from "./VerificationRequestStatus";
  import { CompanyVerificationRequestStatuses } from "../../../../store/types/user/company";

  export default {
    components:{ VerificationRequestStatus, BaseTable },
    props:{
      pagination: { type: Object, default:() => ({}) },
      data: { type: Object, default:() => ({}) },
      getData: { type: Function, default:() => () => ({}) },
      isLoading: { type: Boolean, default: false }
    },
    data (){
      return {
        verificationStatuses: CompanyVerificationRequestStatuses
      };
    },
    computed: {
      getTableColumns () {
        return [
          {
            name: "companyName",
            required: false,
            label: this.$t("user.tickets.verifyRequests.table.companyName"),
            align: "left",
            sortable: false
          },
          {
            name: "legalAddress",
            required: false,
            label: this.$t("user.tickets.verifyRequests.table.legalAddress"),
            align: "left",
            sortable: false
          },
          {
            name: "created",
            required: false,
            label: this.$t("user.tickets.verifyRequests.table.created"),
            align: "left",
            sortable: false
          },
          {
            name: "status",
            required: false,
            label: this.$t("user.tickets.verifyRequests.table.status"),
            align: "left",
            sortable: false
          },
          {
            name: "actions",
            required: false,
            label: "",
            align: "right",
            sortable: false
          }
        ];
      }
    },
    methods:{
      onClickRejectRequest (id){
        this.$emit("request:reject", id);
      },

      onClickApproveRequest (id){
        this.$emit("request:approve", id);
      },

      onClickShowRequestDetails (id){
        this.$emit("request:details", id);
      }
    }
  };
</script>
