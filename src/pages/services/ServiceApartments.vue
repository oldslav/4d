<template lang="pug">
  ApartmentsList(v-model="isApartmentsListModal")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "../../components/common/BaseModal";
  import ApartmentsList from "../../components/services/apartments/ApartmentsList";
  import { GET_APARTMENTS_GEO } from "../../store/constants/action-constants";

  export default {
    name: "ServiceApartments",
    components: { ApartmentsList, BaseModal },
    async created () {
      if (this.$route.query.requestId) {
        await this.GET_APARTMENTS_GEO(this.$route.query.requestId);
      }
    },
    data () {
      return {
        isApartmentsListModal: true
      };
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
