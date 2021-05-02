<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.type')"
          v-model="vehicle.type"
          :options="vehicleTypes"
          option-label="name"
          :loading="loadingTypes"
          @input="loadBrands()"
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        q-select(
          :label="$t('user.profile.documents.vehicle.brand')"
          :disable="!vehicle.type"
          :options="actualBrands"
          option-label="name"
          option-value="name"
          v-model="vehicle.brand"
          use-input
          @filter="filterBrands"
          @input="loadModels()"
          :rules="requiredRule"
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
          :rules="requiredRule"
        )
      .col-12.col-sm-6.col-md-3
        q-input(:label="$t('user.profile.documents.vehicle.plates')" :disable="!vehicle.model" v-model="vehicle.number")
    q-expansion-item.q-mt-sm(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      file-picker(:max-files="2" v-model="vehicle.pts" :label="this.$t('user.profile.documents.pts')")
      file-picker(:max-files="2" v-model="vehicle.sts" :label="this.$t('user.profile.documents.sts')")
    div.text-right.q-mt-md(v-show="isChanged")
      q-btn.q-mr-md(flat @click="onCancel()" label="Отмена")
      q-btn(color="primary" label="Сохранить" type="submit")
</template>

<script>
  import { mapActions } from "vuex";
  import { isEqual } from "lodash";
  import FilePicker from "components/common/FilePicker";
  import { CREATE_USER_VEHICLE, UPDATE_USER_VEHICLE } from "@/store/constants/action-constants";

  export default {
    name: "VehicleForm",
    components: { FilePicker },
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
        vehicle: { ...this.value },
        vehicleTypes: null,
        vehicleBrands: null,
        vehicleModels: null,
        actualBrands: null,
        actualModels: null,
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
        this.vehicle = { ...this.value };
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
      }
      // vehicle: {
      //   deep: true,
      //   handler (val) {
      //     this.$emit("input", val);
      //   }
      // }
    }
  };
</script>
