<template lang="pug">
  div
    BaseMap(
      v-if="isMap"
      :data="geoJson"
      @change="onMapClick"
      @pointCreated="onPointCreate"
    )
    router-view
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";
  import { SET_FEATURE_ID, SET_POINT_COORDS } from "../../store/constants/mutation-constants";

  export default {
    name: "BaseService",
    components: { BaseMap },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson
      }),

      isMap () {
        return Boolean(this.$route.meta.map);
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID,
        SET_POINT_COORDS
      ]),

      onMapClick (e) {
        if (e && e._properties._fill._value !== "#FF6565") {
          this.SET_FEATURE_ID(e.id);
        } else {
          this.SET_FEATURE_ID(null);
        }
      },

      onPointCreate (coords) {
        this.SET_POINT_COORDS(coords);
      }
    }
  };
</script>

<style scoped>

</style>
