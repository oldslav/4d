<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(label="Фамилия" v-model="lastName")
      .col-12.col-md-4
        q-input(label="Имя" v-model="firstName")
      .col-12.col-md-4
        q-input(label="Отчество" v-model="patronymic")
    q-expansion-item.q-mt-sm.full-width(label="Документы" header-class="q-px-none text-subtitle")
      documents-form(:entries="entries" v-model="documents")
</template>

<script>
  import DocumentsForm from "components/forms/documents/DocumentsForm";

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
    components: { DocumentsForm },
    props: {
      child: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        firstName: "",
        lastName: "",
        patronymic: "",
        documents: { ...this.documentsModel }
      };
    },
    computed: {
      spouseEntries () {
        return [
          {
            value: "passport",
            props: {
              label: "Скан-копия паспорта",
              maxFiles: 5
            }
          },
          {
            value: "snils",
            props: {
              label: "Скан-копия СНИЛС"
            }
          },
          {
            value: "inn",
            props: {
              label: "Скан-копия ИНН"
            }
          },
          {
            value: "marriageCertificate",
            props: {
              label: "Скан-копия свидетельства о браке"
            }
          }
        ];
      },
      childEntries () {
        return [
          {
            value: "birthCertificate",
            props: {
              label: "Скан-копия свидетельства о рождении"
            }
          },
          {
            value: "registration",
            props: {
              label: "Скан-копия прописки"
            }
          },
          {
            value: "passport",
            props: {
              label: "Скан-копия пасспорта",
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
