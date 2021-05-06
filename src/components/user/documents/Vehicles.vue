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
        vehicle-form(:value="vehicle" :index="index" @remove="removeVehicle" @removeFile="onRemoveFile")
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import BaseTabs from "components/common/BaseTabs";
  import VehicleForm from "components/forms/documents/VehicleForm";
  import { DELETE_USER_VEHICLE } from "@/store/constants/action-constants";
  import { SET_DELETED_ID } from "@/store/constants/mutation-constants";

  const defaultVehicle = () => ({
    type: null,
    brand: null,
    model: null,
    number: null,
    documents: {
      sts: [],
      pts: []
    }
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
      ...mapActions("user/vehicles", { deleteVehicle: DELETE_USER_VEHICLE }),
      ...mapMutations("user/vehicles", [SET_DELETED_ID]),
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
      onRemoveFile (id) {
        this.SET_DELETED_ID(id);
      },
      removeVehicle (index) {
        if (!!this.vehicles[index].id) {
          this.deleteVehicle(this.vehicles[index].id)
            .then(() => {
              this.$q.notify({
                type: "positive",
                message: this.$t("entity.vehicles.messages.delete.success")
              });
            })
            .catch(() => {
              this.$q.notify({
                type: "negative",
                message: this.$t("entity.vehicles.messages.delete.fail")
              });
            });
        } else {
          this.vehicles.splice(index, 1);
        }
      },
      addVehicleItem () {
        this.vehicles.push(defaultVehicle());
      }
    },
    watch: {
      getVehicles: {
        deep: true,
        handler (val) {
          this.vehicles = JSON.parse(JSON.stringify(val));
        }
      }
    }
  };
</script>
