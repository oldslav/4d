<template lang="pug">
  div
</template>

<script>
  import { mapActions } from "vuex";
  import { GET_APARTMENTS_GEO } from "../../store/constants/action-constants";

  export default {
    name: "MapApartments",
    created () {
      this.GET_APARTMENTS_GEO(133);
    },
    methods: {
      ...mapActions("services", [
        GET_APARTMENTS_GEO
      ])
    }
  };
</script>

<style scoped>

</style>
