<template lang="pug">
  div
    BaseMap(
      :data="geoJson"
      @change="onMapClick"
    )
    router-view
</template>

<script>
  import { mapMutations, mapActions, mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";
  import { GET_TREES_GEO } from "../../store/constants/action-constants";
  import { SET_FEATURE_ID } from "../../store/constants/mutation-constants";

  export default {
    name: "ServiceTrees",
    components: { BaseMap },
    async created () {
      await this.GET_TREES_GEO();
    },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson
      })
    },
    methods: {
      ...mapActions("services", [
        GET_TREES_GEO
      ]),

      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      onMapClick (e) {
        if (e && e._properties._fill._value !== "#FF6565") {
          this.SET_FEATURE_ID(e.id);
        } else {
          this.SET_FEATURE_ID(null);
        }
      }
    }
  };
</script>

<style scoped>

</style>
