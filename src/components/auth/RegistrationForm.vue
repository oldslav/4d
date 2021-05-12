<template lang="pug">
  q-card-section
    h3.text-title
      | {{ $t("common.register.title") }}
    h3.text-subtitle
      | {{ $t("common.register.subtitle") }}
    q-form.q-gutter-y-md.q-mt-lg(@submit.prevent.stop="onSubmit()")
      h3.text-subtitle
        | Выберите профиль пользователя
      q-tabs(v-model="currentTab" align="justify")
        q-tab(v-for="tab in tabs" :name="tab.id" :label="tab.name" :key="tab.id")
      q-tab-panels.q-mt-xs(v-model="currentTab")
        q-tab-panel.q-pt-none(v-for="tab in tabs" :name="tab.id" :key="tab.id")
          component(:is="activeComponent" v-model="model")
      q-checkbox(v-model="consent" size="sm")
        | {{ label }}
      q-btn.full-width(:label="$t('action.register')" type="submit" :disable="!buttonActive" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import { ACCOUNT_CREATE } from "@/store/constants/action-constants";
  import IndividualInputs from "components/auth/IndividualInputs";
  import LegalInputs from "components/auth/LegalInputs";

  export default {
    name: "RegistrationForm",
    components: { IndividualInputs, LegalInputs },
    data () {
      return {
        model: {},
        currentTab: 1,
        consent: false
      };
    },
    computed: {
      label () {
        return "Нажимая кнопку “Зарегистрироваться”, я принимаю условия Пользовательского соглашения и даю согласие на обработку персональных данных";
      },
      buttonActive () {
        return this.consent;
      },
      activeComponent () {
        return this.currentTab === 1 ? IndividualInputs : LegalInputs;
      },
      tabs () {
        return [
          {
            id: 1,
            name: "Физическое лицо"
          },
          {
            id: 2,
            name: "Юридическое лицо"
          }
        ];
      }
    },
    methods: {
      ...mapActions([ACCOUNT_CREATE]),
      onSubmit () {
        this.ACCOUNT_CREATE(this.model)
          .then(() => {
            this.$q.dialog({
              message: "На ваш почтовый ящик выслано письмо с подтверждением",
              ok: "Ok"
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: "При регистрации произошла ошибка"
            });
          });
      }
    }
  };
</script>
