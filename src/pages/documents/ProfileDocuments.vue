<template lang="pug">
  CompanyDocuments(v-if="isUserLegal")
  UserDocuments(v-else)
</template>

<script>
  import { mapGetters } from "vuex";
  import CompanyDocuments from "./CompanyDocuments";
  import UserDocuments from "../UserDocuments";

  export default {
    name: "ProfileDocuments",
    components: { UserDocuments, CompanyDocuments },
    computed: {
      ...mapGetters(["isUserLegal"])
    }
  };
</script>
