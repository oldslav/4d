<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("user.profile.documents.myDocuments") }}
        my-documents-form(v-model="myDocuments" @save="onSaveDocuments()")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.familyInfo") }}
        relative-form(child)
    q-card
      q-card-section
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.vehicleInfo") }}
        vehicle-form
</template>

<script>
  import FilePicker from "components/common/FilePicker";
  import RelativeForm from "components/forms/documents/RelativeForm";
  import BaseDocuments from "components/common/BaseDocuments";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import MyDocumentsForm from "components/forms/documents/MyDocumentsForm";

  export default {
    name: "UserDocuments",
    components: { MyDocumentsForm, VehicleForm, BaseDocuments, RelativeForm, FilePicker },
    data () {
      return {
        myDocuments: {
          passport: null,
          snils: null,
          inn: null,
          workCertificate: null
        }
      };
    },
    computed: {
      buttonVisible () {
        return true;
      }
    },
    methods: {
      onSaveDocuments () {
        // send documents
      }
    }
  };
</script>
