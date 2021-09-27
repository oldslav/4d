<template lang="pug">
  div.map-buildings
    base-cesium-tooltip
      template(slot-scope="{ entity }")
        div.text-subtitle1.row
          div.col.q-pr-md {{ entity.properties.name }}
          div.col-auto.text-grey-7 ID {{ entity.id }}
    router-view
</template>

<script>
  import { mapGetters } from "vuex";
  import { FETCH_BUILDINGS_MENU } from "../../../store/constants/action-constants";
  import BaseCesiumTooltip from "../../../components/common/BaseCesiumTooltip";
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "MapBuildings",
    components: { BaseCesiumTooltip },
    async preFetch ({ store }) {
      await store.dispatch(`maps/buildings/${ FETCH_BUILDINGS_MENU }`);
      store.commit(`services/${ SET_GEODATA }`, null);
    },
    mounted () {
      this.$watch("getPickedFeatureId", this.onChangeTargetEntity);
    },
    computed: {
      ...mapGetters("services", ["getPickedFeatureId", "pickedFeature", "getCesium"])
    },
    methods: {
      onChangeTargetEntity () {
        if (this.pickedFeature) {
          this.$router.push({
            name: "map-buildings-item",
            params: { layer: this.pickedFeature.properties.layer, id: this.pickedFeature.id }
          });
        }
      }
    }
  };
</script>

<style lang="stylus">
.map-buildings
  position relative
</style>
