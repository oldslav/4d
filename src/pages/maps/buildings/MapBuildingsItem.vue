<template lang="pug">
  div
</template>

<script>
  import {
    FETCH_BUILDINGS_SECTION_GEOJSON,
    FETCH_BUILDINGS_BUILDING,
    SET_BUILDINGS_SECTION_GEOJSON,
    SET_ACTIVE_BUILDING,
    REMOVE_ACTIVE_BUILDING
  } from "../../../store/constants/action-constants";
  import { SET_FEATURE_ID } from "../../../store/constants/mutation-constants";
  import { mapActions } from "vuex";

  export default {
    name: "MapBuildingsItem",
    async preFetch ({ store, currentRoute, redirect }) {
      const layerId = parseInt(currentRoute.params.layer, 10);
      const menu = store.getters["maps/buildings/getMenu"];

      let layer = null;
      let section = null;

      for (const _section of menu.subSections) {
        for (const _layer of _section.layers) {
          if (layerId === _layer.id) {
            section = _section;
            layer = _layer;
            break;
          }
        }
      }

      if (!layer || !section) {
        return redirect("/404");
      }

      await Promise.all([
        store.dispatch(`maps/buildings/${ FETCH_BUILDINGS_SECTION_GEOJSON }`, section.id),
        store.dispatch(`maps/buildings/${ FETCH_BUILDINGS_BUILDING }`, {
          layerId: layer.id,
          id: currentRoute.params.id
        })
      ]);

      await store.dispatch(`maps/buildings/${ SET_BUILDINGS_SECTION_GEOJSON }`, section.id);
      await store.dispatch(`maps/buildings/${ SET_ACTIVE_BUILDING }`, currentRoute.params.id);
    },

    mounted () {
      this.$watch("$route.params.id", this.onChangeBuildingId, { immediate: true });
    },

    methods: {
      ...mapActions("maps/buildings", {
        removeActiveBuilding: REMOVE_ACTIVE_BUILDING
      }),
      onChangeBuildingId (val){
        this.$store.commit(`services/${ SET_FEATURE_ID }`, val);
      }
    },
    beforeRouteLeave (to, from, next){
      this.removeActiveBuilding();
      next();
    }
  };
</script>

<style scoped>

</style>
