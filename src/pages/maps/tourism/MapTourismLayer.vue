<template lang="pug">
  div
</template>

<script>
  import { mapGetters } from "vuex";
  import { TourismGeoJSONEntities } from "../../../store/types/tourism";
  import { FETCH_LAYER_GEOJSON, PUT_LAYER_GEOJSON } from "../../../store/constants/action-constants";
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";
  import { preloadGeoJSONImages } from "../../../cesium/utils/preload-images";

  export default {
    name: "MapTourismLayer",
    async preFetch ({ store, redirect, currentRoute }) {
      const categoryId = parseInt(currentRoute.params.category, 10);
      const layerId = parseInt(currentRoute.params.layer, 10);

      const category = store.getters["services/tourism/getServiceMenu"].subSections.find(x => x.id === categoryId);
      const layer = category.layers.find(x => x.id === layerId);

      if (!layer) {
        return redirect("/404");
      }

      const geoJSON = await store.dispatch(`services/tourism/${ FETCH_LAYER_GEOJSON }`, layer.path);
      await store.dispatch(`services/tourism/${ PUT_LAYER_GEOJSON }`, layer.path);

      const features = geoJSON.features.filter(x => x.properties.type !== TourismGeoJSONEntities.stop);

      if (features.length === 1 && currentRoute.name === "map-tourism-layer") {
        return redirect({
          name: "map-tourism-entity",
          params: { category: categoryId, layer: layer.id, id: geoJSON.features[0].id }
        });
      }
    },
    mounted () {
      preloadGeoJSONImages(this.getLayerGeoJSON);
    },
    beforeRouteLeave (to, from, next) {
      const fromParams = from.params;
      const toParams = to.params;

      if (
        to.name !== "map-tourism-entity" ||
        (fromParams.category !== toParams.category || fromParams.layer !== toParams.layer)
      ) {
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
    }
  };
</script>
