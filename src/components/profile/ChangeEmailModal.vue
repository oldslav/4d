<template lang="pug">
  BaseModal(:value="showChangeEmailModal" @input="toggleModal")
    template(v-slot:title)
      | {{ $t('user.profile.changeEmailModal.title') }}
    template(v-slot:content)
      | {{ $t('user.profile.changeEmailModal.message') }}
      BaseInput(v-model="newEmail" :label="$t('user.profile.changeEmailModal.email')")
    template(v-slot:buttons)
      q-btn(v-close-popup color="primary" :label="$t('user.profile.changeEmailModal.save')" @click="toggleModal(false)")
</template>

<script>
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import { mapState } from "vuex";

  export default {
    name: "ChangeEmailModal",
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
