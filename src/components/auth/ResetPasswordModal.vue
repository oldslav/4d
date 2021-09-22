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
            | {{ $t("common.passwordReset.title") }}
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          .text-caption.text-primary-light
            | {{ $t("common.passwordReset.message") }}
        q-card-section
          BaseInput(label="Email" v-model="email" @input="resetError()" :rules="validateEmail")
          .q-mx-lg.q-py-md.flex.items-center.justify-center.full-width.password-reset__error.text-subtitle(v-show="isError")
            | {{ $t("common.passwordReset.error") }}
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
        email: null,
        isError: false
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/resetPassword/${ RESET_PASSWORD }`];
      },
      requiredRule () {
        return [val => !!val || this.$t("common.error.validation.required")];
      },
      validateEmail () {
        return [
          ...this.requiredRule,
          val => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val) || this.$t("common.error.validation.email")
        ];
      }
    },
    methods: {
      ...mapActions("user/resetPassword", [RESET_PASSWORD]),
      resetError () {
        this.isError = false;
      },
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
          }).catch((e) => {
            if (e.response.status === 404) {
              this.isError = true;
            } else {
              this.$q.notify({
                type: "negative",
                message: this.$t("common.passwordReset.response.resetFail")
              });
            }
          });
      }
    }
  };
</script>

<style lang="stylus">
  .password-reset {
    max-width 26vw !important
  }

  .password-reset__error {
    background-color #FFECEC
    color #FF4040
  }
</style>
