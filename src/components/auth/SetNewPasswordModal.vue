<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal"
  )
    q-card.modal-container
      q-form(@submit.prevent="onSubmit()")
        q-card-section.row.items-center.q-pb-none
          .text-medium
            | Задайте новый пароль
          q-space
          q-btn(icon="close" flat round dense v-close-popup)
        q-card-section
          BaseInput(
            append
            :type="isPassword ? 'password' : 'text'"
            v-model="password"
            :label="$t('user.password')"
            :rules="validatePassword"
            lazy-rules
            dense
          )
            template(#append)
              q-icon(
                :name="isPassword ? 'visibility_off' : 'visibility'"
                @click="isPassword = !isPassword"
                class="cursor-pointer"
              )
          BaseInput(
            append
            :type="isConfirm ? 'password' : 'text'"
            v-model="confirmPassword"
            :label="$t('user.confirmPassword')"
            :rules="validateConfirm"
            lazy-rules
            dense
          )
            template(#append)
              q-icon(
                :name="isConfirm ? 'visibility_off' : 'visibility'"
                @click="isConfirm = !isConfirm"
                class="cursor-pointer"
              )
        q-card-actions(align="right")
          q-btn(color="primary" :label="$t('action.send')" type="submit" :loading="isLoading")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import BaseInput from "components/common/BaseInput";
  import { CONFIRM_RESET_PASSWORD } from "@/store/constants/action-constants";

  export default {
    name: "SetNewPasswordModal",
    components: { BaseInput, BaseModal },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        password: null,
        confirmPassword: null,
        isPassword: true,
        isConfirm: true
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/resetPassword/${ CONFIRM_RESET_PASSWORD }`];
      },
      token () {
        return this.$route.query.token;
      },
      validatePassword () {
        return [
          ...this.requiredRule,
          val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(val) || this.$t("common.error.validation.passwordReg") // uppercase, lowercase, 8 symbols, 1 digit
        ];
      },
      validateConfirm () {
        return [
          ...this.requiredRule,
          val => val === this.password || this.$t("common.error.validation.confirmPassword")
        ];
      },
      requiredRule () {
        return [val => !!val || this.$t("common.error.validation.required")];
      }
    },
    methods: {
      ...mapActions("user/resetPassword", [CONFIRM_RESET_PASSWORD]),
      toggleModal (val) {
        this.$emit("input", val);
        Object.assign(this.$data, this.$options.data.apply(this));
      },
      onSubmit () {
        const { password, confirmPassword, token } = this;
        return this.CONFIRM_RESET_PASSWORD({ password, confirmPassword, token })
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: "Пароль успешно изменен"
            });
            this.toggleModal(false);
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "Ошибка при изменении пароля"
            });
          });
      }
    }
  };
</script>
