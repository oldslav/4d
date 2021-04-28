<template lang="pug">
  div
    | tickets
</template>

<script>
  import { GET_USER_TICKETS } from "../store/constants/action-constants";

  export default {
    name: "UserTickets",
    created () {
      this.$store.dispatch(`user/userTickets/${ GET_USER_TICKETS }`);
    }
  };
</script>

<style scoped>

</style>
