<template lang="pug">
  div
</template>
<script>
  import { mapActions } from "vuex";
  import { get } from "lodash";
  import {
    FETCH_ENGINEERING_SECTION_GEOJSON,
    FETCH_ENGINEERING_ITEM,
    REMOVE_ACTIVE_ENGINEERING_ITEM,
    SET_ACTIVE_ENGINEERING_ITEM
  } from "../../../store/constants/action-constants";
  import { SET_FEATURE_ID, SET_MAP_ENTITY_DISTANCE } from "../../../store/constants/mutation-constants";

  const setActiveFeature = (store, featureId) => {
    store.commit(`services/${ SET_FEATURE_ID }`, featureId);
    const entityType = get(store.getters["services/pickedFeature"],"properties.type");

    store.commit(`services/${ SET_MAP_ENTITY_DISTANCE }`, entityType === "pipe" ? 300 : null);
    store.dispatch(`maps/engineering/${ SET_ACTIVE_ENGINEERING_ITEM }`, featureId);
  };

  export default {
    name: "MapsEngineeringItem",
    async preFetch ({ store, currentRoute, redirect }) {
      const layerId = parseInt(currentRoute.params.layer, 10);
      const layer = store.getters["maps/engineering/getLayerById"](layerId);
      const section = store.getters["maps/engineering/getSectionByLayerId"](layerId);

      if (!layer || !section) {
        return redirect("/404");
      }

      await store.dispatch(`maps/engineering/${ FETCH_ENGINEERING_SECTION_GEOJSON }`, section.id);
      setActiveFeature(store, currentRoute.params.id);

      const featureId = currentRoute.params.id.split("_").shift();

      await store.dispatch(`maps/engineering/${ FETCH_ENGINEERING_ITEM }`, {
        layerId: layer.id,
        id: featureId
      });
    },
    methods: {
      ...mapActions("maps/engineering", {
        setActiveItem: SET_ACTIVE_ENGINEERING_ITEM,
        removeActiveItem: REMOVE_ACTIVE_ENGINEERING_ITEM
      })
    },
    beforeRouteLeave (to, from, next) {
      this.removeActiveItem();
      this.$store.commit(`services/${ SET_MAP_ENTITY_DISTANCE }`, null);
      next();
    }
  };
</script>
