<template lang="pug">
  BaseModal(
    :value="value"
    ref="auth-modal"
    full-height
    square
    position="right"
    maximized
    transition-show="fade"
    transition-hide="fade"
    @toggleModal="(value) => $emit('input', value)"
  )
    q-card.auth-modal__card
      q-card-actions(align="right")
        q-btn(flat v-close-popup icon="close" color="primary")
      q-card-section.auth-modal__card__content
        LoginForm(@submit="onSubmit" v-if="isLogin")
        registration-form(v-if="isRegister")
        q-card-section(v-if="isRegister").text-small.q-px-none
          | {{ $t("common.register.haveAccount") }}
          q-btn.q-ml-sm(:label="$t('action.login')" flat color="primary" size="md" no-caps @click="toLogin()")
        q-card-section(v-if="isLogin").q-px-none
          | {{ $t("common.login.noAccount") }}
          q-btn.q-ml-sm(:label="$t('action.register')" flat color="primary" size="md" no-caps @click="toRegister()")
</template>

<script>
  import BaseModal from "../common/BaseModal";
  import RegistrationForm from "components/auth/RegistrationForm";
  import LoginForm from "../auth/LoginForm";

  export default {
    name: "AuthModal",
    components: { BaseModal, LoginForm, RegistrationForm },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        mode: "login"
      };
    },
    computed: {
      isLogin () {
        return this.mode === "login";
      },
      isRegister () {
        return this.mode === "register";
      }
    },
    methods: {
      onSubmit () {
        this.$emit("input", false);
      },
      toLogin () {
        this.mode = "login";
      },
      toRegister () {
        this.mode = "register";
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .auth-modal__card {
    display: flex;
    flex-direction: column;
    width: 800px;

    @media only screen and (max-width: $breakpoint-md-max) {
      width: 100%;
    }

    &__content {
      padding: 0 8rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-items: center;
      justify-content: center;

      @media only screen and (max-width: $breakpoint-md-max) {
        width: 100%;
        padding: 0 1rem;
      }
    }
  }
</style>
