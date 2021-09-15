<template lang="pug">
  div
</template>

<script>
  import { mapActions, mapState, mapGetters } from "vuex";
  import { GET_COMMERCE_GEO } from "@/store/constants/action-constants";

  export default {
    name: "ServiceCommerce",
    preFetch ({ store }) {
      return store.dispatch(`services/${ GET_COMMERCE_GEO }`);
    },
    computed: {
      ...mapState("services", {
        placeId: state => state.pickedFeatureId
      }),
      ...mapGetters("services", ["pickedFeature"]),
      loading () {
        return this.$store.state.wait[`services/${ GET_COMMERCE_GEO }`];
      }
    },
    methods: {
      ...mapActions("services", [GET_COMMERCE_GEO])
    },
    watch: {
      placeId (val) {
        if (val) {
          if (this.pickedFeature.properties.fill === "#FF6565") {
            return;
          }
          this.$router.push({ name: "services-commerce-place", params: { id: val } });
        }
      }
    }
  };
</script>
