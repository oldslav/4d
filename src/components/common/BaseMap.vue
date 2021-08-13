<template lang="pug">
  div.cesiumWrapper
    q-no-ssr
      vc-viewer(
        ref="vcViewer"
        :infoBox="false"
        :selection-indicator="false"
        @selectedEntityChanged="entitySelected"
        @ready="onReadyViewer"
        @moveEnd="onMapMove"
      )
        vc-collection-primitive-point
          vc-primitive-point(
            :position="{lng: 0.8506354517838196,lat: 0.9730865316507832,height: 500.3186645507812}"
            :color="colorPoint"
            :pixelSize="100"
          )
          vc-primitive-point(
            :position="{lng: 0.8507519060296136,lat: 0.9730217475167465,height: 500.3186645507812}"
            :color="colorPoint"
            :pixelSize="100"
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
      //- q-inner-loading(:showing="isLoading")
</template>

<script>
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
        position1: {
          lng: 0.8506354517838196,
          lat: 0.9730865316507832,
          height: 1000.3186645507812
        },
        position2: {
          lng: 0.8507519060296136,
          lat: 0.9730217475167465,
          height: 1000.3186645507812
        },
        colorPoint: {},
        show: true,
        options: {},
        entities: [],
        geoJson: null,
        isLoading: true
      };
    },
    computed: {
      mapUrl () {
        return this.$q.dark.isActive
          ? "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png";
      }
    },
    methods: {
      onReadyViewer () {
        document.getElementById("cesiumContainer").style.width = "";
        document.getElementById("cesiumContainer").style.height = "";
        this.colorPoint = this.$refs.vcViewer.Cesium.Color.fromCssColorString("rgb(255,229,0)");
      },

      async onDatasourceReady ({ viewer, cesiumObject }) {
        await viewer.zoomTo(cesiumObject);
        this.isLoading = false;
      },

      entitySelected (e) {
        this.$emit("change", e);
      },
      
      onMapMove () {
        this.$emit("on-map-move", this.$refs.vcViewer);
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
