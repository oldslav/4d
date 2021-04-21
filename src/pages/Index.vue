<template lang="pug">
  q-page.row.items-center.justify-evenly
    router-link(:to="{ name: 'playground' }") UI Playground
    router-link(:to="{ name: 'error-page' }") 404
    router-link(:to="{ name: 'profile' }") Profile
</template>

<script lang="ts">
  import { defineComponent } from "@vue/composition-api";
  import { mapGetters } from "vuex";

  import LoginForm from "components/forms/auth/LoginForm.vue";

  export default defineComponent({
    name: "PageIndex",
    components: { LoginForm },
    computed: {
      ...mapGetters("account", ["getAccount", "isAuthenticated"])
    }
  });
</script>
