<template lang="pug">
  q-page
    q-form.container.q-ma-lg.q-pa-lg.shadow-2.rounded-borders(
      @validation-success="onValidationSuccess"
    )
      .main-block.row
        .col
          q-input(
            v-model="lastName"
            :label="$t('user.lastName')"
            :rules="[ val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val) ]"
          )
          q-input(
            v-model="firstName"
            :label="$t('user.firstName')"
            :rules="[ val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val) ]"
          )
          q-input(
            v-model="patronymic"
            :label="$t('user.patronymic')"
            :rules="[ val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val) ]"
          )
        .col.flex.items-center.justify-center
          q-avatar(size="10rem")
            q-file(
              :value="avatarImage"
              accept="image/*"
              no-error-icon
              dense
              ref="picker"
              bottom-slots
              borderless
              append
              @input="onImageUpload"
            )
              img.full-width(:src="avatarUrl")
              
      q-separator.q-my-lg
      .email-block.row
        .col
          q-input(v-model="email" :label="$t('user.profile.mainForm.email')" readonly)
        .col.flex.items-center.justify-end
          router-link(:to="{ name: 'change-email' }")
            | {{ $t('user.profile.mainForm.change') }}
      q-separator.q-my-lg
      .password-block.row
        .col
          q-input(value="***************" :label="$t('user.profile.mainForm.password')" readonly)
        .col.flex.items-center.justify-end
          router-link(:to="{ name: 'change-password' }")
            | {{ $t('user.profile.mainForm.change') }}
      q-separator.q-mt-lg
      .contacts-block.row
        .col
          h5.q-my-lg
            | {{ $t('user.profile.mainForm.contacts') }}
          q-input(
            v-model="phone"
            mask="# (###) ### - ####"
            unmasked-value
            :label="$t('user.profile.mainForm.phone')"
            :rules="[ val => val && (val.length === 0 || val.length === 11) ]"
          )
          q-input(
            v-model="telegramAlias"
            :label="$t('user.profile.mainForm.telegramAlias')"
          )
      .save-btn.flex.items-center.justify-end.q-mt-lg
        q-btn(
          color="primary"
          :label="$t('user.profile.mainForm.save')"
          @click="updateProfile()"
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
    mounted () {
      this.$store.dispatch("user/profileForm/GET_USER_PROFILE_DEFAULT");
    },
    data () {
      return {
        isFormValidated: false,
        avatarImage: null
      };
    },
    computed: {
      firstName: {
        get () {
          return this.$store.state.user.profileForm.name.first;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_FIRSTNAME", value);
        }
      },
      lastName: {
        get () {
          return this.profileForm.name.last;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_LASTNAME", value);
        }
      },
      patronymic: {
        get () {
          return this.profileForm.name.patronymic;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PATRONYMIC", value);
        }
      },
      email: {
        get () {
          return this.profileForm.contacts.email;
        }
      },
      phone: {
        get () {
          return this.profileForm.contacts.phone;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PHONE", value);
        }
      },
      telegramAlias: {
        get () {
          return this.profileForm.contacts.telegramAlias;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_TELEGRAM_ALIAS", value);
        }
      },
      avatarUrl: {
        get () {
          return this.profileForm.avatarUrl || require("@/assets/svg/avatar-placeholder.svg");
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
      },
      async updateProfile () {
        try {
          await this.$store.dispatch("user/profileForm/UPDATE_USER_PROFILE");
          this.$q.notify({
            message: "Данные обновлены",
            color: "green",
            position: "bottom"
          });
        } catch (error) {
          this.$q.notify({
            message: error.response.data.error,
            color: "red",
            position: "bottom"
          });
        }
      },
      onImageUpload (image) {
        const reader = new FileReader();

        reader.onloadend = async () => {
          try {
            const data = new FormData();
            data.append("file", image);
            await this.$store.dispatch("user/profileForm/UPDATE_USER_PROFILE_AVATAR", data);
            this.$store.commit("user/profileForm/SET_PROFILE_FORM_AVATAR_URL", reader.result);
            this.$q.notify({
              message: "Аватар изменен",
              color: "green",
              position: "bottom"
            });
          } catch (error) {
            this.$q.notify({
              message: error.response.data.message,
              color: "red",
              position: "bottom"
            });
          }
        };

        reader.readAsDataURL(image);
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
