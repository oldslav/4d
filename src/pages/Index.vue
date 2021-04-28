<template lang="pug">
  q-page.row.items-center.justify-evenly
    router-link(:to="{ name: 'playground' }") UI Playground
    router-link(:to="{ name: 'error-page' }") 404
    router-link(:to="{ name: 'user' }") Profile
</template>

<script>
  import { mapGetters } from "vuex";

  import LoginForm from "components/forms/auth/LoginForm.vue";

  export default {
    name: "Index",
    components: { LoginForm },
    computed: {
      ...mapGetters("account", ["getAccount", "isAuthenticated"])
    }
  };
</script>
