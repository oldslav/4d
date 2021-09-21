<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.password-reset
      q-form(@submit.prevent="onSubmit()")
        q-card-section.row.items-center.q-pb-none
          .text-medium
            | Восстановление пароля
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          .text-caption.text-primary-light
            | Напишите адрес электронной почты, с помощью которой вы зарегистрировались. Мы отправим на указанный адрес письмо с инструкцией по сбросу пароля.
        q-card-section
          BaseInput(label="Email" v-model="email")
        q-card-actions(align="right").q-pa-md
          q-btn(color="primary" label="Сбросить пароль" type="submit" :loading="isLoading")
</template>

<script>
  import { mapActions } from "vuex";
  import { RESET_PASSWORD } from "@/store/constants/action-constants";
  import BaseModal from "components/common/BaseModal";
  import BaseInput from "components/common/BaseInput";

  export default {
    name: "ResetPasswordModal",
    components: { BaseInput, BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        email: null
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/resetPassword/${ RESET_PASSWORD }`];
      }
    },
    methods: {
      ...mapActions("user/resetPassword", [RESET_PASSWORD]),
      toggleModal (val) {
        this.$emit("input", val);
        Object.assign(this.$data, this.$options.data.apply(this));
      },
      onSubmit () {
        return this.RESET_PASSWORD(this.email)
          .then(() => {
            this.$q.dialog({
              message: this.$t("common.register.messages.success"),
              ok: "Ok"
            });
            this.toggleModal(false);
          }).catch(() => {
            this.$q.notify({
              type: "negative",
              message: "Ошибка при смене пароля"
            });
          });
      }
    }
  };
</script>

<style lang="stylus">
  .password-reset {
    max-width 26vw !important
  }
</style>
