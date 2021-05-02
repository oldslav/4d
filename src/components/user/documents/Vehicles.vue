<template lang="pug">
  .full-width
    base-tabs(v-model="currentTab")
      q-tab(v-for="(tab, index) in vehicles" :key="index" :name="tab | vehicleName(index)")
        div.flex.items-center
          | {{ tab | vehicleName(index) }}
          q-btn.q-ml-sm(round size="sm" dense flat icon="o_delete" @click.stop="onRemove(index)")
      q-btn(flat auto-close icon="add" @click="addVehicleItem()")
    q-tab-panels(v-model="currentTab" animated keep-alive)
      q-tab-panel.q-px-none(v-for="(vehicle, index) in vehicles" :key="index" :name="vehicle | vehicleName(index)")
        vehicle-form(:value="vehicle" :index="index" @remove="removeVehicle")
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import BaseTabs from "components/common/BaseTabs";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import { SET_VEHICLE_ITEM, CREATE_VEHICLE_ITEM } from "@/store/constants/mutation-constants";
  import { DELETE_USER_VEHICLE } from "@/store/constants/action-constants";

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
    created () {
      this.cloneData();
    },
    data () {
      return {
        currentTab: null,
        vehicles: null
      };
    },
    computed: {
      ...mapGetters("user/vehicles", ["getVehicles"])
    },
    methods: {
      ...mapMutations("user/vehicles", { setVehicleItem: SET_VEHICLE_ITEM, createVehicleItem: CREATE_VEHICLE_ITEM }),
      ...mapActions("user/vehicles", { deleteVehicle: DELETE_USER_VEHICLE }),
      cloneData () {
        this.vehicles = JSON.parse(JSON.stringify(this.getVehicles));
      },
      onRemove (index) {
        this.$q.dialog({
          title: "Удаление",
          message: "Вы уверены, что хотите удалить это транспортное средство?",
          ok: "Подтвердить",
          cancel: "Отмена",
          persistent: true
        })
          .onOk(() => this.removeVehicle(index));
      },
      removeVehicle (index) {
        if (!!this.vehicles[index].id) {
          this.deleteVehicle(this.vehicles[index].id);
        } else {
          this.vehicles.splice(index, 1);
        }
      },
      addVehicleItem () {
        this.vehicles.push(defaultVehicle());
      }
      // onInput (payload, index) {
      //   this.setVehicleItem({ payload, index });
      // }
    },
    watch: {
      getVehicles: {
        deep: true,
        handler (val) {
          this.vehicles = val;
        }
      }
    }
  };
</script>
