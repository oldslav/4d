<template>
  <VerifyCompanyRequestCard :service="service"></VerifyCompanyRequestCard>
</template>
<script>
  import { mapGetters } from "vuex";
  import VerifyCompanyRequestCard from "./VerifyCompanyRequestCard";

  export default {
    components: { VerifyCompanyRequestCard },
    props:{
      service: { type: String, default: "" }
    },
    computed:{
      ...mapGetters("user/company",["isVerifyCompany"])
    }
  };
</script>
