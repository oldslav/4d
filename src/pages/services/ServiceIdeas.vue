<template lang="pug">
  div
</template>

<script>
  import { mapActions } from "vuex";
  import { GET_IDEAS_GEO } from "../../store/constants/action-constants";

  export default {
    name: "ServiceIdeas",
    async created () {
      await this.GET_IDEAS_GEO();
    },
    methods: {
      ...mapActions("services", [
        GET_IDEAS_GEO
      ])
    }
  };
</script>

<style scoped>

</style>
