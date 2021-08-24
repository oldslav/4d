<template lang="pug">
  div.cesiumWrapper
    q-no-ssr
      vc-viewer(
        ref="vcViewer"
        :infoBox="false"
        :selection-indicator="false"
        @selectedEntityChanged="entitySelected"
        @ready="onReadyViewer"
      )
        vc-layer-imagery
          vc-provider-imagery-openstreetmap(:url="mapUrl")
          vc-datasource-geojson(
            v-if="data && data.type === 'geoJson'"
            @ready="onDatasourceReady"
            :show="show"
            ref="ds"
            :data="data.data"
            :entities="entities"
          )
        vc-handler-draw-point(
          v-show="isDraw"
          ref="handlerPoint"
          @activeEvt="activeEvt"
          @drawEvt="drawPoint"
          :pointPixelSize="16"
          :showDrawTip="false"
        )
        vc-collection-primitive-point(
          v-if="data && data.type === 'pointPrimitive'"
          :points="data.data"
          @click="pointClicked"
          @clickout="pointClickedOut"
        )
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import { toDegrees } from "../../util/map";
  import { SET_CESIUM, SET_FEATURE_ID } from "../../store/constants/mutation-constants";

  export default {
    name: "BaseMap",
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        show: true,
        options: {},
        entities: [],
        geoJson: null,
        cesiumInstance: null
      };
    },
    computed: {
      ...mapState("services", {
        pointCoords: state => state.pointCoords,
        isDraw: state => state.isDraw,
        pickedFeatureId: state => state.pickedFeatureId
      }),

      mapUrl () {
        return this.$q.dark.isActive
          ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_CESIUM,
        SET_FEATURE_ID
      ]),

      pointClicked ({ pickedFeature }) {
        if (pickedFeature.id !== this.pickedFeatureId) {
          pickedFeature.primitive.pixelSize = pickedFeature.primitive.pixelSize + 5;
          this.entitySelected(pickedFeature);
        }
      },

      pointClickedOut ({ pickedFeature }) {
        pickedFeature.primitive.pixelSize = pickedFeature.primitive.pixelSize - 5;
        this.entitySelected(null);
      },

      onReadyViewer (cesiumInstance) {
        const { Cartesian3, Cartographic, Color, Math, NearFarScalar, HeightReference, SceneMode } = cesiumInstance.Cesium;
        this.SET_CESIUM({ Cartesian3, Cartographic, Color, Math, NearFarScalar, HeightReference, SceneMode });

        this.cesiumInstance = cesiumInstance;

        const innoCoords = new Cesium.Cartesian3(2372526, 2704780, 5248000);

        cesiumInstance.viewer.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(...toDegrees(Cesium, innoCoords), 1000),
          orientation: {
            pitch: Cesium.Math.toRadians(-55)
          },
          maximumHeight: 5000
        });

        document.getElementById("cesiumContainer").style.width = "";
        document.getElementById("cesiumContainer").style.height = "";

        this.$root.map = {
          componentInstance: this,
          cesiumInstance
        };
      },

      activeEvt (_) {
        this[_.type] = _.isActive;
      },

      drawPoint (result) {
        this.toggle("handlerPoint");

        const [x, y] = toDegrees(this.cesiumInstance.Cesium, result.polyline.positions[0]);
        this.$emit("pointCreated", {
          x,
          y
        });
      },

      toggle (type) {
        this.$refs[type].drawing = !this.$refs[type].drawing;
      },

      onDatasourceReady (vcViewer) {
        this.isLoading = false;
        this.$emit("onDatasourceReady", vcViewer);
        this.$refs.ds.datasource.clustering.enabled = true;
        this.$refs.ds.datasource.clustering.pixelRange = 100;
        this.$refs.ds.datasource.clustering.minimumClusterSize = 5;
      },

      entitySelected (e) {
        this.$emit("change", e);
      }
    },
    watch: {
      pointCoords (val) {
        if (!val) {
          this.$refs.handlerPoint.clear();
        }
      },

      isDraw (val) {
        switch (val) {
          case "pointPrimitive":
            this.cesiumInstance.viewer.scene.globe.depthTestAgainstTerrain = true;
            this.toggle("handlerPoint");
            break;
          case null:
            this.cesiumInstance.viewer.scene.globe.depthTestAgainstTerrain = false;
            break;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
.cesiumWrapper
  #cesiumContainer
    display: block;
    position: absolute;
    top: 50px;
    left: 400px;
    border: none;
    width: calc(100% - 400px);
    height: calc(100% - 50px);

    @media (max-width: $breakpoint-sm-min)
      top: 0;
      bottom: 50px;
      left: 0;
      width: 100%;
      height: calc(100% - 50px);
</style>
