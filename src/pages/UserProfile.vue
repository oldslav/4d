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
          BaseInput(v-model="email" label="Email")
        .col.flex.items-center.justify-end
          | Изменить
      q-separator.q-my-lg
      .password-block.row
        .col
          BaseInput(v-model="password" label="Пароль")
        .col.flex.items-center.justify-end
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
</template>

<script>
  import BaseInput from "components/common/BaseInput";
  import { mapGetters } from "vuex";

  export default {
    name: "UserProfile",
    components: { BaseInput },
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
    }
  };
</script>

<style lang="stylus" scoped>
</style>
