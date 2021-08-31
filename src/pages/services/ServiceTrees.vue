<template lang="pug">
  div
    BaseMap(
      @change="onMapClick"
      @onViewerReady="onViewerReady"
    )
    router-view
</template>

<script>
  import { mapMutations, mapActions, mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";
  import { GET_TREES_GEO, GET_TREE } from "../../store/constants/action-constants";
  import { SET_FEATURE_ID, SET_TREE } from "../../store/constants/mutation-constants";

  export default {
    name: "ServiceTrees",
    components: { BaseMap },
    async created () {
      await this.GET_TREES_GEO();
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

      ...mapActions("services/trees", [
        GET_TREE
      ]),

      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      ...mapMutations("services/trees", [
        SET_TREE
      ]),

      onMapClick (e) {
        if (e && e._properties._fill._value !== "#FF6565") {
          this.GET_TREE(e.id);
        } else {
          this.SET_TREE(null);
        }
      },

      onViewerReady (vcViewer) {
        vcViewer.viewer.scene.mode = Cesium.SceneMode.SCENE2D;

        const options = {
          camera: vcViewer.viewer.scene.camera,
          canvas: vcViewer.viewer.scene.canvas
        };

        const dsPromise = vcViewer.dataSources.add(
          vcViewer.Cesium.GeoJsonDataSource.load(
            this.geoJson,
            options
          )
        );

        dsPromise.then(function (dataSource) {
          dataSource.clustering.enabled = true;
          dataSource.clustering.pixelRange = 100;
          dataSource.clustering.minimumClusterSize = 5;
        });
      }

      // onMapMove (vcViewer) {
      //   const coordinates = this.getLeftTopRightDownCoordinates(vcViewer);
      //   this.GET_TREES_GEO(coordinates);
      //   const options = {
      //     camera: vcViewer.viewer.scene.camera,
      //     canvas: vcViewer.viewer.scene.canvas
      //   };
      //   const dsPromise = vcViewer.dataSources.add(
      //     vcViewer.Cesium.GeoJsonDataSource.load(
      //       this.geoJson,
      //       options
      //     )
      //   );
      //   dsPromise.then(function (dataSource) {
      //     dataSource.clustering.enabled = true;
      //     dataSource.clustering.pixelRange = 100;
      //     dataSource.clustering.minimumClusterSize = 5;
      //   });
      // }

      // getLeftTopRightDownCoordinates (vcViewer) {
      //   const Cesium = vcViewer.Cesium;
      //   const viewer = vcViewer.viewer;
      //   const canvas = viewer.scene.canvas;
      //   const ellipsoid = vcViewer.viewer.scene.globe.ellipsoid;
      //   let c2 = new Cesium.Cartesian2(0, canvas.clientHeight);
      //   let leftBottom = viewer.camera.pickEllipsoid(c2, ellipsoid);
      //   c2 = new Cesium.Cartesian2(canvas.clientWidth, 0);
      //   let rightUpper = viewer.camera.pickEllipsoid(c2, ellipsoid);
      //   console.log(leftBottom, rightUpper);
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
    }
  };
</script>

<style scoped>

</style>
