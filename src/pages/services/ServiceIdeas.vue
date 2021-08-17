<template lang="pug">
  div
    q-btn(label="asdad" color="primary")
    NewIdeaModal(v-if="pointCoords" v-model="pointCoords")
</template>

<script>
  import { mapActions, mapMutations } from "vuex";
  import { GET_IDEAS_GEO } from "../../store/constants/action-constants";
  import NewIdeaModal from "../../components/services/ideas/NewIdeaModal";
  import { SET_POINT_COORDS } from "../../store/constants/mutation-constants";

  export default {
    name: "ServiceIdeas",
    components: { NewIdeaModal },
    async created () {
      await this.GET_IDEAS_GEO();
    },
    computed: {
      pointCoords: {
        get () {
          return Boolean(this.$store.state.services.pointCoords);
        },

        set () {
          this.SET_POINT_COORDS(null);
        }
      }
    },
    methods: {
      ...mapActions("services", [
        GET_IDEAS_GEO
      ]),

      ...mapMutations("services", [
        SET_POINT_COORDS
      ])
    }
  };
</script>

<style scoped>

</style>
