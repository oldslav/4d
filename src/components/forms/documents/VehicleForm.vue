<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.type')"
          v-model="type"
          :options="vehicleTypes"
          option-label="name"
          @filter="loadTypes"
          :loading="loadingTypes"
          @input="loadBrands()"
        )
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.brand')"
          v-if="type"
          :options="actualBrands"
          option-label="name"
          v-model="brand"
          use-input
          @input="loadModels()"
          @filter="filterBrands"
        )
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.model')"
          v-if="brand"
          :options="actualModels"
          option-label="name"
          v-model="model"
          use-input
          @filter="filterModels"
        )
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('user.profile.documents.vehicle.plates')" v-if="model" v-model="plates")
    q-expansion-item.q-mt-sm(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      base-documents(:entries="entries" v-model="documents")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseDocuments from "../../common/BaseDocuments";

  export default {
    name: "VehicleForm",
    components: { BaseDocuments },
    data () {
      return {
        type: null,
        brand: null,
        model: null,
        plates: null,
        documents: {
          sts: null,
          pts: null
        },
        vehicleTypes: null,
        vehicleBrands: null,
        vehicleModels: null,
        actualBrands: null,
        actualModels: null,
        loadingTypes: false,
        loadingBrands: false,
        loadingModels: false
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
      ...mapActions("documents", ["getVehicleTypes", "getVehicleBrands", "getVehicleModels"]),
      loadTypes (val, update) {
        if (this.vehicleTypes !== null) {
          update();
          return;
        }
        update(() => {
          this.loadingTypes = true;
          this.getVehicleTypes()
            .then(({ data }) => {
              this.vehicleTypes = data;
            })
            .finally(() => {
              this.loadingTypes = false;
            });
        });
      },
      loadBrands () {
        this.brand = null;
        this.model = null;
        this.loadingBrands = true;
        return this.getVehicleBrands(this.type.value)
          .then(({ data }) => {
            this.vehicleBrands = data;
          })
          .finally(() => {
            this.loadingBrands = false;
          });
      },
      loadModels () {
        this.model = null;
        this.loadingModels = true;
        this.getVehicleModels({ typeId: this.type.value, brandId: this.brand.value })
          .then(({ data }) => {
            this.vehicleModels = data;
          })
          .finally(() => {
            this.loadingModels = false;
          });
      },
      filterBrands (val, update) {
        update(() => {
          this.actualBrands = this.vehicleBrands.filter((b) => b.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      },
      filterModels (val, update) {
        update(() => {
          this.actualModels = this.vehicleModels.filter((m) => m.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    }
  };
</script>
