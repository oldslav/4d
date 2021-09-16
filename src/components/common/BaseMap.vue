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
          ref="pointPrimitiveCollection"
          v-if="data && data.type === 'pointPrimitive'"
          :points="data.data"
        )
    MapLegalAgreement.z-fab.absolute-bottom-right.text-right(:style="{maxWidth: '50%'}")
</template>

<script>
  import render from "../../cesium/render";
  import { get } from "lodash";
  import { mapMutations, mapState } from "vuex";
  import { toDegrees } from "../../util/map";
  import { createClusterMarkers } from "../../cesium/utils/cluster-markers";
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
          let coords;
          if (pickedFeature.primitive) {
            pickedFeature.primitive.pixelSize += 5;
            coords = pickedFeature.primitive._actualPosition;
          } else {
            pickedFeature.pixelSize += 5;
            coords = pickedFeature._actualPosition;
          }

          this.entitySelected(pickedFeature);
          this.flyTo({ coords });
        }
      },

      pointClickedOut ({ pickedFeature }) {
        if (pickedFeature.primitive) {
          pickedFeature.primitive.pixelSize -= 5;
        } else {
          pickedFeature.pixelSize -= 5;
        }

        this.entitySelected(null);
      },

      flyTo ({ cesiumInstance = this.cesiumInstance, coords }) {
        cesiumInstance.viewer.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(...toDegrees(Cesium, { ...coords }), 1000),
          maximumHeight: 5000
        });
      },

      onReadyViewer (cesiumInstance) {
        const vcViewer = this.$refs.vcViewer;
        const { Cartesian3, Cartographic, Color, Math, NearFarScalar, HeightReference, SceneMode } = cesiumInstance.Cesium;

        this.cesiumInstance = cesiumInstance;
        this.$root.map = { componentInstance: this, cesiumInstance };

        this.SET_CESIUM({
          Cartesian3,
          Cartographic,
          Color,
          Math,
          NearFarScalar,
          HeightReference,
          SceneMode
        });

        const innoCoords = new Cesium.Cartesian3(2372526, 2704780, 5248000);

        this.flyTo({ coords: innoCoords });

        cesiumInstance.viewer.scene.requestRenderMode = true;
        cesiumInstance.viewer.scene.skyBox.show = false;
        cesiumInstance.viewer.scene.fxaa = false;
        cesiumInstance.viewer.resolutionScale = window.devicePixelRatio;

        document.getElementById("cesiumContainer").style.width = "";
        document.getElementById("cesiumContainer").style.height = "";

        this.$emit("onViewerReady", vcViewer);
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
        datasource.clustering.minimumClusterSize = 10;

        this.createClustering(datasource);

        this.$watch("clustering", this.onUpdateClustering, { immediate: true });
        this.$watch("data", this.onUpdateData, { immediate: true });
        this.$watch("pickedFeatureId", this.onChangePickedFeatureId, { immediate: true });
        this.$emit("onDatasourceReady", vcViewer);
      },

      async createClustering (dataSource) {
        const markers = await createClusterMarkers({ isDark: this.$q.dark.isActive });
        const sizes = Object.keys(markers)
          .map(x => parseInt(x, 10))
          .sort((a, b) => b - a);

        dataSource.clustering.clusterEvent.addEventListener(
          function (clusteredEntities, cluster) {
            cluster.label.show = false;
            cluster.billboard.show = true;
            cluster.billboard.id = cluster.label.id;
            cluster.billboard.size = 1;

            for (const size of sizes) {
              if (clusteredEntities.length >= size) {
                const marker = markers[size];
                cluster.billboard.width = marker.width;
                cluster.billboard.height = marker.height;
                cluster.billboard.image = marker.render(String(size));
                break;
              }
            }
          }
        );
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
          for (let i = 0; i < ds.entities.values.length; i++) {
            let entity = ds.entities.values[i];
            Object.assign(entity.billboard || {}, entity.properties);
          }

          render(ds.entities.values);

          const pickedId = this.$route.query.id;

          if (pickedId) {
            this.entitySelected(cesiumObject.entities.values.find(i => +i.id === +pickedId));
          } else {
            viewer.zoomTo(cesiumObject);
          }
        });
      },

      onChangePickedFeatureId (val) {
        const { datasource, viewer } = this.$refs.ds;

        if (val === null) {
          viewer.selectedEntity = null;
        } else {
          const entity = datasource.entities.getById(val);
          if (entity) {
            viewer.flyTo(entity,{
              offset: new Cesium.HeadingPitchRange(
                viewer.camera.heading,
                viewer.camera.pitch,
                800.0
              )
            });
          }
          viewer.selectedEntity = entity;
        }
      }
    },
    watch: {
      // data: {
      //   immediate: true,
      //   deep: true,
      //   handler (data) {
      //     if (this.$route.query.id && data) {
      //       (() => {
      //         const self = this;
      //         return new Promise(function (resolve) {
      //           (function waitForFoo () {
      //             if (self.$refs.pointPrimitiveCollection && self.$root.map) return resolve();
      //             setTimeout(waitForFoo, 30);
      //           })();
      //         });
      //       })().then(() => {
      //         const pickedFeature = this.$refs.pointPrimitiveCollection.cesiumObject._pointPrimitives.find(i => i.id === +this.$route.query.id);
      //         this.pointClicked({ pickedFeature });
      //       });
      //     }
      //   }
      // },
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

      // onMapMove () {
      //   this.$emit("on-map-move", this.$refs.vcViewer);
      // }
    },
    destroyed () {
      this.SET_CESIUM(null);
      this.$root.map = null;
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
