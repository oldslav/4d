<template lang="pug">
  div
    BaseMap(
      v-if="isMap"
      ref="mapComponent"
      :data="isSimple ? null : geoJson"
      @change="onMapClick"
      @pointCreated="onPointCreate"
      @onViewerReady="onViewerReady"
    )
    q-inner-loading(:showing="isLoading")
    router-view(v-bind="{ map }")
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";
  import { SET_FEATURE_ID, SET_POINT_COORDS } from "../../store/constants/mutation-constants";
  import {
    GET_APARTMENTS_GEO,
    GET_COMMERCE_GEO,
    GET_IDEAS_GEO,
    GET_PARKING_GEO
  } from "../../store/constants/action-constants";

  export default {
    name: "MapsService",
    components: { BaseMap },
    data () {
      return {
        map: null
      };
    },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson
      }),

      isMap () {
        return Boolean(this.$route.meta.map);
      },

      isLoading () {
        return this.$store.state.wait[`services/${ GET_PARKING_GEO }`] ||
          this.$store.state.wait[`services/${ GET_APARTMENTS_GEO }`] ||
          this.$store.state.wait[`services/${ GET_IDEAS_GEO }`] ||
          this.$store.state.wait[`services/${ GET_COMMERCE_GEO }`];
      },

      isSimple () {
        return Boolean(this.$route.meta.isSimple);
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID,
        SET_POINT_COORDS
      ]),

      onViewerReady (vcViewer) {
        this.map = vcViewer;
      },

      onMapClick (e) {
        if (e) {
          this.SET_FEATURE_ID(e.id);
        } else {
          this.SET_FEATURE_ID(null);
        }
      },

      onPointCreate (coords) {
        this.SET_POINT_COORDS(coords);
      }
    }
  };
</script>

<style scoped>

</style>
