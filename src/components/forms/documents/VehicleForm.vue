<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        base-autocomplete(
          :label="$t('entity.vehicles.type')"
          v-model="vehicle.type"
          :options="vehicleTypes"
          clearable
          field="name"
          prop="id"
          :rules="requiredRule"
          :readonly="readonly"
          @input="onInputType()"
        )
      .col-12.col-sm-6.col-md-3
        base-autocomplete(
          :label="$t('entity.vehicles.brand')"
          :disable="!vehicle.type"
          :options="vehicleBrands"
          clearable
          field="name"
          prop="id"
          v-model="vehicle.brand"
          use-input
          :readonly="readonly"
          @input="onInputBrand()"
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        base-autocomplete(
          :label="$t('entity.vehicles.model')"
          :disable="!vehicle.brand"
          clearable
          :options="vehicleModels"
          field="name"
          prop="id"
          v-model="vehicle.model"
          :readonly="readonly"
          use-input
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('entity.vehicles.plates')" :disable="!vehicle.model" v-model="vehicle.number" :readonly="readonly" maxlength="12")
    .text-subtitle.q-my-sm
      file-picker(
        :max-files="2"
        v-model="vehicle.documents.pts"
        @remove="onRemoveFile"
        :label="this.$t('entity.files.pts')"
        :readonly="readonly"
      )
      file-picker(
        :max-files="2"
        v-model="vehicle.documents.sts"
        @remove="onRemoveFile"
        :label="this.$t('entity.files.sts')"
        :readonly="readonly"
      )
    div.text-right.q-mt-md(v-show="isChanged && !readonly")
      q-btn.q-mr-md(flat @click="onCancel()" :label="this.$t('action.cancel')")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import { mapActions } from "vuex";
  import { isEqual, cloneDeep } from "lodash";
  import FilePicker from "components/common/FilePicker";
  import BaseAutocomplete from "components/common/BaseAutocomplete";

  export default {
    name: "VehicleForm",
    components: { FilePicker, BaseAutocomplete },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      index: {
        type: Number,
        default: null
      },
      backup: {
        type: Object,
        default: () => ({})
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    async mounted () {
      await Promise.allSettled([
        this.loadTypes(),
        ...this.vehicle.type ? [this.loadBrands()] : [],
        ...this.vehicle.brand ? [this.loadModels()] : []
      ]);
    },
    data () {
      return {
        vehicle: { ...this.value },
        vehicleTypes: [],
        vehicleBrands: [],
        vehicleModels: [],
        loadingTypes: false,
        loadingBrands: false,
        loadingModels: false
      };
    },
    computed: {
      requiredRule () {
        return [
          val => !!val
        ];
      },
      isChanged () {
        return !isEqual(this.backup, this.vehicle); // backup
      },
      isUpdate () {
        return !!this.vehicle.id;
      }
    },
    methods: {
      ...mapActions("user/vehicles", ["getVehicleTypes", "getVehicleBrands", "getVehicleModels"]),
      onSubmit () {
        let label = "create";
        if (this.isUpdate) {
          label = "update";
        }
        this.$emit("submit", { label, vehicle: this.vehicle });
      },
      onCancel () {
        if (this.isUpdate) {
          this.discardChanges();
        } else {
          this.$emit("remove", this.index);
        }
      },
      discardChanges () {
        this.vehicle = cloneDeep(this.backup); // backup
      },
      loadTypes () {
        this.loadingTypes = true;
        return this.getVehicleTypes()
          .then((data) => {
            this.vehicleTypes = data;
          })
          .finally(() => {
            this.loadingTypes = false;
          });
      },
      onInputType () {
        this.vehicle.brand = null;
        this.vehicle.model = null;
        this.vehicle.type && this.loadBrands();
      },
      onInputBrand () {
        this.vehicle.model = null;
        if (this.vehicle.type && this.vehicle.brand) {
          this.loadModels();
        }
      },
      loadBrands () {
        this.loadingBrands = true;
        return this.getVehicleBrands(this.vehicle.type.id)
          .then((data) => {
            this.vehicleBrands = data;
          })
          .finally(() => {
            this.loadingBrands = false;
          });
      },
      loadModels () {
        this.loadingModels = true;
        return this.getVehicleModels({ typeId: this.vehicle.type.id, brandId: this.vehicle.brand.id })
          .then((data) => {
            this.vehicleModels = data;
          })
          .finally(() => {
            this.loadingModels = false;
          });
      },
      onRemoveFile (id) {
        this.$emit("removeFile", id);
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
