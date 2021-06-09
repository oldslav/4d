<template lang="pug">
  q-page
    q-form(
      greedy
      @submit="updateProfile()"
      @validation-error="onValidationError()"
    )
      .container(
        :is="isMobile ? 'div' : 'q-card'"
        :class="isMobile ? 'q-pa-md' : 'q-ma-lg q-pa-lg'"
      )

        q-inner-loading(:showing="isLoading")

        .main-block(
          :class="isMobile ? 'column reverse' : 'row'"
        )
          .col-xs-12(v-if="isMobile")
            q-expansion-item(:label="$t('user.profile.mainForm.nameSection')")
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
              q-input.col-grow(
                v-model="patronymic"
                :label="$t('user.patronymic')"
                :rules="validatePatronymic"
                :readonly="noPatronymic"
              )
              q-checkbox(
                v-model="noPatronymic"
                :label="$t('user.noPatronymic')"
                left-label
              )
          .col-sm-6(v-else)
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
          .col-xs-12.col-sm-6.column.flex.items-center.justify-center(
            :class="isMobile ? 'mobile-avatar' : ''"
          )
            AvatarUploadable(:src="avatarUrl" @input="onImageUpload")

        q-separator.q-my-lg
        .email-block.row
          .col
            div(v-if="isMobile")
              | {{ $t("user.profile.mainForm.email") }}
            q-input(
              v-else
              v-model="email"
              :label="$t('user.profile.mainForm.email')"
              readonly
            )
          .col.flex.items-center.justify-end
            router-link(:to="{ name: 'change-email' }")
              | {{ $t("user.profile.mainForm.change") }}
        q-separator.q-my-lg
        .password-block.row
          .col
            div(v-if="isMobile")
              | {{ $t("user.profile.mainForm.password") }}
            q-input(
              v-else
              value="***************"
              :label="$t('user.profile.mainForm.password')"
              readonly
            )
          .col.flex.items-center.justify-end
            router-link(:to="{ name: 'change-password' }")
              | {{ $t("user.profile.mainForm.change") }}
        q-separator.q-mt-lg
        .contacts-block.row
          .col-xs-12(v-if="isMobile")
            q-expansion-item(:label="$t('user.profile.mainForm.contacts')")
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
          .col(v-else)
            h5.q-my-lg
              | {{ $t("user.profile.mainForm.contacts") }}
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
            :disabled="!isFormChanged"
            :label="$t('user.profile.mainForm.save')"
            type="submit"
            color="primary"
          )

    ChangeEmailModal
    ChangePasswordModal
</template>

<script>
  import ChangeEmailModal from "components/profile/ChangeEmailModal";
  import ChangePasswordModal from "components/profile/ChangePasswordModal";
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import AvatarUploadable from "components/common/AvatarUploadable";
  import { mapActions, mapState } from "vuex";
  import { GET_ACCOUNT, UPDATE_USER_PROFILE, UPDATE_USER_PROFILE_AVATAR } from "@/store/constants/action-constants";

  export default {
    name: "UserProfile",
    components: {
      BaseInput,
      BaseModal,
      ChangeEmailModal,
      ChangePasswordModal,
      AvatarUploadable
    },
    data () {
      return {
        isFormChanged: false
      };
    },
    computed: {
      ...mapState({
        account: state => state.account.account,
        profileForm: state => state.user.profileForm
      }),

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
          if (this.noPatronymic) return "";
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
        } else if (this.account.avatar) {
          return `${ process.env.SERVER_API_HOST }${ this.account.avatar }`;
        }
        return null;
      },

      validateNames () {
        return [
          val => val && val.length > 0 && val.length < 50, val => val && /^[A-zА-яЁё\-]*$/.test(val)
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
          val => val && val.length === 11
        ];
      },

      validateTelegram () {
        return [
          val => val.length === 0 || val.length >= 5 && val.length <= 32,
          val => /^[a-zA-Z0-9_.]*$/.test(val)
        ];
      },

      isLoading () {
        return this.$store.state.wait[GET_ACCOUNT];
      },

      isMobile () {
        return this.$q.platform.is.mobile;
      }
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

      onValidationError () {
        this.$q.notify({
          message: "Ошибка при валидации",
          color: "red",
          position: "bottom"
        });
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
        if (!this.isFormChanged && value !== defaultValue) {
          this.isFormChanged = true;
        } else if (this.isFormChanged && value === defaultValue) {
          this.isFormChanged = false;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  ::v-deep .q-item
    padding: 0
  .avatar-uploadable__input
    ::v-deep .q-field
      width: 10rem
    ::v-deep .q-field__control-container
      justify-content: center
    ::v-deep .q-field__native
      display: none
    .avatar-uploadable__image
      object-fit: cover
</style>
