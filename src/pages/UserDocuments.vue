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
      q-inner-loading(:showing="loadingNeighbors")
        q-spinner(size="50px" color="primary")
    q-card
      q-card-section
        .text-medium.text-weight-bold
          | {{ $t("user.profile.documents.vehicleInfo") }}
        vehicles.q-mt-sm
      q-inner-loading(:showing="loadingVehicles")
        q-spinner(size="50px" color="primary")
</template>

<script>
  import FilePicker from "../components/common/FilePicker";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import Vehicles from "components/user/documents/Vehicles";
  import MyDocumentsForm from "../components/forms/documents/MyDocumentsForm";
  import Neighbors from "components/user/documents/Neighbors";
  import {
    CREATE_USER_NEIGHBOR,
    CREATE_USER_VEHICLE,
    UPDATE_USER_NEIGHBOR,
    UPDATE_USER_VEHICLE
  } from "@/store/constants/action-constants";

  export default {
    name: "UserDocuments",
    components: { MyDocumentsForm, VehicleForm, FilePicker, Neighbors, Vehicles },
    computed: {
      loadingVehicles () {
        return this.$store.state.wait[`user/vehicles/${ CREATE_USER_VEHICLE }`] || this.$store.state.wait[`user/vehicles/${ UPDATE_USER_VEHICLE }`];
      },
      loadingNeighbors () {
        return this.$store.state.wait[`user/neighbors/${ CREATE_USER_NEIGHBOR }`] || this.$store.state.wait[`user/vehicles/${ UPDATE_USER_NEIGHBOR }`];
      }
      // loadingDocuments () {
      //   return this.$store.state.wait[];
      // }
    },
    methods: {
      onSaveDocuments () {
        // send documents
      }
    }
  };
</script>
