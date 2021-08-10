<template lang="pug">
  div
    div(v-if="!!model")
      div.text-right.q-mb-sm
        q-btn(flat icon="o_edit" :color="editing ? `grey` : `primary`" @click.stop="edit()").q-mr-sm
        q-btn(flat icon="o_delete" color="primary" @click.stop="removeVehicle()")
      VehicleForm(v-model="model" :backup="model" :readonly="!editing" :existing="!!model.id" @input="onInput()")
    q-btn-dropdown(
      v-else
      flat
      color="primary"
      :label="$t('entity.vehicles.add')"
      icon="add"
      menu-anchor="bottom left"
      menu-self="top start"
    ).full-width
      q-list
        q-item(
          v-for="(vehicle, index) in getVehicles"
          :key="index"
          clickable
          v-close-popup
          @click="pickExistingVehicle(vehicle)"
        )
          q-item-section
            | {{ `${vehicle.brand.name} ${vehicle.model.name}` }}
        q-item(clickable @click="addNewVehicle()")
          q-item-section
            | {{ $t("entity.vehicles.add") }}
</template>

<script>
  import { cloneDeep } from "lodash";
  import { mapGetters } from "vuex";
  import VehicleForm from "components/forms/documents/VehicleForm";

  const defaultVehicle = () => ({
    type: null,
    brand: null,
    model: null,
    number: null,
    documents: {
      sts: []
    }
  });

  export default {
    name: "TicketVehicle",
    components: { VehicleForm },
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        model: null,
        editing: false
      };
    },
    computed: {
      ...mapGetters("user/vehicles", ["getVehicles"])
    },
    methods: {
      onInput () {
        this.$emit("input", this.model);
      },
      edit () {
        this.editing = !this.editing;
      },
      pickExistingVehicle (vehicle) {
        this.model = cloneDeep(vehicle);
        this.onInput();
      },
      addNewVehicle () {
        this.model = defaultVehicle();
        this.onInput();
        this.editing = true;
      },
      removeVehicle () {
        this.model = null;
      }
    }
  };
</script>
