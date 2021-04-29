<template lang="pug">
  div.text-right
    base-documents(:value="value" @input="onInput" :entries="entries")
    q-btn.q-mt-sm(color="primary" label="Сохранить" v-if="saveVisible" @click="onSave()")
</template>

<script>
  import BaseDocuments from "components/common/BaseDocuments";

  export default {
    name: "MyDocumentsForm",
    components: { BaseDocuments },
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      saveVisible () {
        return true;
      },
      entries () {
        return [
          {
            props: {
              label: this.$t("user.profile.documents.passportCopy"),
              maxFiles: 5
            },
            value: "passport"
          },
          {
            props: {
              label: this.$t("user.profile.documents.snilsCopy")
            },
            value: "snils"
          },
          {
            props: {
              label: this.$t("user.profile.documents.innCopy")
            },
            value: "inn"
          },
          {
            props: {
              label: this.$t("user.profile.documents.workCertificate")
            },
            value: "job"
          }
        ];
      }
    },
    methods: {
      onInput (val) {
        this.$emit("input", val);
      },
      onSave () {
        this.$emit("save");
      }
    }
  };
</script>
