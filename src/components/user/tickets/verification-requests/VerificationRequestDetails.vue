<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.verification-request-details-card
      q-card-section.row.items-center
        .text-medium {{ $t('user.tickets.verifyRequests.detailsTitle') }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)
      q-separator

      q-card-section
        q-field.q-mb-md(
          :label="$t('entity.companyDocuments.fullCompanyName')"
          borderless
          stack-label
        )
          template(v-slot:control)
            div.self-center.full-width.no-outline {{ request.name }}

        q-field.q-mb-md(
          :label="$t('entity.companyDocuments.legalAddress')"
          borderless
          stack-label
        )
          template(v-slot:control)
            div.self-center.full-width.no-outline {{ request.legalAddress }}

        q-field.q-mb-md(
          :label="$t('entity.companyDocuments.realAddress')"
          borderless
          stack-label
        )
          template(v-slot:control)
            div.self-center.full-width.no-outline {{ request.realAddress }}

        q-field(
          :label="$t('entity.companyDocuments.okved')"
          borderless
          stack-label
        )
          template(v-slot:control)
            div.self-center.full-width.no-outline {{ request.okved }}


      q-separator(v-if="visibleActions")
      q-card-actions.q-pa-md(v-if="visibleActions" align="right")
        q-btn(
          @click="onClickReject()"
          flat
          color="red"
        ) {{ $t('action.reject') }}
        q-btn(
          @click="onClickAccept()"
          color="primary"
          unelevated
        ) {{ $t('action.accept') }}
</template>

<script>
  import BaseModal from "../../../common/BaseModal";
  import VerifyCompanyRequestForm from "../../../forms/company/VerifyCompanyRequestForm";
  import { CompanyVerificationRequestStatuses } from "../../../../store/types/user/company";

  export default {
    name: "VerificationRequestDetails",
    components: { VerifyCompanyRequestForm, BaseModal },
    props: {
      value: { type: Boolean, default: false },
      request: { type: Object, default: () => ({}) }
    },

    data (){
      return {};
    },

    computed:{
      visibleActions (){
        return this.request && this.request.status.id === CompanyVerificationRequestStatuses.inProgress;
      }
    },

    methods: {
      toggleModal (val){
        this.$emit("input", val);
      },

      onClickReject (){
        this.$emit("request:reject", this.request.id);
      },

      onClickAccept (){
        this.$emit("request:approve", this.request.id);
      }
    }
  };
</script>

<style scoped>
.verification-request-details-card {
  max-width: 816px;
}
</style>
