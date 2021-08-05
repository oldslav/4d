<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTicketsParking from "pages/tickets/UserTicketsParking";
  import EmployeeTicketsParking from "pages/tickets/EmployeeTicketsParking";

  export default {
    name: "ParkingRent",
    components: { UserTicketsParking, EmployeeTicketsParking },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? EmployeeTicketsParking : UserTicketsParking;
      }
    }
  };
</script>
