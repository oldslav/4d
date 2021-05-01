<template lang="pug">
  .full-width
    base-tabs(v-model="currentTab")
      q-tab(v-for="(tab, index) in getVehicles" :key="index" :label="tab | vehicleName(index)" :name="tab | vehicleName(index)")
      q-btn(flat auto-close label="Добавить" @click="addVehicle()")
    q-tab-panels(v-model="currentTab" animated keep-alive)
      q-tab-panel.q-px-none(v-for="(vehicle, index) in getVehicles" :key="index" :name="vehicle | vehicleName(index)")
        vehicle-form(:value="vehicle" @input="onInput($event, index)")
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import BaseTabs from "components/common/BaseTabs";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import { SET_VEHICLE_ITEM, CREATE_VEHICLE_ITEM } from "@/store/constants/mutation-constants";

  const defaultVehicle = () => ({
    type: null,
    brand: null,
    model: null,
    number: null,
    sts: null,
    pts: null
  });

  export default {
    name: "Vehicles",
    components: { VehicleForm, BaseTabs },
    filters: {
      vehicleName: (item, index) => {
        const { brand, model } = item;
        if (!brand) {
          return `Автомобиль ${ index + 1 }`;
        }
        return `${ brand.name } ${ model.name }`;
      }
    },
    data () {
      return {
        currentTab: null
      };
    },
    computed: {
      ...mapGetters("user/vehicles", ["getVehicles"])
    },
    methods: {
      ...mapMutations("user/vehicles", { setVehicleItem: SET_VEHICLE_ITEM, createVehicleItem: CREATE_VEHICLE_ITEM }),
      addVehicle () {
        this.createVehicleItem(defaultVehicle());
      },
      onInput (payload, index) {
        this.setVehicleItem({ payload, index });
      }
    }
  };
</script>
