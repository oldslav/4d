<template lang="pug">
  q-page.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("entity.companyDocuments.bankDetails") }}
        BankDetailsForm
      q-inner-loading(:showing="loadingBank")
        q-spinner(size="50px" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import { GET_COMPANY, GET_REFERENCES, UPDATE_COMPANY_BANK } from "@/store/constants/action-constants";
  import BankDetailsForm from "components/user/company/BankDetailsForm";

  export default {
    name: "CompanyDocuments",
    components: { BankDetailsForm },
    created () {
      this.GET_COMPANY();
    },
    computed: {
      loadingBank () {
        return this.$store.state.wait[`user/company/${ UPDATE_COMPANY_BANK }`];
      }
    },
    methods: {
      ...mapActions("user/company", [GET_COMPANY]),
      ...mapActions("references", [GET_REFERENCES])
    }
  };
</script>
