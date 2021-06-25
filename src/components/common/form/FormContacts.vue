<template lang="pug">
  .column
    .row.q-col-gutter-md.items-baseline
      .col-6
        q-input(
          v-for="(phone, index) in model.phones"
          v-model="model.phones[index]"
          mask="# (###) ### - ####"
          unmasked-value
          @input="onInput()"
          :label="$t('user.profile.mainForm.phone')"
          :rules="validatePhone"
        )
          template(#after v-if="index !== 0")
            q-icon(name="close" @click="removePhone(index)").cursor-pointer
      .col-6
        q-btn(label="Добавить телефон" @click="addPhone()" outline color="primary")
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

  export default {
    name: "FormContacts",
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
      },
      addPhone () {
        this.model.phones.push("");
        this.onInput();
      },
      removePhone (index) {
        this.model.phones.splice(index, 1);
        this.onInput();
      }
    }
  };
</script>

<style scoped>

</style>
