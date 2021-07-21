<template lang="pug">
  div.q-pa-md
    BaseModal(
      v-if="pickedFeature"
      v-model="isApartmentsListModal"
      position="standard"
    )
      ApartmentsList(
        :requestId="requestId"
        :buildingId="pickedFeature.id"
        @close="apartmentSelected"
      )
</template>

<script>
  import { GET_APARTMENTS_GEO } from "../../store/constants/action-constants";
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import ApartmentsList from "../../components/services/apartments/ApartmentsList";
  import BaseModal from "../../components/common/BaseModal";
  import { SET_FEATURE_ID } from "../../store/constants/mutation-constants";

  export default {
    name: "ServiceApartments",
    components: { BaseModal, ApartmentsList },
    async created () {
      await this.GET_APARTMENTS_GEO(this.requestId);
    },
    computed: {
      ...mapGetters("services", [
        "pickedFeature"
      ]),

      isApartmentsListModal: {
        get () {
          return Boolean(this.pickedFeature);
        },

        set () {
          this.SET_FEATURE_ID(null);
        }
      },

      requestId () {
        return this.$route.query.requestId;
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      ...mapActions("services", [
        GET_APARTMENTS_GEO
      ]),

      apartmentSelected () {
        this.$router.push({ name: "user-tickets-apartments" });
        this.$q.notify({
          type: "positive",
          message: this.$t("entity.services.living.chooseApartmentSuccess")
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
