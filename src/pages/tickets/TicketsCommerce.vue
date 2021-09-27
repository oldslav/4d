<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import TicketsCommerceCompany from "pages/tickets/TicketsCommerce/TicketsCommerceCompany";
  import TicketsCommerceEmployee from "pages/tickets/TicketsCommerce/TicketsCommerceEmployee";

  export default {
    name: "TicketsCommerce",
    components: { TicketsCommerceEmployee, TicketsCommerceCompany },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? TicketsCommerceEmployee : TicketsCommerceCompany;
      }
    }
  };
</script>
