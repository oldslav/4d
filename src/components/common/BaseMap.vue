<template lang="pug">
  div.cesiumWrapper
    q-no-ssr
      vc-viewer(
        ref="vcViewer"
        :infoBox="false"
        :selection-indicator="false"
        @selectedEntityChanged="entitySelected"
        @ready="onReadyViewer"
        scene3DOnly
      )
        vc-layer-imagery
          vc-provider-imagery-openstreetmap(:url="mapUrl")
          vc-datasource-geojson(
            v-if="data"
            @ready="onDatasourceReady"
            :show="show"
            ref="ds"
            :data="data"
            :entities="entities"
          )
        vc-handler-draw-point(
          v-if="isCreatorPoint"
          ref="handlerPoint"
          @activeEvt="activeEvt"
          @drawEvt="drawPoint"
          :pointPixelSize="16"
          :showDrawTip="false"
        )
      q-btn(
        v-if="isCreatorPoint"
        label="Указать местоположение"
        @click="toggle('handlerPoint')"
      )
      q-inner-loading(:showing="isLoading")
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "BaseMap",
    props: {
      data: {
        type: Object,
        default: null
      }
      // onClick: {
      //   type: Function,
      //   default: () => {}
      // }
    },
    data () {
      return {
        show: true,
        options: {},
        entities: [],
        geoJson: null,
        isLoading: false
      };
    },
    computed: {
      ...mapState("services", {
        pointCoords: state => state.pointCoords
      }),

      mapUrl () {
        return this.$q.dark.isActive
          ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
      },

      isCreatorPoint () {
        return this.$route.meta.creatorPoint;
      }
    },
    methods: {
      onReadyViewer (cesiumInstance) {
        const { viewer } = cesiumInstance;
        this.cesiumInstance = cesiumInstance;
        viewer.scene.globe.depthTestAgainstTerrain = true;

        document.getElementById("cesiumContainer").style.width = "";
        document.getElementById("cesiumContainer").style.height = "";
      },

      activeEvt (_) {
        this[_.type] = _.isActive;
      },

      drawPoint (result) {
        this.toggle("handlerPoint");

        this.$emit("pointCreated", {
          x: result.polyline.positions[0].x,
          y: result.polyline.positions[0].y
        });
      },

      toggle (type) {
        this.$refs[type].drawing = !this.$refs[type].drawing;
      },

      async onDatasourceReady ({ viewer, cesiumObject }) {
        console.log(cesiumObject);
        await viewer.zoomTo(cesiumObject);
        this.isLoading = false;
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
