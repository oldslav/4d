<template lang="pug">
  div
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    FETCH_LAYER_GEOJSON,
    FETCH_TOURISM_ENTITY,
    REMOVE_ACTIVE_TOURISM_FEATURE,
    SET_ACTIVE_TOURISM_FEATURE,
    PUT_LAYER_GEOJSON
  } from "../../../store/constants/action-constants";
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "MapTourismEntity",
    async preFetch ({ store, currentRoute }) {
      const categoryId = parseInt(currentRoute.params.category, 10);
      const layerId = parseInt(currentRoute.params.layer, 10);
      const category = store.getters["services/tourism/getServiceMenu"].subSections.find(x => x.id === categoryId);
      const layer = category.layers.find(x => x.id === layerId);

      await Promise.all([
        store.dispatch(`services/tourism/${ FETCH_LAYER_GEOJSON }`, layer.path),
        store.dispatch(`services/tourism/${ FETCH_TOURISM_ENTITY }`, {
          path: layer.path,
          id: currentRoute.params.id,
          layerId: layerId
        })
      ]);

      await store.dispatch(`services/tourism/${ PUT_LAYER_GEOJSON }`, layer.path);
      await store.dispatch(
        `services/tourism/${ SET_ACTIVE_TOURISM_FEATURE }`,
        { layer: layer.path, id: currentRoute.params.id }
      );
    },
    beforeRouteLeave (to, from, next) {
      this.removeActiveFeature({ layer: this.getLayer.path, id: this.$route.params.id });

      if (to.name === "map-tourism-category" || to.name === "map-tourism") {
        this.$store.commit(`services/${ SET_GEODATA }`, null);
      }

      next();
    },
    computed: {
      ...mapGetters("services/tourism", ["getServiceMenu", "getLayersGeoJSON"]),
      getLayer () {
        const { params } = this.$route;
        const categoryId = parseInt(params.category, 10);
        const layerId = parseInt(params.layer, 10);
        const category = this.getServiceMenu.subSections.find(x => x.id === categoryId);
        return category.layers.find(x => x.id === layerId);
      },

      getLayerGeoJSON () {
        return this.getLayersGeoJSON[this.getLayer.path];
      }
    },
    methods: {
      ...mapActions("services/tourism", {
        removeActiveFeature: REMOVE_ACTIVE_TOURISM_FEATURE
      })
    }
  };
</script>
