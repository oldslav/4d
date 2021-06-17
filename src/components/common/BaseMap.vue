<template lang="pug">
  vc-viewer
    vc-layer-imagery
      vc-provider-imagery-openstreetmap(:url="mapUrl")
      vc-datasource-geojson(
        @ready="onDatasourceReady"
        :show="show"
        :options="options"
        ref="ds"
        :data="data"
        @click="clicked"
        :entities="entities"
      )
</template>

<script>
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
        geoJson: null
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
      onDatasourceReady ({ viewer, cesiumObject }) {
        viewer.zoomTo(cesiumObject);
      },

      clicked (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };
</script>

<style lang="stylus" scoped>
</style>
