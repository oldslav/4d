<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        CompanyForm
</template>

<script>
  import { mapActions } from "vuex";
  import CompanyForm from "components/user/company/CompanyForm";
  import { GET_COMPANY } from "@/store/constants/action-constants";

  export default {
    name: "UserCompanyProfile",
    components: { CompanyForm },
    created () {
      this.GET_COMPANY();
    },
    methods: {
      ...mapActions("user/company", [GET_COMPANY])
    }
  };
</script>
