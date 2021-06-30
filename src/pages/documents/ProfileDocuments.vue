<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import UserDocuments from "pages/documents/UserDocuments";
  import CompanyDocuments from "pages/documents/CompanyDocuments";

  export default {
    name: "ProfileDocuments",
    computed: {
      ...mapGetters(["isUserLegal"]),
      activeComponent () {
        return this.isUserLegal ? CompanyDocuments : UserDocuments;
      }
    }
  };
</script>
