<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        q-select(label="Тип" v-model="type")
      .col-12.col-sm-6.col-md-3
        q-select(label="Марка" v-model="brand" use-input)
      .col-12.col-sm-6.col-md-3
        q-select(label="Модель" v-model="model" use-input)
      .col-12.col-sm-6.col-md-3
        q-input(label="Номер" v-model="plates")
    q-expansion-item.q-mt-sm.full-width(label="Документы" header-class="q-px-none text-subtitle")
      documents-form(:entries="entries" v-model="documents")
</template>

<script>
  import DocumentsForm from "components/forms/documents/DocumentsForm";

  export default {
    name: "VehicleForm",
    components: { DocumentsForm },
    data () {
      return {
        type: "",
        brand: "",
        model: "",
        plates: "",
        documents: {
          sts: null,
          pts: null
        }
      };
    },
    computed: {
      entries () {
        return [
          {
            value: "sts",
            props: {
              label: "Свидетельство о регистрации ТС",
              maxFiles: 2
            }
          },
          {
            value: "pts",
            props: {
              label: "Паспорт ТС",
              maxFiles: 2
            }
          }
        ];
      }
    }
  };
</script>
