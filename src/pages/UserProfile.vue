<template lang="pug">
  q-page
    q-form.container.q-ma-lg.q-pa-lg.shadow-2.rounded-borders(
      @validation-success="onValidationSuccess"
    )
      .main-block.row
        .col
          BaseInput(
            v-model="lastName"
            :label="$t('user.lastName')"
            :rules="[ val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val) ]"
          )
          BaseInput(
            v-model="firstName"
            :label="$t('user.firstName')"
            :rules="[ val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val) ]"
          )
          BaseInput(
            v-model="patronymic"
            :label="$t('user.patronymic')"
            :rules="[ val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val) ]"
          )
        .col.flex.items-center.justify-center
          q-avatar(size="10rem")
            img(src="@/assets/svg/avatar-placeholder.svg")
      q-separator.q-my-lg
      .email-block.row
        .col
          BaseInput(v-model="email" :label="$t('user.profile.mainForm.email')" readonly)
        .col.flex.items-center.justify-end
          router-link(:to="{ name: 'change-email' }")
            | {{ $t('user.profile.mainForm.change') }}
      q-separator.q-my-lg
      .password-block.row
        .col
          BaseInput(:label="$t('user.profile.mainForm.password')" readonly)
        .col.flex.items-center.justify-end
          router-link(:to="{ name: 'change-password' }")
            | {{ $t('user.profile.mainForm.change') }}
      q-separator.q-mt-lg
      .contacts-block.row
        .col
          h5.q-my-lg
            | {{ $t('user.profile.mainForm.contacts') }}
          BaseInput(
            v-model="phone"
            mask="# (###) ### - ####"
            unmasked-value
            :label="$t('user.profile.mainForm.phone')"
            :rules="[ val => val && (val.length === 0 || val.length === 11) ]"
          )
          BaseInput(
            v-model="telegramAlias"
            :label="$t('user.profile.mainForm.telegramAlias')"
          )
      .save-btn.flex.items-center.justify-end.q-mt-lg
        q-btn(
          color="primary"
          :label="$t('user.profile.mainForm.save')"
        )

    ChangeEmailModal
    ChangePasswordModal
</template>

<script>
  import ChangeEmailModal from "components/profile/ChangeEmailModal";
  import ChangePasswordModal from "components/profile/ChangePasswordModal";
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import { mapState } from "vuex";

  export default {
    name: "UserProfile",
    components: {
      BaseInput,
      BaseModal,
      ChangeEmailModal,
      ChangePasswordModal
    },
    data () {
      return {
        isFormValidated: false
      };
    },
    computed: {
      firstName: {
        get () {
          return this.profileForm.firstName;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_FIRSTNAME", value);
        }
      },
      lastName: {
        get () {
          return this.profileForm.lastName;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_LASTNAME", value);
        }
      },
      patronymic: {
        get () {
          return this.profileForm.patronymic;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PATRONYMIC", value);
        }
      },
      email: {
        get () {
          return this.profileForm.email;
        }
      },
      phone: {
        get () {
          return this.profileForm.phone;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PHONE", value);
        }
      },
      telegramAlias: {
        get () {
          return this.profileForm.telegramAlias;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_TELEGRAM_ALIAS", value);
        }
      },
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
      onValidationSuccess () {
        this.isFormValidated = true;
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
