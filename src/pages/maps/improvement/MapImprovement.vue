<template lang="pug">
  div.relative-position
    base-cesium-tooltip
      template(slot-scope="{ entity }")
        div.text-subtitle1.row
          div.col.q-pr-md {{ entity.properties.name }}
          div.col-auto.text-grey-7 ID {{ entity.properties.id }}
</template>
<script>
  import BaseCesiumTooltip from "../../../components/common/BaseCesiumTooltip";
  import { FETCH_IMPROVEMENT_MENU, FETCH_IMPROVEMENT_SECTION_GEOJSON } from "../../../store/constants/action-constants";
  import { SET_GEODATA, SET_MAP_SCENE } from "../../../store/constants/mutation-constants";
  import { CesiumScenes } from "../../../constaints";

  export default {
    name: "MapImprovement",
    components: { BaseCesiumTooltip },
    async preFetch ({ store }) {
      await store.dispatch(`maps/improvement/${ FETCH_IMPROVEMENT_MENU }`);
      const menu = store.getters["maps/improvement/getMenu"];

      if (menu.subSections.length === 1) {
        await store.dispatch(`maps/improvement/${ FETCH_IMPROVEMENT_SECTION_GEOJSON }`, menu.subSections[0].id);
      }
    },
    mounted () {
      this.$store.commit(`services/${ SET_MAP_SCENE }`, CesiumScenes["2d"]);
    },
    beforeRouteLeave (to, from, next){
      this.$store.commit(`services/${ SET_GEODATA }`, null);
      this.$store.commit(`services/${ SET_MAP_SCENE }`, null);
      next();
    }
  };
</script>
