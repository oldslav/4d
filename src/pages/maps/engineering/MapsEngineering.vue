<template lang="pug">
  div.relative-position
    base-cesium-tooltip
      template(slot-scope="{ entity }")
        div.text-subtitle1.row
          div.col.q-pr-md {{ entity.properties.name }}
          div.col-auto.text-grey-7 ID {{ entity.properties.id }}

    router-view
</template>
<script>
  import { mapGetters } from "vuex";
  import { FETCH_ENGINEERING_MENU, FETCH_ENGINEERING_SECTION_GEOJSON } from "../../../store/constants/action-constants";
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";
  import BaseCesiumTooltip from "../../../components/common/BaseCesiumTooltip";

  export default {
    name: "MapsEngineering",
    components: { BaseCesiumTooltip },
    async preFetch ({ store, currentRoute, redirect }) {
      if (!store.getters.isUserGIS){
        return redirect({ name:"map" });
      }

      await store.dispatch(`maps/engineering/${ FETCH_ENGINEERING_MENU }`);
      store.commit(`services/${ SET_GEODATA }`, null);

      const sectionId = parseInt(currentRoute.query.section, 10);
      const menu = store.getters["maps/engineering/getMenu"];

      const section = menu.subSections.find(x => x.id === sectionId);

      if (section) {
        await store.dispatch(`maps/engineering/${ FETCH_ENGINEERING_SECTION_GEOJSON }`, section.id);
      }
    },
    mounted () {
      this.$watch("getPickedFeatureId", this.onChangeTargetEntity);
    },
    computed: {
      ...mapGetters("services", ["getPickedFeatureId", "pickedFeature"])
    },
    methods: {
      onChangeTargetEntity () {
        if (this.pickedFeature) {
          this.$router.push({
            name: "map-engineering-item",
            params: { layer: this.pickedFeature.properties.layer, id: this.pickedFeature.id }
          });
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit(`services/${ SET_GEODATA }`, null);
      next();
    }
  };
</script>
