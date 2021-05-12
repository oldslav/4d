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
    q-card.auth-modal__card
      q-card-actions(align="right")
        q-btn(flat v-close-popup icon="close" color="primary")
      LoginForm.auth-modal__content(@submit="onSubmit" v-if="isLogin")
      registration-form.auth-modal__content(v-if="isRegister")
      q-card-section.auth-modal__content.text-small(v-if="isRegister")
        | Уже есть аккаунт?
        q-btn.q-ml-sm(label="Войти" flat color="primary" size="md" no-caps @click="toLogin()")
      q-card-section.auth-modal__content(v-if="isLogin")
        | Еще нет аккаунта?
        q-btn.q-ml-sm(label="Зарегистрироваться" flat color="primary" size="md" no-caps @click="toRegister()")
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
        mode: "register"
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
    width: 800px;
  }

  .auth-modal__content {
    margin 0 6vw
  }
</style>
