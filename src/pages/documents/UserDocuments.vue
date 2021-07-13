<template lang="pug">
  q-page.documents.q-pa-lg.column.q-gutter-y-lg
    q-card
      q-card-section.q-pa-lg
        .text-weight-bold.text-medium
          | {{ $t("entity.documents.data") }}
        my-documents-form
      q-inner-loading(:showing="loadingDocuments")
        q-spinner(size="50px" color="primary")
    q-card
      q-card-section.q-pa-lg
        .text-medium.text-weight-bold
          | {{ $t("entity.neighbors.data") }}
        neighbors.q-mt-sm
      q-inner-loading(:showing="loadingNeighbors")
        q-spinner(size="50px" color="primary")
    q-card
      q-card-section
        .text-medium.text-weight-bold
          | {{ $t("entity.vehicles.data") }}
        vehicles.q-mt-sm
      q-inner-loading(:showing="loadingVehicles")
        q-spinner(size="50px" color="primary")
    //q-inner-loading(:showing="loadingPage") всё роняет
      //q-spinner(size="50px" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import FilePicker from "components/common/FilePicker";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import Vehicles from "components/user/documents/Vehicles";
  import MyDocumentsForm from "components/forms/documents/MyDocumentsForm";
  import Neighbors from "components/user/documents/Neighbors";
  import {
    CREATE_USER_NEIGHBOR,
    CREATE_USER_VEHICLE,
    DELETE_USER_NEIGHBOR,
    DELETE_USER_VEHICLE,
    GET_REFERENCES,
    GET_USER_DOCUMENTS,
    UPDATE_USER_DOCUMENTS,
    UPDATE_USER_NEIGHBOR,
    UPDATE_USER_VEHICLE
  } from "@/store/constants/action-constants";

  export default {
    name: "UserDocuments",
    components: { MyDocumentsForm, VehicleForm, FilePicker, Neighbors, Vehicles },
    async created () {
      await Promise.all([this.GET_USER_DOCUMENTS(), this.GET_REFERENCES()]);
    },
    computed: {
      loadingVehicles () {
        return this.$store.state.wait[`user/vehicles/${ CREATE_USER_VEHICLE }`]
          || this.$store.state.wait[`user/vehicles/${ UPDATE_USER_VEHICLE }`]
          || this.$store.state.wait[`user/vehicles/${ DELETE_USER_VEHICLE }`];
      },
      loadingNeighbors () {
        return this.$store.state.wait[`user/neighbors/${ CREATE_USER_NEIGHBOR }`]
          || this.$store.state.wait[`user/neighbors/${ UPDATE_USER_NEIGHBOR }`]
          || this.$store.state.wait[`user/neighbors/${ DELETE_USER_NEIGHBOR }`];
      },
      loadingDocuments () {
        return this.$store.state.wait[`user/documents/${ UPDATE_USER_DOCUMENTS }`];
      },
      loadingPage () {
        return this.$store.state.wait[`user/documents/${ GET_USER_DOCUMENTS }`]
          || this.$store.state.wait[`references/${ GET_REFERENCES }`];
      }
    },
    methods: {
      ...mapActions("user/documents", [GET_USER_DOCUMENTS]),
      ...mapActions("references", [GET_REFERENCES])
    }
  };
</script>
