<template lang="pug">
  div.flex.items-center.flex-break.justify-center
    verify-company-reject-card(v-if="isRejectedCompany" @request="showRequestModal")
    verify-company-await-card(v-else-if="isVerifyCompanyInProgress")
    verify-company-request-card(v-else :service="service" @request="showRequestModal")
    verify-company-request-modal(v-model="visibleRequestModal")
</template>
<script>
  import { mapGetters } from "vuex";
  import VerifyCompanyRequestCard from "./VerifyCompanyRequestCard";
  import VerifyCompanyAwaitCard from "./VerifyCompanyAwaitCard";
  import VerifyCompanyRejectCard from "./VerifyCompanyRejectCard";
  import VerifyCompanyRequestModal from "./VerifyCompanyRequestModal";

  export default {
    components: {
      VerifyCompanyRequestModal,
      VerifyCompanyRejectCard,
      VerifyCompanyAwaitCard,
      VerifyCompanyRequestCard
    },
    props: {
      service: { type: String, default: "" }
    },
    data (){
      return {
        visibleRequestModal: false
      };
    },
    computed: {
      ...mapGetters("user/company", ["isVerify", "isRejectedCompany", "isVerifyCompanyInProgress"])
    },
    methods:{
      showRequestModal (){
        this.visibleRequestModal = true;
      }
    }
  };
</script>
