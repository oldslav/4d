<template lang="pug">
  .didi
    | sadg
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "../../components/common/BaseModal";
  import { GET_APARTMENTS_GEO } from "../../store/constants/action-constants";

  export default {
    name: "ServiceApartments",
    components: { BaseModal },
    async created () {
      if (this.$route.query.requestId) {
        await this.GET_APARTMENTS_GEO(this.$route.query.requestId);
      }
    },
    methods: {
      ...mapActions("services", [
        GET_APARTMENTS_GEO
      ])
    }
  };
</script>

<style lang="stylus" scoped>
</style>
