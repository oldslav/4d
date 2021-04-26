<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(:label="$t('user.lastName')" v-model="lastName")
      .col-12.col-md-4
        q-input(:label="$t('user.firstName')" v-model="firstName")
      .col-12.col-md-4
        q-input(:label="$t('user.patronymic')" v-model="patronymic")
    q-expansion-item.q-mt-sm.full-width(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      base-documents(:entries="entries" v-model="documents")
</template>

<script>
  import BaseDocuments from "./BaseDocuments";

  const childModel = () => ({
    passport: null,
    birthCertificate: null,
    registration: null
  });

  const spouseModel = () => ({
    passport: null,
    marriageCertificate: null,
    snils: null,
    inn: null
  });

  export default {
    name: "RelativeForm",
    components: { BaseDocuments },
    props: {
      child: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        firstName: null,
        lastName: null,
        patronymic: null,
        documents: { ...this.documentsModel }
      };
    },
    computed: {
      spouseEntries () {
        return [
          {
            value: "passport",
            props: {
              label: this.$t("user.profile.documents.passportCopy"),
              maxFiles: 5
            }
          },
          {
            value: "snils",
            props: {
              label: this.$t("user.profile.documents.snilsCopy")
            }
          },
          {
            value: "inn",
            props: {
              label: this.$t("user.profile.documents.innCopy")
            }
          },
          {
            value: "marriageCertificate",
            props: {
              label: this.$t("user.profile.documents.marriageCertificate")
            }
          }
        ];
      },
      childEntries () {
        return [
          {
            value: "birthCertificate",
            props: {
              label: this.$t("user.profile.documents.birthCertificate")
            }
          },
          {
            value: "registration",
            props: {
              label: this.$t("user.profile.documents.registrationCopy")
            }
          },
          {
            value: "passport",
            props: {
              label: this.$t("user.profile.documents.passportCopy"),
              maxFiles: 5
            }
          }
        ];
      },
      entries () {
        return this.child ? this.childEntries : this.spouseEntries;
      },
      documentsModel () {
        return this.child ? childModel() : spouseModel();
      }
    }
  };
</script>
