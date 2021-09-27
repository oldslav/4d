<template lang="pug">
  q-form(ref="form")
    .column
      FormPhones(v-model="model.phones" @input="onInput()")
      q-input(
        v-model="model.telegramAlias"
        @input="onInput()"
        :label="$t('user.profile.mainForm.telegramAlias')"
        :rules="validateTelegram"
      )
      .text-caption.text-primary-light
        | {{ $t("entity.contacts.preferred") }}
      q-checkbox(v-model="model.pcm.email" @input="onInput()" :label="$t('entity.contacts.email')")
      q-checkbox(v-model="model.pcm.phone" @input="onInput()" :label="$t('entity.contacts.phone')")
      q-checkbox(v-model="model.pcm.telegram" @input="onInput()" :label="$t('entity.contacts.telegram')")
      q-checkbox(v-model="model.pcm.whatsApp" @input="onInput()" :label="$t('entity.contacts.whatsApp')")
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
        const validate = (val) => {
          if (!val.length) {
            return this.$t("common.error.validation.required");
          }

          if (val.length < 5 || val.length > 32) {
            return this.$t("common.error.validation.length", { length: "5 - 32" });
          }

          return /^[a-zA-Z0-9_.]*$/.test(val) || this.$t("common.error.validation.invalid");
        };

        return [
          (val) => {
            const pcmTelegram = this.model.pcm.telegram;
            return pcmTelegram ? validate(val) : val.length === 0 || validate(val);
          }
        ];
      }
    },
    methods: {
      defaultModel () {
        return {
          phones: [this.contacts.phone],
          telegramAlias: this.contacts.telegramAlias || "",
          pcm: { ...this.contacts.pcm }
        };
      },
      onInput () {
        this.$emit("input", this.model);
      },
      validate () {
        return this.$refs.form.validate();
      }
    }
  };
</script>

<style scoped>

</style>
