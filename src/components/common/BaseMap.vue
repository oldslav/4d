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
            ref="ds"
            :data="fakeData"
            :show="show"
            :entities="entities"
            @ready="onDatasourceReady"
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
    MapLegalAgreement.z-fab.absolute-bottom-right.text-right(:style="{maxWidth: '50%'}")
</template>

<script>
  import render from "../../cesium/render";
  import { get } from "lodash";
  import { mapMutations, mapState } from "vuex";
  import { toDegrees } from "../../util/map";
  import { SET_CESIUM, SET_FEATURE_ID } from "../../store/constants/mutation-constants";
  import MapLegalAgreement from "components/common/MapLegalAgreement";

  const FAKE_GEOJSON_DATA = { "type": "FeatureCollection", "features": [] };

  export default {
    name: "BaseMap",
    components: { MapLegalAgreement },
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
        cesiumInstance: null,
        fakeData: FAKE_GEOJSON_DATA
      };
    },
    computed: {
      ...mapState("services", {
        pointCoords: state => state.pointCoords,
        isDraw: state => state.isDraw,
        pickedFeatureId: state => state.pickedFeatureId,
        clustering: state => state.clustering
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

        cesiumInstance.viewer.scene.fxaa = false;
        cesiumInstance.viewer.resolutionScale = window.devicePixelRatio;

        document.getElementById("cesiumContainer").style.width = "";
        document.getElementById("cesiumContainer").style.height = "";

        this.$root.map = { componentInstance: this, cesiumInstance };

        this.$watch("getPickedFeatureId", this.onChangePickedFeatureId);
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
        const { datasource } = this.$refs.ds;
        this.isLoading = false;

        datasource.clustering.pixelRange = 100;
        datasource.clustering.minimumClusterSize = 5;

        this.$watch("clustering", this.onUpdateClustering, { immediate: true });
        this.$watch("data", this.onUpdateData, { immediate: true });
        this.$emit("onDatasourceReady", vcViewer);
      },

      onUpdateClustering (val) {
        const { datasource } = this.$refs.ds;
        datasource.clustering.enabled = !!val;
      },

      entitySelected (e) {
        this.$emit("change", e);
      },

      onUpdateData () {
        const { datasource, cesiumObject, viewer } = this.$refs.ds;
        const dataType = get(this.data, "type", null);
        const data = dataType === "geoJson" ? this.data.data : FAKE_GEOJSON_DATA;

        datasource.load(data).then((ds) => {
          render(ds.entities.values);
          viewer.zoomTo(cesiumObject);
        });
      },

      onChangePickedFeatureId (val) {
        if (val === null) {
          this.$refs.vcViewer.viewer.selectedEntity = null;
        }
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
