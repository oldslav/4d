<template lang="pug">
  div.map-transport
    base-cesium-tooltip
      template(slot-scope="{ entity }")
        div.text-subtitle1.row
          div.col.q-pr-md {{ entity.properties.name }}
          div.col-auto.text-grey-7 ID {{ entity.properties.id }}
    router-view
</template>

<script>
  import { mapGetters } from "vuex";
  import {
    FETCH_TRANSPORT_MENU,
    FETCH_TRANSPORT_SECTION_GEOJSON
  } from "../../../store/constants/action-constants";
  import { SET_CLUSTERING, SET_GEODATA } from "../../../store/constants/mutation-constants";

  import BaseCesiumTooltip from "../../../components/common/BaseCesiumTooltip";

  export default {
    name: "MapTransport",
    components: { BaseCesiumTooltip },
    async preFetch ({ store, currentRoute }) {
      await store.dispatch(`maps/transport/${ FETCH_TRANSPORT_MENU }`);
      store.commit(`services/${ SET_GEODATA }`, null);

      const sectionId = parseInt(currentRoute.query.section, 10);
      const menu = store.getters["maps/transport/getMenu"];

      const section = menu.subSections.find(x => x.id === sectionId);

      if (section) {
        await store.dispatch(`maps/transport/${ FETCH_TRANSPORT_SECTION_GEOJSON }`, section.id);
      }
    },
    mounted () {
      this.$watch("getPickedFeatureId", this.onChangeTargetEntity);
      this.$store.commit(`services/${ SET_CLUSTERING }`, false);
    },
    computed: {
      ...mapGetters("services", ["getPickedFeatureId", "pickedFeature", "getCesium"])
    },
    methods: {
      onChangeTargetEntity () {
        if (this.pickedFeature) {
          const { layer, id } = this.pickedFeature.properties;
          const params = this.$route.params;

          if (String(layer) !== params.layer || String(id) !== params.id) {
            this.$router.push({
              name: "map-transport-item",
              params: { layer, id }
            });
          }
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit(`services/${ SET_GEODATA }`, null);
      this.$store.commit(`services/${ SET_CLUSTERING }`, true);
      next();
    }
  };
</script>

<style lang="stylus">
.map-transport
  position relative
</style>
