<template lang="pug">
  div
    BaseMap(
      :data="geoJson"
      @change="onMapClick"
    )
    router-view
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";
  import { SET_FEATURE_ID } from "../../store/constants/mutation-constants";

  export default {
    name: "BaseService",
    components: { BaseMap },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson
      })
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      onMapClick (e) {
        if (e) {
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
