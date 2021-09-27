<template lang="pug">
</template>

<script>
  import { mapMutations, mapActions, mapState } from "vuex";
  import { GET_LIGHT_GEO, GET_LIGHT } from "../../store/constants/action-constants";
  import { SET_CLUSTERING, SET_FEATURE_ID, SET_LIGHT } from "../../store/constants/mutation-constants";

  export default {
    name: "ServiceLight",
    // async preFetch ({ store }) {
    //   await store.dispatch(`services/${ GET_TREES_GEO }`);
    //   store.commit(`services/${ SET_CLUSTERING }`, true);
    // },
    async created () {
      await this.GET_LIGHT_GEO();
      this.SET_CLUSTERING(true);
    },
    computed: {
      ...mapState("services", {
        cesiumInstance: state => state.cesiumInstance,
        geoJson: state => state.geoJson,
        pickedFeatureId: state => state.pickedFeatureId
      })
    },
    methods: {
      ...mapActions("services", [
        GET_LIGHT_GEO
      ]),

      ...mapActions("services/light", [
        GET_LIGHT
      ]),

      ...mapMutations("services", [
        SET_FEATURE_ID,
        SET_CLUSTERING
      ]),

      ...mapMutations("services/light", [
        SET_LIGHT
      ]),

      onViewerReady (vcViewer = this.componentInstance.$refs.vcViewer) {
        vcViewer.viewer.scene.mode = Cesium.SceneMode.SCENE2D;
      }
    //
    // onMapMove (vcViewer) {
    //   const coordinates = this.getLeftTopRightDownCoordinates(vcViewer);
    //   this.GET_TREES_GEO(coordinates);
    // },
    //
    // getLeftTopRightDownCoordinates (vcViewer) {
    //   const Cesium = vcViewer.Cesium;
    //   const viewer = vcViewer.viewer;
    //   const canvas = viewer.scene.canvas;
    //   const ellipsoid = vcViewer.viewer.scene.globe.ellipsoid;
    //   let c2 = new Cesium.Cartesian2(0, canvas.clientHeight);
    //   let leftBottom = viewer.camera.pickEllipsoid(c2, ellipsoid);
    //   c2 = new Cesium.Cartesian2(canvas.clientWidth, 0);
    //   let rightUpper = viewer.camera.pickEllipsoid(c2, ellipsoid);
    //
    //   viewer.entities.add({
    //     name: "leftBottom",
    //     position: leftBottom,
    //     point: {
    //       pixelSize: 5,
    //       color: Cesium.Color.RED
    //     },
    //     label: {
    //       text: "leftBottom",
    //       font : "14pt monospace"
    //     }
    //   });
    //   viewer.entities.add({
    //     name: "rightUpper",
    //     position: rightUpper,
    //     point: {
    //       pixelSize: 5,
    //       color: Cesium.Color.WHITE
    //     },
    //     label: {
    //       text: "rightUpper",
    //       font : "14pt monospace"
    //     }
    //   });
    //
    //   if (leftBottom != null && rightUpper != null) {
    //     return {
    //       bbox: {
    //         leftBottom: {
    //           x: leftBottom.x,
    //           y: leftBottom.y
    //         },
    //         rightUpper: {
    //           x: rightUpper.x,
    //           y: rightUpper.y
    //         }
    //       }
    //     };
    // leftTop = ellipsoid.cartesianToCartographic(leftTop);
    // rightDown = ellipsoid.cartesianToCartographic(rightDown);
    // console.log(leftTop.longitude, rightDown.latitude, rightDown.longitude, leftTop.latitude);
    // return {
    //   bbox: {
    //     leftBottom: {
    //       x: rightDown.latitude,
    //       y: rightDown.longitude
    //     },
    //     rightUpper: {
    //       x: leftTop.latitude,
    //       y: leftTop.longitude
    //     }
    //   }
    // };
    //   } else {
    //     return null;
    //   }
    // }
    },
    watch: {
      cesiumInstance: {
        immediate: true,
        handler (value) {
          if (value) {
            this.componentInstance = this.$root.map.componentInstance;
            this.onViewerReady();
          }
        }
      },

      pickedFeatureId (v) {
        if (v) {
          this.GET_TREE(v);
        } else {
          this.SET_TREE(null);
        }
      }
    }
  };
</script>

<style scoped>

</style>
