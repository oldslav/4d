<template lang="pug">
  q-page.row.items-center.justify-evenly
    div(style="width: 500px")
      form-authenticate(v-if="!isAuthenticated")
      div(v-if="isAuthenticated")
        router-link(:to="{ name: 'ui-playground' }") UI Kit
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
