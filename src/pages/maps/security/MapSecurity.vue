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
  import { FETCH_SECURITY_MAP } from "../../../store/constants/action-constants";
  import { SET_CLUSTERING, SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "MapSecurity",
    components: { BaseCesiumTooltip },
    preFetch ({ store, redirect }) {
      const { isUserGIS, isEmployee } = store.getters;

      if (!isUserGIS && !isEmployee) {
        return redirect({ name: "map" });
      }

      return store.dispatch(`maps/security/${ FETCH_SECURITY_MAP }`);
    },
    mounted () {
      this.$store.commit(`services/${ SET_CLUSTERING }`, true);
    },
    beforeRouteLeave (to, from, next){
      this.$store.commit(`services/${ SET_GEODATA }`, null);
      next();
    }
  };
</script>
<style lang="stylus">

</style>
