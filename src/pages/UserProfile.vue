<template lang="pug">
  q-page
    .container.q-ma-lg.q-pa-lg.shadow-2.rounded-borders
      .main-block.row
        .col
          BaseInput(v-model="lastName" label="Фамилия")
          BaseInput(v-model="firstName" label="Имя")
          BaseInput(v-model="patronymic" label="Отчество")
        .col.flex.items-center.justify-center
          q-avatar(size="10rem")
            img(src="@/assets/svg/avatar-placeholder.svg")
      q-separator.q-my-lg
      .email-block.row
        .col
          BaseInput(v-model="email" label="Email" readonly)
        .col.flex.items-center.justify-end
          router-link(:to="{ name: 'change-email' }")
            | Сохранить
      q-separator.q-my-lg
      .password-block.row
        .col
          BaseInput(v-model="password" label="Пароль")
        .col.flex.items-center.justify-end
          router-link(:to="{ name: 'change-password' }")
            | Изменить
      q-separator.q-mt-lg
      .contacts-block.row
        .col
          h5.q-my-lg
            | Контакты
          BaseInput(v-model="phone" label="Телефон")
          BaseInput(v-model="telegramAlias" label="Telegram (alias)")
        .col.column.q-ml-lg
          h5.q-my-lg
            | Социальные сети
          q-toggle(v-model="toggleGoogle")
            | Google
          q-toggle(v-model="toggleFacebook")
            | Facebook
          q-toggle(v-model="toggleVK")
            | VK
      .save-btn.flex.items-center.justify-end.q-mt-lg
        q-btn(color="primary" label="Сохранить")
    
    BaseModal(:value="showEmailModal" @input="toggleModal")
      template(v-slot:title)
        | Смена почты
      template(v-slot:content)
        | После сохранения на новый адрес будет отправлено письмо для подтверждения электронной почты
        BaseInput(v-model="emailConfirmation" label="Email")
      template(v-slot:buttons)
        q-btn(v-close-popup color="primary" label="Сохранить")
    
    BaseModal(:value="showPasswordModal" @input="toggleModal")
      template(v-slot:title)
        | Смена пароля
      template(v-slot:content)
        BaseInput(v-model="emailConfirmation" label="Текущий пароль")
        BaseInput(v-model="emailConfirmation" label="Новый пароль")
        BaseInput(v-model="emailConfirmation" label="Новый пароль")
      template(v-slot:buttons)
        q-btn(v-close-popup color="primary" label="Сохранить")
</template>

<script>
  import BaseInput from "components/common/BaseInput";
  import BaseModal from "components/common/BaseModal";
  import { mapGetters } from "vuex";

  export default {
    name: "UserProfile",
    components: {
      BaseInput,
      BaseModal
    },
    data () {
      return {
        showEmailModal: false,
        showPasswordModal: false,
        emailConfirmation: null
      };
    },
    computed: {
      ...mapGetters([
        "getAccount"
      ]),
      firstName: {
        get () {
          return this.getAccount ? this.getAccount.firstName : null;
        }
      },
      lastName: {
        get () {
          return this.getAccount ? this.getAccount.lastName : null;
        }
      },
      patronymic: {
        get () {
          return this.getAccount ? this.getAccount.patronymic : null;
        }
      },
      email: {
        get () {
          return this.getAccount ? this.getAccount.email : null;
        }
      },
      password: {
        get () {
          return this.getAccount ? this.getAccount.password : null;
        }
      },
      phone: {
        get () {
          return this.getAccount ? this.getAccount.phone : null;
        }
      },
      telegramAlias: {
        get () {
          return this.getAccount ? this.getAccount.telegramAlias : null;
        }
      },
      toggleGoogle: {
        get () {
          return this.getAccount ? this.getAccount.toggleGoogle : false;
        }
      },
      toggleFacebook: {
        get () {
          return this.getAccount ? this.getAccount.toggleFacebook : false;
        }
      },
      toggleVK: {
        get () {
          return this.getAccount ? this.getAccount.toggleVK : false;
        }
      }
    },
    methods: {
      toggleModal (value) {
        if (!value) this.$router.push({ name: "profile" });
      }
    },
    watch: {
      $route: {
        immediate: true,
        handler: function (newVal) {
          this.showEmailModal = newVal.meta && newVal.meta.showEmailModal;
          this.showPasswordModal = newVal.meta && newVal.meta.showPasswordModal;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
