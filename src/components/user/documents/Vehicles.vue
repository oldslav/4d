<template lang="pug">
  .full-width
    q-tabs(v-model="currentTab" align="left" dense)
      q-tab(v-for="(tab, index) in vehicles" :disable="isChanged" :key="index" :name="index")
        q-tooltip(v-if="isChanged")
          | Сохраните или отмените изменения, чтобы переключить вкладку
        div.flex.items-center
          | {{ tab | vehicleName(index) }}
          q-btn.q-ml-sm(round size="sm" dense :disable="isChanged" flat icon="o_delete" @click.stop="onRemove(index)")
      q-btn(flat auto-close icon="add" @click="addVehicleItem()")
    q-tab-panels(v-model="currentTab" animated keep-alive)
      q-tab-panel.q-px-none(v-for="(vehicle, index) in vehicles" :key="index" :name="index")
        vehicle-form(v-model="vehicles[index]" :index="index" @submit="onSubmit" :backup="getVehicles[index]" @remove="removeVehicle" @removeFile="onRemoveFile")
</template>

<script>
  import { mapGetters, mapActions, mapMutations } from "vuex";
  import { isEqual, cloneDeep } from "lodash";
  import {
    CREATE_USER_VEHICLE,
    DELETE_USER_VEHICLE,
    UPDATE_USER_VEHICLE
  } from "@/store/constants/action-constants";
  import { SET_DELETED_ID } from "@/store/constants/mutation-constants";
  import BaseTabs from "components/common/BaseTabs";
  import VehicleForm from "components/forms/documents/VehicleForm";

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
        if (!model) {
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
        currentTab: 0,
        vehicles: null
      };
    },
    computed: {
      ...mapGetters("user/vehicles", ["getVehicles"]),
      isChanged () {
        return !isEqual(this.getVehicles, this.vehicles);
      }
    },
    methods: {
      ...mapActions("user/vehicles", { deleteVehicle: DELETE_USER_VEHICLE, CREATE_USER_VEHICLE, UPDATE_USER_VEHICLE }),
      ...mapMutations("user/vehicles", [SET_DELETED_ID]),
      cloneData () {
        this.vehicles = cloneDeep(this.getVehicles);
      },
      onSubmit ({ label, vehicle }) {
        const action = label === "update" ? this[UPDATE_USER_VEHICLE] : this[CREATE_USER_VEHICLE];
        return action.call(this, vehicle)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t(`entity.vehicles.messages.${ label }.success`)
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t(`entity.vehicles.messages.${ label }.fail`)
            });
          });
      },
      onRemove (index) {
        this.$q.dialog({
          title: this.$t("action.delete"),
          message: this.$t("entity.vehicles.messages.delete.prompt"),
          ok: this.$t("action.submit"),
          cancel: this.$t("action.cancel"),
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
        this.currentTab = this.vehicles.length - 1;
      }
    },
    watch: {
      getVehicles: {
        deep: true,
        handler () {
          this.cloneData();
        }
      }
    }
  };
</script>
