<template lang="pug">
  BaseModal(:value="showChangePasswordModal" position="standard" @input="toggleModal")
    q-card.modal-container
      q-card-section.row.justify-between.items-center.text-h6
        |  {{ $t('user.profile.changePasswordModal.title') }}
        q-icon.cursor-pointer(name="o_close" @click="toggleModal(false)")

      q-separator.q-mb-sm

      q-card-section
        BaseInput(v-model="password" :label="$t('user.profile.changePasswordModal.password')")
        BaseInput(v-model="newPassword" :label="$t('user.profile.changePasswordModal.newPassword')")
        BaseInput(v-model="confirmPassword" :label="$t('user.profile.changePasswordModal.confirmPassword')")
      q-card-actions(align="right")
        q-btn(v-close-popup color="primary" :label="$t('user.profile.changePasswordModal.resetPassword')" @click="toggleModal(false)")
</template>

<script>
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import { mapState } from "vuex";

  export default {
    name: "ChangePasswordModal",
    components: {
      BaseInput,
      BaseModal
    },
    data () {
      return {
        showChangePasswordModal: false
      };
    },
    computed: {
      password: {
        get () {
          return this.newPasswordForm.password;
        },
        set (value) {
          this.$store.commit("user/newPasswordForm/SET_NEW_PASSWORD_FORM_PASSWORD", value);
        }
      },
      newPassword: {
        get () {
          return this.newPasswordForm.newPassword;
        },
        set (value) {
          this.$store.commit("user/newPasswordForm/SET_NEW_PASSWORD_FORM_NEW_PASSWORD", value);
        }
      },
      confirmPassword: {
        get () {
          return this.newPasswordForm.confirmPassword;
        },
        set (value) {
          this.$store.commit("user/newPasswordForm/SET_NEW_PASSWORD_FORM_CONFIRM_PASSWORD", value);
        }
      },
      ...mapState({
        newPasswordForm: state => state.user.newPasswordForm
      })
    },
    methods: {
      toggleModal (value) {
        if (!value) this.$router.push({ name: "user-profile" });
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
.modal-container
  min-width: 35vw
</style>
