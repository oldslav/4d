<template lang="pug">
  BaseModal(:value="showChangePasswordModal" position="standard" @input="toggleModal")
    q-card.modal-container
      q-form(
        greedy
        @submit="updatePassword()"
        @validation-error="onValidationError()"
      )
        q-card-section.row.justify-between.items-center.text-h6
          |  {{ $t('user.profile.changePasswordModal.title') }}
          q-icon.cursor-pointer(name="o_close" @click="toggleModal(false)")

        q-separator.q-mb-sm

        q-card-section
          BaseInput(
            v-model="oldPassword"
            type="password"
            :label="$t('user.profile.changePasswordModal.password')"
            :type="isPasswordVisible ? 'text' : 'password'"
            append
          )
            template(#append)
              q-icon(
                :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              )
          BaseInput(
            v-model="password"
            type="password"
            :label="$t('user.profile.changePasswordModal.newPassword')"
            :type="isNewPasswordVisible ? 'text' : 'password'"
            :rules="validatePassword"
            append
          )
            template(#append)
              q-icon(
                :name="isNewPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isNewPasswordVisible = !isNewPasswordVisible"
              )
          BaseInput(
            v-model="confirmPassword"
            type="password"
            :label="$t('user.profile.changePasswordModal.confirmPassword')"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            :rules="validatePassword"
            append
          )
            template(#append)
              q-icon(
                :name="isConfirmPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              )
        q-card-actions(align="right")
          q-btn(
            v-close-popup
            :label="$t('user.profile.changePasswordModal.save')"
            :disabled="isButtonDisabled"
            type="submit"
            color="primary"
          )
</template>

<script>
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import InputsMixin from "components/auth/InputsMixin";
  import { mapState } from "vuex";

  export default {
    name: "ChangePasswordModal",
    mixins: [InputsMixin],
    components: {
      BaseInput,
      BaseModal
    },
    data () {
      return {
        showChangePasswordModal: false,
        isPasswordVisible: false,
        isNewPasswordVisible: false,
        isConfirmPasswordVisible: false
      };
    },
    computed: {
      oldPassword: {
        get () {
          return this.newPasswordForm.oldPassword || "";
        },
        set (value) {
          this.$store.commit("user/newPasswordForm/SET_NEW_PASSWORD_FORM_OLD_PASSWORD", value);
        }
      },
      password: {
        get () {
          return this.newPasswordForm.password || "";
        },
        set (value) {
          this.$store.commit("user/newPasswordForm/SET_NEW_PASSWORD_FORM_PASSWORD", value);
        }
      },
      confirmPassword: {
        get () {
          return this.newPasswordForm.confirmPassword || "";
        },
        set (value) {
          this.$store.commit("user/newPasswordForm/SET_NEW_PASSWORD_FORM_CONFIRM_PASSWORD", value);
        }
      },
      isButtonDisabled () {
        return this.oldPassword.length === 0 || this.password.length === 0 || this.confirmPassword.length === 0;
      },
      ...mapState({
        newPasswordForm: state => state.user.newPasswordForm
      })
    },
    methods: {
      toggleModal (value) {
        if (!value) this.$router.push({ name: "user-profile" });
      },
      onValidationError () {
        this.$q.notify({
          message: "Ошибка при валидации",
          color: "red",
          position: "bottom"
        });
      },
      async updatePassword () {
        try {
          const response = await this.$store.dispatch("user/newPasswordForm/CHANGE_USER_PROFILE_PASSWORD");
          this.$q.notify({
            message: response,
            color: "green",
            position: "bottom"
          });
          this.toggleModal(false);
        } catch (error) {
          this.$q.notify({
            message: error.response.data.message,
            color: "red",
            position: "bottom"
          });
        }
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler: function (newVal) {
          this.showChangePasswordModal = newVal.meta && newVal.meta.showChangePasswordModal;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
