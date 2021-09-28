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
  import { FETCH_TERRITORY_MENU } from "../../../store/constants/action-constants";
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "MapTerritory",
    components: { BaseCesiumTooltip },
    preFetch ({ store }) {
      return store.dispatch(`maps/territory/${ FETCH_TERRITORY_MENU }`);
    },
    beforeRouteLeave (to, from, next){
      this.$store.commit(`services/${ SET_GEODATA }`, null);
      next();
    }
  };
</script>
