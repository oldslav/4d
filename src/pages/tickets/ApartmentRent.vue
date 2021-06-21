<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import ApartmentRentUser from "pages/tickets/ApartmentRentUser";
  import ApartmentRentEmployee from "pages/tickets/ApartmentRentEmployee";

  export default {
    name: "ApartmentRent",
    components: { ApartmentRentUser, ApartmentRentEmployee },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? ApartmentRentEmployee : ApartmentRentUser;
      }
    }
  };
</script>
