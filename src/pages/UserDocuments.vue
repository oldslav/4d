<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("user.profile.documents.myDocuments") }}
        base-documents(:entries="myDocumentsEntries" v-model="myDocuments")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.familyInfo") }}
        relative-form
    q-card
      q-card-section
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.vehicleInfo") }}
        vehicle-form
</template>

<script>
  import FilePicker from "components/common/FilePicker";
  import RelativeForm from "components/forms/documents/RelativeForm";
  import BaseDocuments from "components/forms/documents/BaseDocuments";
  import VehicleForm from "components/forms/documents/VehicleForm";

  export default {
    name: "UserDocuments",
    components: { VehicleForm, BaseDocuments, RelativeForm, FilePicker },
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
      },
      myDocumentsEntries () {
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
    }
  };
</script>
