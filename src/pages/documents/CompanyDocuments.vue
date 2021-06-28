<template lang="pug">
  q-page.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("entity.companyDocuments.bankDetails") }}
        BankDetailsForm
      q-inner-loading(:showing="loadingBank")
        q-spinner(size="50px" color="primary")
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("entity.companyDocuments.companyCard") }}
        CompanyCardForm
      q-inner-loading(:showing="loadingCard")
        q-spinner(size="50px" color="primary")
    q-inner-loading(:showing="loadingPage")
      q-spinner(size="50px" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import {
    GET_COMPANY,
    GET_REFERENCES,
    UPDATE_COMPANY_BANK,
    UPDATE_COMPANY_CARD
  } from "@/store/constants/action-constants";
  import BankDetailsForm from "components/user/company/BankDetailsForm";
  import CompanyCardForm from "components/user/company/CompanyCardForm";

  export default {
    name: "CompanyDocuments",
    components: { CompanyCardForm, BankDetailsForm },
    created () {
      this.loadingPage = true;
      return Promise.all([
        this.GET_COMPANY(),
        this.GET_REFERENCES()
      ]).finally(() => {
        this.loadingPage = false;
      });
    },
    data () {
      return {
        loadingPage: false
      };
    },
    computed: {
      loadingBank () {
        return this.$store.state.wait[`user/company/${ UPDATE_COMPANY_BANK }`];
      },
      loadingCard () {
        return this.$store.state.wait[`user/company/${ UPDATE_COMPANY_CARD }`];
      }
    },
    methods: {
      ...mapActions("user/company", [GET_COMPANY]),
      ...mapActions("references", [GET_REFERENCES])
    }
  };
</script>
