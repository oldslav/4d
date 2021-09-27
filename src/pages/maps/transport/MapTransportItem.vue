<template lang="pug">
  div
</template>

<script>
  import { mapActions } from "vuex";
  import {
    FETCH_TRANSPORT_ITEM,
    FETCH_TRANSPORT_SECTION_GEOJSON, REMOVE_ACTIVE_TRANSPORT_ITEM,
    SET_ACTIVE_TRANSPORT_ITEM
  } from "../../../store/constants/action-constants";
  import { SET_FEATURE_ID } from "../../../store/constants/mutation-constants";

  export default {
    name: "MapTransportItem",
    async preFetch ({ store, currentRoute, redirect }) {
      const layerId = parseInt(currentRoute.params.layer, 10);
      const layer = store.getters["maps/transport/getLayerById"](layerId);

      if (!layer) {
        return redirect("/404");
      }

      const section = store.getters["maps/transport/getSectionByLayerId"](layer.id);

      if (!section) {
        return redirect("/404");
      }

      await Promise.all([
        store.dispatch(`maps/transport/${ FETCH_TRANSPORT_SECTION_GEOJSON }`, section.id),
        store.dispatch(`maps/transport/${ FETCH_TRANSPORT_ITEM }`, {
          layerId: layer.id,
          id: currentRoute.params.id
        })
      ]);

      const featureId = `${ layer.id }-${ currentRoute.params.id }`;

      store.commit(`services/${ SET_FEATURE_ID }`, featureId);
      store.dispatch(`maps/transport/${ SET_ACTIVE_TRANSPORT_ITEM }`, featureId);
    },

    methods: {
      ...mapActions("maps/transport", {
        removeActiveTransport: REMOVE_ACTIVE_TRANSPORT_ITEM
      })
    },
    beforeRouteLeave (to, from, next){
      this.removeActiveTransport();
      next();
    }
  };
</script>

<style scoped>

</style>
