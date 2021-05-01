<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.type')"
          v-model="vehicle.type"
          :options="vehicleTypes"
          option-label="name"
          @filter="typesFilter"
          :loading="loadingTypes"
          @input="loadBrands()"
        )
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.brand')"
          :disable="!vehicle.type"
          :options="actualBrands"
          option-label="name"
          v-model="vehicle.brand"
          use-input
          @filter="filterBrands"
          @input="loadModels()"
        )
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.model')"
          :disable="!vehicle.brand"
          :options="actualModels"
          option-label="name"
          v-model="vehicle.model"
          use-input
          @filter="filterModels"
        )
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('user.profile.documents.vehicle.plates')" :disable="!vehicle.model" v-model="vehicle.number")
    q-expansion-item.q-mt-sm(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      file-picker(:max-files="2" v-model="vehicle.pts" :label="this.$t('user.profile.documents.pts')")
      file-picker(:max-files="2" v-model="vehicle.sts" :label="this.$t('user.profile.documents.sts')")
    div.text-right.q-mt-md
      q-btn(color="primary" @click="log()" label="Сохранить")
</template>

<script>
  import { mapActions } from "vuex";
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "VehicleForm",
    components: { FilePicker },
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    mounted () {
      return Promise.allSettled([
        this.loadTypes(),
        ...this.vehicle.type ? [this.loadBrands()] : [],
        ...this.vehicle.brand ? [this.loadModels()] : []
      ]);
    },
    data () {
      return {
        vehicle: { ...this.value },
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
    methods: {
      ...mapActions("user/vehicles", ["getVehicleTypes", "getVehicleBrands", "getVehicleModels"]),
      typesFilter (val, update) {
        if (this.vehicleTypes !== null) {
          update();
          return;
        }
        update(() => {
          this.loadTypes();
        });
      },
      loadTypes () {
        this.loadingTypes = true;
        return this.getVehicleTypes()
          .then(({ data }) => {
            this.vehicleTypes = data;
          })
          .finally(() => {
            this.loadingTypes = false;
          });
      },
      loadBrands () {
        this.loadingBrands = true;
        return this.getVehicleBrands(this.vehicle.type.value)
          .then(({ data }) => {
            this.vehicleBrands = data;
          })
          .finally(() => {
            this.loadingBrands = false;
          });
      },
      loadModels () {
        this.loadingModels = true;
        return this.getVehicleModels({ typeId: this.vehicle.type.value, brandId: this.vehicle.brand.value })
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
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.vehicle = val;
        }
      },
      vehicle: {
        deep: true,
        handler (val) {
          this.$emit("input", val);
        }
      }
    }
  };
</script>
