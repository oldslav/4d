<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | Мои документы
        documents-form(:entries="myDocumentsEntries" v-model="myDocuments")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | Данные о семье
        relative-form
    q-card
      q-card-section
        .text-medium.text-weight-bold
          | Данные об автомобиле
        vehicle-form
</template>

<script>
  import FilePicker from "components/common/FilePicker";
  import RelativeForm from "components/forms/documents/RelativeForm";
  import DocumentsForm from "components/forms/documents/DocumentsForm";
  import VehicleForm from "components/forms/documents/VehicleForm";

  export default {
    name: "Documents",
    components: { VehicleForm, DocumentsForm, RelativeForm, FilePicker },
    data () {
      return {
        myDocuments: {
          passport: null,
          snils: null,
          inn: null,
          job: null
        }
      };
    },
    computed: {
      buttonVisible () {
        return true;
      },
      myDocumentsEntries () {
        return [
          {
            props: {
              label: "Скан-копия паспорта",
              maxFiles: 5
            },
            value: "passport"
          },
          {
            props: {
              label: "Скан-копия СНИЛС"
            },
            value: "snils"
          },
          {
            props: {
              label: "Скан-копия ИНН"
            },
            value: "inn"
          },
          {
            props: {
              label: "Справка с места работы"
            },
            value: "job"
          }
        ];
      }
    }
  };
</script>
