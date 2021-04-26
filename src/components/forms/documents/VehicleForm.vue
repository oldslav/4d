<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        q-select(:label="$t('user.profile.documents.vehicle.type')" v-model="type" :options="vehicleTypes" option-label="name")
      .col-12.col-sm-6.col-md-3
        q-select(:label="$t('user.profile.documents.vehicle.brand')" v-model="brand" use-input)
      .col-12.col-sm-6.col-md-3
        q-select(:label="$t('user.profile.documents.vehicle.model')" v-model="model" use-input)
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('user.profile.documents.vehicle.plates')" v-model="plates")
    q-expansion-item.q-mt-sm.full-width(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      base-documents(:entries="entries" v-model="documents")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseDocuments from "./BaseDocuments";

  export default {
    name: "VehicleForm",
    components: { BaseDocuments },
    beforeMount () {
      this.getVehicleTypes()
        .then(({ data }) => {
          console.log("th", data);
          this.vehicleTypes = data;
        });
    },
    data () {
      return {
        type: "",
        brand: "",
        model: "",
        plates: "",
        documents: {
          sts: null,
          pts: null
        },
        vehicleTypes: null
      };
    },
    computed: {
      entries () {
        return [
          {
            value: "sts",
            props: {
              label: this.$t("user.profile.documents.sts"),
              maxFiles: 2
            }
          },
          {
            value: "pts",
            props: {
              label: this.$t("user.profile.documents.pts"),
              maxFiles: 2
            }
          }
        ];
      }
    },
    methods: {
      ...mapActions("documents", ["getVehicleTypes"])
    }
  };
</script>
