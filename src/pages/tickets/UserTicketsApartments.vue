<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTicketsApartmentsUser from "pages/tickets/UserTicketsApartments/UserTicketsApartmentsUser.vue";
  import UserTicketsApartmentsEmployee from "pages/tickets/UserTicketsApartments/UserTicketsApartmentsEmployee.vue";

  export default {
    name: "UserTicketsApartments",
    components: { UserTicketsApartmentsUser, UserTicketsApartmentsEmployee },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? UserTicketsApartmentsEmployee : UserTicketsApartmentsUser;
      }
    }
  };
</script>
