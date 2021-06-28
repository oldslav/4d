<template lang="pug">
  .column
    FormPhones(v-model="model.phones" @input="onInput()")
    q-input(
      v-model="model.telegramAlias"
      @input="onInput()"
      :label="$t('user.profile.mainForm.telegramAlias')"
      :rules="validateTelegram"
    )
    .text-caption.text-primary-light
      | Предпочтительный способ связи
    q-checkbox(v-model="model.pcm.email" @input="onInput()" label="Email")
    q-checkbox(v-model="model.pcm.phone" @input="onInput()" label="Телефон")
    q-checkbox(v-model="model.pcm.telegram" @input="onInput()" label="Телеграм")
    q-checkbox(v-model="model.pcm.whatsApp" @input="onInput()" label="WhatsApp")
</template>

<script>
  import { mapGetters } from "vuex";
  import FormPhones from "components/common/form/FormPhones";

  export default {
    name: "FormContacts",
    components: { FormPhones },
    props: {
      value: {
        type: Object,
        default: null
      }
    },
    created () {
      const unwatch = this.$watch("value", () => {
        this.model = this.defaultModel();
      }, { immediate: true });
      unwatch();
      this.$emit("input", this.model);
    },
    data () {
      return {
        model: {}
      };
    },
    computed: {
      ...mapGetters(["getAccount"]),
      contacts () {
        return this.getAccount.contacts;
      },
      validateTelegram () {
        return [
          val => val.length === 0 || val.length >= 5 && val.length <= 32,
          val => /^[a-zA-Z0-9_.]*$/.test(val)
        ];
      }
    },
    methods: {
      defaultModel () {
        return {
          phones: [this.contacts.phone],
          telegramAlias: this.contacts.telegramAlias,
          pcm: { ...this.contacts.pcm }
        };
      },
      onInput () {
        this.$emit("input", this.model);
      }
    }
  };
</script>

<style scoped>

</style>
