<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("user.profile.documents.myDocuments") }}
        my-documents-form
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.familyInfo") }}
        neighbors.q-mt-sm
    q-card
      q-card-section
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.vehicleInfo") }}
        vehicles.q-mt-sm
</template>

<script>
  import FilePicker from "../components/common/FilePicker";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import Vehicles from "components/user/documents/Vehicles";
  import MyDocumentsForm from "../components/forms/documents/MyDocumentsForm";
  import Neighbors from "components/user/documents/Neighbors";

  export default {
    name: "UserDocuments",
    components: { MyDocumentsForm, VehicleForm, FilePicker, Neighbors, Vehicles },
    methods: {
      onSaveDocuments () {
        // send documents
      }
    }
  };
</script>
