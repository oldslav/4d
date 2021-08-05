<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTicketsWarehouse from "./UserTicketsWarehouse";
  import EmployeeTicketsWarehouse from "./EmployeeTicketsWarehouse";

  export default {
    name: "TicketsWarehouse",
    components: { UserTicketsWarehouse, EmployeeTicketsWarehouse },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? EmployeeTicketsWarehouse : UserTicketsWarehouse;
      }
    }
  };
</script>
