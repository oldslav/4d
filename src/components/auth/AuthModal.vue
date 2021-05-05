<template lang="pug">
  q-dialog(
    v-model="value"
    ref="auth-modal"
    full-height
    square
    position="right"
    maximized
    transition-show="fade"
    transition-hide="fade"
  )
    LoginForm(@submit="onSubmit")
</template>

<script>
  import BaseModal from "../common/BaseModal";
  import LoginForm from "../auth/LoginForm";

  export default {
    name: "AuthModal",
    components: { BaseModal, LoginForm },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onSubmit () {
        this.$emit("input", false);
      }
    }
  };
</script>

<style scoped>

</style>
