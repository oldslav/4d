<template lang="pug">
  div
    BaseMap(
      :data="geoJson"
    )
    router-view
</template>

<script>
  import { mapState } from "vuex";
  import BaseMap from "../../components/common/BaseMap";

  export default {
    name: "MapsService",
    components: { BaseMap },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson
      })
    }
  };
</script>

<style scoped>

</style>
