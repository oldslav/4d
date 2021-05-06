<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        base-autocomplete(
          :label="$t('user.profile.documents.vehicle.type')"
          v-model="vehicle.type"
          :options="vehicleTypes"
          field="name"
          prop="id"
          :rules="requiredRule"
          @input="loadBrands()"
        )
      .col-12.col-sm-6.col-md-3
        base-autocomplete(
          :label="$t('user.profile.documents.vehicle.brand')"
          :disable="!vehicle.type"
          :options="vehicleBrands"
          field="name"
          prop="id"
          v-model="vehicle.brand"
          use-input
          @input="loadModels()"
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        base-autocomplete(
          :label="$t('user.profile.documents.vehicle.model')"
          :disable="!vehicle.brand"
          :options="vehicleModels"
          field="name"
          prop="id"
          v-model="vehicle.model"
          use-input
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('user.profile.documents.vehicle.plates')" :disable="!vehicle.model" v-model="vehicle.number")
    q-expansion-item.q-mt-sm(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      file-picker(:max-files="2" v-model="vehicle.documents.pts" @remove="onRemoveFile" :label="this.$t('user.profile.documents.pts')")
      file-picker(:max-files="2" v-model="vehicle.documents.sts" @remove="onRemoveFile" :label="this.$t('user.profile.documents.sts')")
    div.text-right.q-mt-md(v-show="isChanged")
      q-btn.q-mr-md(flat @click="onCancel()" label="Отмена")
      q-btn(color="primary" label="Сохранить" type="submit")
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
        vehicle: deepClone(this.value),
        vehicleTypes: [],
        vehicleBrands: [],
        vehicleModels: [],
        loadingTypes: false,
        loadingBrands: false,
        loadingModels: false,
        requiredRule: [val => !!val || "Поле обязательно к заполнению"]
      };
    },
    computed: {
      isChanged () {
        return !isEqual(this.value, this.vehicle);
      },
      isUpdate () {
        return !!this.vehicle.id;
      }
    },
    methods: {
      ...mapActions("user/vehicles", ["getVehicleTypes", "getVehicleBrands", "getVehicleModels", CREATE_USER_VEHICLE, UPDATE_USER_VEHICLE]),
      onSubmit () {
        let action;
        if (this.isUpdate) {
          action = this[UPDATE_USER_VEHICLE];
        } else {
          action = this[CREATE_USER_VEHICLE];
        }
        return action.call(this, this.vehicle);
      },
      onCancel () {
        if (this.isUpdate) {
          this.discardChanges();
        } else {
          this.$emit("remove", this.index);
        }
      },
      discardChanges () {
        this.vehicle = deepClone(this.value);
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
          this.vehicle = deepClone(val);
        }
      }
    }
  };
</script>
