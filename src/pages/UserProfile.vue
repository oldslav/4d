<template lang="pug">
  q-page
    q-form(
      @validation-success="onValidationSuccess"
    )
      q-card.container.q-ma-lg.q-pa-lg

        q-inner-loading(:showing="isLoading")

        .main-block.row
          .col
            q-input(
              v-model="lastName"
              :label="$t('user.lastName')"
              :rules="validateNames"
            )
            q-input(
              v-model="firstName"
              :label="$t('user.firstName')"
              :rules="validateNames"
            )
            .row
              q-input.col-grow(
                v-model="patronymic"
                :label="$t('user.patronymic')"
                :rules="validatePatronymic"
                :readonly="noPatronymic"
              )
              q-checkbox(
                v-model="noPatronymic"
                :label="$t('user.noPatronymic')"
              )
          .col.flex.items-center.justify-center
            q-avatar(size="10rem")
              q-file(
                :value="avatarImage"
                accept="image/*"
                @input="onImageUpload"
              )
                img.avatar-img.full-width.full-height(
                  :src="avatarUrl"
                )
                
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
              :rules="validatePhone"
            )
            q-input(
              v-model="telegramAlias"
              :label="$t('user.profile.mainForm.telegramAlias')"
              :rules="validateTelegram"
            )
        .save-btn.flex.items-center.justify-end.q-mt-lg
          q-btn(
            color="primary"
            :disabled="!isFormChanged"
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
  import { mapActions, mapState } from "vuex";
  import { GET_ACCOUNT, UPDATE_USER_PROFILE, UPDATE_USER_PROFILE_AVATAR } from "@/store/constants/action-constants";

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
        isFormValidated: false,
        isFormChanged: false,
        avatarImage: null
      };
    },
    computed: {
      firstName: {
        get () {
          return this.profileForm.name.first !== null ? this.profileForm.name.first : this.account.name.first;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_FIRSTNAME", value);

          this.checkFormChange(value, this.account.name.first);
        }
      },
      lastName: {
        get () {
          return this.profileForm.name.last !== null ? this.profileForm.name.last : this.account.name.last;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_LASTNAME", value);

          this.checkFormChange(value, this.account.name.last);
        }
      },
      patronymic: {
        get () {
          return this.profileForm.name.patronymic !== null ? this.profileForm.name.patronymic : this.account.name.patronymic;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PATRONYMIC", value);

          this.checkFormChange(value, this.account.name.patronymic);
        }
      },
      noPatronymic: {
        get () {
          return this.profileForm.name.noPatronymic !== null ? this.profileForm.name.noPatronymic : this.account.name.noPatronymic;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_NO_PATRONYMIC", value);
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PATRONYMIC", null);

          this.checkFormChange(value, this.account.name.noPatronymic);
        }
      },
      email: {
        get () {
          return this.account.contacts.email;
        }
      },
      phone: {
        get () {
          return this.profileForm.contacts.phone !== null ? this.profileForm.contacts.phone : this.account.contacts.phone;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_PHONE", value);

          this.checkFormChange(value, this.account.contacts.phone);
        }
      },
      telegramAlias: {
        get () {
          return this.profileForm.contacts.telegramAlias !== null ? this.profileForm.contacts.telegramAlias : this.account.contacts.telegramAlias;
        },
        set (value) {
          this.$store.commit("user/profileForm/SET_PROFILE_FORM_TELEGRAM_ALIAS", value);

          this.checkFormChange(value, this.account.contacts.telegramAlias);
        }
      },
      avatarUrl () {
        if (this.profileForm.avatarUrl) {
          return this.profileForm.avatarUrl;
        }
        else if (this.account.avatar) {
          return `${ process.env.SERVER_API_HOST }${ this.account.avatar }`;
        }
        return require("@/assets/svg/avatar-placeholder.svg");
      },
      validateNames () {
        return [
          val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val)
        ];
      },
      validatePatronymic () {
        if (this.noPatronymic) {
          return [];
        } else {
          return [
            val => val && val.length > 0, val => val && /^[A-zА-яЁё]*$/.test(val)
          ];
        }
      },
      validatePhone () {
        return [
          val => val.length === 0 || val.length === 11
        ];
      },
      validateTelegram () {
        return [
          [ val => /^[A-z0-9]*$/.test(val) ]
        ];
      },
      isLoading () {
        return this.$store.state.wait[GET_ACCOUNT];
      },
      ...mapState({
        account: state => state.account.account,
        profileForm: state => state.user.profileForm
      })
    },
    methods: {
      ...mapActions([
        GET_ACCOUNT
      ]),
      ...mapActions("user/profileForm", [
        UPDATE_USER_PROFILE,
        UPDATE_USER_PROFILE_AVATAR
      ]),
      toggleModal (value) {
        if (!value) this.$router.push({ name: "user-profile" });
      },
      onValidationSuccess () {
        this.isFormValidated = true;
      },
      async updateProfile () {
        try {
          await this.UPDATE_USER_PROFILE();
          await this.GET_ACCOUNT();
          this.isFormChanged = false;
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
            await this.UPDATE_USER_PROFILE_AVATAR(data);
            this.$store.commit("user/profileForm/SET_PROFILE_FORM_AVATAR_URL", reader.result);
            this.$q.notify({
              message: "Аватар изменен",
              color: "green",
              position: "bottom"
            });
          } catch (error) {
            this.$q.notify({
              message: "Ошибка при обновлении аватара",
              color: "red",
              position: "bottom"
            });
          }
        };

        reader.readAsDataURL(image);
      },
      checkFormChange (value, defaultValue) {
        if (!this.isFormChanged && value !== defaultValue){
          this.isFormChanged = true;
        } else if (this.isFormChanged && value === defaultValue) {
          this.isFormChanged = false;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
