<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTicketsCrowdfunding from "./UserTicketsCrowdfunding";
  import EmployeeTicketsCrowdfunding from "./EmployeeTicketsCrowdfunding";

  export default {
    name: "TicketsCrowdfunding",
    components: { UserTicketsCrowdfunding, EmployeeTicketsCrowdfunding },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? EmployeeTicketsCrowdfunding : UserTicketsCrowdfunding;
      }
    }
  };
</script>
