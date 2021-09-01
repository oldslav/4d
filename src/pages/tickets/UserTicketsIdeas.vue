<template lang="pug">
  component(:is="activeComponent")
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTicketsIdeasUser from "pages/tickets/UserTicketsIdeas/UserTicketsIdeasUser.vue";
  import UserTicketsIdeasEmployee from "pages/tickets/UserTicketsIdeas/UserTicketsIdeasEmployee.vue";

  export default {
    name: "UserTicketsIdeas",
    components: { UserTicketsIdeasUser, UserTicketsIdeasEmployee },
    computed: {
      ...mapGetters(["isEmployee"]),
      activeComponent () {
        return this.isEmployee ? UserTicketsIdeasEmployee : UserTicketsIdeasUser;
      }
    }
  };
</script>
