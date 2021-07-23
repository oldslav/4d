<template lang="pug">
  verify-company-reject-card(v-if="isRejectedCompany")
  verify-company-await-card(v-else-if="isVerifyCompanyInProgress")
  verify-company-request-card(v-else :service="service")
</template>
<script>
  import { mapGetters } from "vuex";
  import VerifyCompanyRequestCard from "./VerifyCompanyRequestCard";
  import VerifyCompanyAwaitCard from "./VerifyCompanyAwaitCard";
  import VerifyCompanyRejectCard from "./VerifyCompanyRejectCard";

  export default {
    components: { VerifyCompanyRejectCard, VerifyCompanyAwaitCard, VerifyCompanyRequestCard },
    props: {
      service: { type: String, default: "" }
    },
    computed: {
      ...mapGetters("user/company", ["isVerify", "isRejectedCompany", "isVerifyCompanyInProgress"])
    }
  };
</script>
