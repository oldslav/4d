<template lang="pug">
  div
    router-view
    TourismStopModal(
      v-model="visibleStopModal"
      :entity="stopEntity"
    )
</template>

<script>
  import { mapGetters } from "vuex";
  import TourismStopModal from "../../../components/services/tourism/TourismStopModal";
  import { FETCH_TOURISM_MENU, PUT_LAYER_GEOJSON } from "../../../store/constants/action-constants";
  import { TourismGeoJSONEntities } from "../../../store/types/tourism";
  import { SET_CLUSTERING, SET_FEATURE_ID, SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "ServiceTourism",
    components: { TourismStopModal },
    async preFetch ({ store }) {
      await store.dispatch(`services/tourism/${ FETCH_TOURISM_MENU }`);
      store.commit(`services/${ SET_CLUSTERING }`, false);
      store.commit(`services/${ SET_GEODATA }`, null);
    },
    mounted () {
      this.$watch("getPickedFeatureId", this.onChangeTargetEntity);
      this.$watch("visibleStopModal", this.onChangeVisibleStopModal);
    },
    data (){
      return {
        stopEntity: null,
        visibleStopModal: false
      };
    },
    beforeRouteLeave (to, from, next){
      this.$store.dispatch(`services/tourism/${ PUT_LAYER_GEOJSON }`);
      this.$store.commit(`services/${ SET_CLUSTERING }`, true);
      next();
    },
    computed:{
      ...mapGetters("services", ["getPickedFeatureId", "pickedFeature"])
    },
    methods:{
      onChangeTargetEntity (id) {
        if (id && this.pickedFeature.properties.type !== TourismGeoJSONEntities.stop) {
          const { category, layer } = this.$route.params;
          this.$router.push({ name: "services-tourism-entity", params: { category: category, layer: layer, id } });
        } else if (id && this.pickedFeature.properties.type === TourismGeoJSONEntities.stop) {
          this.stopEntity = this.pickedFeature;
          this.visibleStopModal = true;
        }
      },

      onChangeVisibleStopModal (val){
        if (!val) {
          this.$store.commit(`services/${ SET_FEATURE_ID }`, null);
        }
      }
    }
  };
</script>
