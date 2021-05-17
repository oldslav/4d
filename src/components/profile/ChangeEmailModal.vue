<template lang="pug">
  BaseModal(:value="showChangeEmailModal" position="standard" @input="toggleModal")
    q-card.modal-container
      q-card-section.row.justify-between.items-center.text-h6
        | {{ $t('user.profile.changeEmailModal.title') }}
        q-icon.cursor-pointer(name="o_close" @click="toggleModal(false)")

      q-separator.q-mb-sm

      q-card-section
        | {{ $t('user.profile.changeEmailModal.message') }}
        BaseInput(
          v-model="newEmail"
          :label="$t('user.profile.changeEmailModal.email')"
          :rules="validateEmail"
        )

      q-card-actions(align="right")
        q-btn(v-close-popup color="primary" :label="$t('user.profile.changeEmailModal.save')" @click="updateEmail")
</template>

<script>
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import InputsMixin from "components/auth/InputsMixin";
  import { mapState } from "vuex";

  export default {
    name: "ChangeEmailModal",
    mixins: [InputsMixin],
    components: {
      BaseInput,
      BaseModal
    },
    data () {
      return {
        showChangeEmailModal: false
      };
    },
    computed: {
      newEmail: {
        get () {
          return this.profileForm.newEmail;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_NEW_EMAIL", value);
        }
      },
      ...mapState({
        profileForm: state => state.user.profileForm
      })
    },
    methods: {
      toggleModal (value) {
        if (!value) this.$router.push({ name: "user-profile" });
      },
      async updateEmail () {
        try {
          await this.$store.dispatch("user/profileForm/CHANGE_USER_PROFILE_EMAIL");
          this.$q.notify({
            message: "Письмо с подтверждением отправлено на новую почту",
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
          this.showChangeEmailModal = newVal.meta && newVal.meta.showChangeEmailModal;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
