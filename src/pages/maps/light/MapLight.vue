<template lang="pug">
  div.relative-position
    base-cesium-tooltip
      template(slot-scope="{ entity }")
        div.text-subtitle1.row
          div.col.q-pr-md {{ entity.properties.name }}
          div.col-auto.text-grey-7 ID {{ entity.id }}
</template>
<script>
  import BaseCesiumTooltip from "../../../components/common/BaseCesiumTooltip";
  import { FETCH_LIGHT_MENU, FETCH_LIGHT_SECTION_GEOJSON } from "../../../store/constants/action-constants";
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "MapLight",
    components: { BaseCesiumTooltip },
    async preFetch ({ store }) {
      await store.dispatch(`maps/light/${ FETCH_LIGHT_MENU }`);
      const menu = store.getters["maps/light/getMenu"];

      if (menu.subSections.length === 1) {
        await store.dispatch(`maps/light/${ FETCH_LIGHT_SECTION_GEOJSON }`, menu.subSections[0].id);
      }
    },
    beforeRouteLeave (to, from, next){
      this.$store.commit(`services/${ SET_GEODATA }`, null);
      next();
    }
  };
</script>
