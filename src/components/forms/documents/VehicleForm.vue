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
          use-input
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('entity.vehicles.plates')" :disable="!vehicle.model" v-model="vehicle.number" maxlength="12")
    .text-subtitle.q-my-sm {{ $t("entity.documents.title") }}
      file-picker(:max-files="2" v-model="vehicle.documents.pts" @remove="onRemoveFile" :label="this.$t('entity.files.pts')")
      file-picker(:max-files="2" v-model="vehicle.documents.sts" @remove="onRemoveFile" :label="this.$t('entity.files.sts')")
    div.text-right.q-mt-md(v-show="isChanged && !unmanaged")
      q-btn.q-mr-md(flat @click="onCancel()" :label="this.$t('action.cancel')")
      q-btn(color="primary" :label="this.$t('action.save')" type="submit")
</template>

<script>
  import { mapActions } from "vuex";
  import { isEqual } from "lodash";
  import { CREATE_USER_VEHICLE, UPDATE_USER_VEHICLE } from "@/store/constants/action-constants";
  import FilePicker from "components/common/FilePicker";
  import BaseAutocomplete from "components/common/BaseAutocomplete";

  const deepClone = (val) => JSON.parse(JSON.stringify(val));

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
      unmanaged: {
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
        loadingModels: false,
      };
    },
    computed: {
      requiredRule () {
        return [
          val => !!val || this.$t("common.error.validation.required")
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
      ...mapActions("user/vehicles", ["getVehicleTypes", "getVehicleBrands", "getVehicleModels", CREATE_USER_VEHICLE, UPDATE_USER_VEHICLE]),
      onSubmit () {
        let action;
        let actionLabel = "create";
        if (this.isUpdate) {
          actionLabel = "update";
          action = this[UPDATE_USER_VEHICLE];
        } else {
          action = this[CREATE_USER_VEHICLE];
        }
        return action.call(this, this.vehicle)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t(`entity.vehicles.messages.${ actionLabel }.success`)
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t(`entity.vehicles.messages.${ actionLabel }.fail`)
            });
          });
      },
      onCancel () {
        if (this.isUpdate) {
          this.discardChanges();
        } else {
          this.$emit("remove", this.index);
        }
      },
      discardChanges () {
        this.vehicle = deepClone(this.backup); // backup
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
        if (this.vehicle.type) {
          this.loadBrands();
        } else {
          this.vehicle.brand = null;
          this.vehicle.model = null;
        }
      },
      onInputBrand () {
        if (this.vehicle.type && this.vehicle.brand) {
          this.loadModels();
        } else {
          this.vehicle.model = null;
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
