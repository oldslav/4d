<template lang="pug">
  div
    q-btn(@click="getUserTickets")
      | tickets

    q-card
      | asdg
      q-inner-loading(:showing="isLoading")
        q-spinner-gears(size="50px" color="primary")
</template>

<script>
  import { GET_USER_TICKETS } from "../store/constants/action-constants";

  export default {
    name: "UserTickets",
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/userTickets/${ GET_USER_TICKETS }`];
      }
    },
    methods: {
      getUserTickets () {
        this.$store.dispatch(`user/userTickets/${ GET_USER_TICKETS }`);
      }
    }
  };
</script>

<style scoped>

</style>
