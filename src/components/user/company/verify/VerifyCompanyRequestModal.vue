<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    persistent
    @input="toggleModal"
  )
    q-card.full-width.candidate-details-card
      q-card-section.row.items-center
        .text-medium {{ $t('user.verifyCompany.form.title') }}
        q-space
        q-btn(icon="close" flat round dense v-close-popup)

      q-separator

      q-card-section
        verify-company-request-form(
          v-model="values"
          ref="form"
          @submit="onSubmit"
        )

      q-separator
      q-card-actions.q-pa-md(align="right")
        q-btn(
          @click="toggleModal(false)"
          flat
          color="primary"
        ) {{ $t('action.cancel') }}
        q-btn(
          @click="onSubmit()"
          color="primary"
          unelevated
        ) {{ $t('action.send') }}
</template>

<script>
  import BaseModal from "../../../common/BaseModal";
  import VerifyCompanyRequestForm from "../../../forms/company/VerifyCompanyRequestForm";
  import { mapActions } from "vuex";
  import { SEND_VERIFY_COMPANY_REQUEST } from "../../../../store/constants/action-constants";

  export default {
    name: "VerifyCompanyRequestModal",
    components: { VerifyCompanyRequestForm, BaseModal },
    props: {
      value: { type: Boolean, default: false }
    },

    data (){
      return {
        values:{}
      };
    },

    methods: {
      ...mapActions("user/company", {
        sendVerifyRequest: SEND_VERIFY_COMPANY_REQUEST
      }),
      toggleModal (val) {
        this.$emit("input", val);
      },

      async onSubmit (){
        const isValid = await this.$refs.form.validate();
        if (isValid) {
          this.submit();
        }
      },

      async submit (){
        const notifyEnd = this.$q.notify({
          type: "ongoing",
          message: this.$t("user.verifyCompany.form.loading")
        });

        try {
          await this.sendVerifyRequest(this.values);
          notifyEnd({ timeout: 1, type: "ongoing" });
          this.onSuccessSendRequest();
        } catch (e) {
          notifyEnd({
            type: "negative",
            message: this.$t("user.verifyCompany.form.requestError")
          });
        }
      },

      onSuccessSendRequest (){
        this.toggleModal(false);
        this.$q.dialog({
          title: this.$t("user.verifyCompany.form.requestSuccessTitle"),
          message: this.$t("user.verifyCompany.form.requestSuccessDescription")
        });
      }
    }
  };
</script>

<style scoped>
.candidate-details-card {
  max-width: 816px;
}
</style>
