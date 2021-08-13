<template lang="pug">
  div
    BaseMap(
      :data="geoJson"
      @change="onMapClick"
      @on-map-move="onMapMove"
    )
    router-view
</template>

<script>
  import { mapMutations, mapActions, mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";
  import { GET_TREES_GEO } from "../../store/constants/action-constants";
  import { SET_FEATURE_ID } from "../../store/constants/mutation-constants";

  export default {
    name: "ServiceTrees",
    components: { BaseMap },
    async created () {
      // await this.GET_TREES_GEO();
    },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson
      })
    },
    methods: {
      ...mapActions("services", [
        GET_TREES_GEO
      ]),

      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      onMapClick (e) {
        if (e && e._properties._fill._value !== "#FF6565") {
          this.SET_FEATURE_ID(e.id);
        } else {
          this.SET_FEATURE_ID(null);
        }
      },

      onMapMove (vcViewer) {
        const coordinates = this.getLeftTopRightDownCoordinates(vcViewer);
        // this.GET_TREES_GEO(coordinates);
      },

      getLeftTopRightDownCoordinates (vcViewer) {
        debugger;
        const Cesium = vcViewer.Cesium;
        const viewer = vcViewer.viewer;
        const ellipsoid = vcViewer.viewer.scene.globe.ellipsoid;
        let c2 = new Cesium.Cartesian2(0, 0);
        let leftTop = viewer.camera.pickEllipsoid(c2, ellipsoid);
        c2 = new Cesium.Cartesian2(viewer.canvas.width, viewer.canvas.height);
        let rightDown = viewer.camera.pickEllipsoid(c2, ellipsoid);
        console.log(leftTop, rightDown);

        if (leftTop != null && rightDown != null) {
          leftTop = ellipsoid.cartesianToCartographic(leftTop);
          rightDown = ellipsoid.cartesianToCartographic(rightDown);
          console.log(leftTop.longitude, rightDown.latitude, rightDown.longitude, leftTop.latitude);
          return {
            bbox: {
              leftBottom: {
                x: rightDown.latitude,
                y: rightDown.longitude
              },
              rightUpper: {
                x: leftTop.latitude,
                y: leftTop.longitude
              }
            }
          };
        } else {
          //The sky is visible in 3D
          console.log("sky");
          return null;
        }
      }
    }
  };
</script>

<style scoped>

</style>
