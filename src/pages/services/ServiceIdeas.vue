<template lang="pug">
  .q-pa-lg(style="height: calc(100vh - 50px)")
    .col-12.column.justify-between.full-height(v-if="componentInstance")
      .row
        IdeaDetailsCard(v-if="fzz" :id="fzz")
        q-inner-loading(:showing="isLoading")
      //.text-center
      //  q-btn(color="primary" label="Создать заявку" @click="setDrawType('pointPrimitive')")
    NewIdeaModal(v-if="pointCoords" v-model="pointCoords" @created="onIdeaCreated")
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  import { GET_DATA, GET_IDEAS_GEO, UPDATE_LIKE } from "../../store/constants/action-constants";
  import NewIdeaModal from "../../components/services/ideas/NewIdeaModal";
  import { SET_DRAW_TYPE, SET_POINT_COORDS } from "../../store/constants/mutation-constants";
  import IdeaDetailsCard from "../../components/services/ideas/IdeaDetailsCard";

  export default {
    name: "ServiceIdeas",
    components: { NewIdeaModal, IdeaDetailsCard },
    props: {
      map: {
        type: [Object, null],
        default: null
      }
    },
    data () {
      return {
        componentInstance: null
      };
    },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson,
        featureId: state => state.pickedFeatureId,
        cesiumInstance: state => state.cesiumInstance,
        isDraw: state => state.isDraw
      }),

      fzz () {
        return this.featureId || this.$route.query.id;
      },

      isLoading () {
        return this.$store.state.wait[`services/ideas/${ GET_DATA }`];
      },

      authorName () {
        return this.current.author.name.full || `${ this.current.author.name.first } ${ this.current.author.name.last }`;
      },

      pointCoords: {
        get () {
          return Boolean(this.$store.state.services.pointCoords);
        },

        set () {
          this.SET_POINT_COORDS(null);
          this.setDrawType(null);
        }
      }
    },
    methods: {
      ...mapActions("services", [
        GET_IDEAS_GEO
      ]),

      ...mapActions("services/ideas", [
        GET_DATA,
        UPDATE_LIKE
      ]),

      ...mapMutations("services", {
        SET_POINT_COORDS,
        setDrawType: SET_DRAW_TYPE
      }),

      async onIdeaCreated () {
        await this.GET_IDEAS_GEO();
        this.$q.notify({
          type: "positive",
          message: "Идея успешно создана"
        });
      },

      async onViewerReady () {
        await this.GET_IDEAS_GEO();
      }
    },
    watch: {
      cesiumInstance: {
        immediate: true,
        handler (value) {
          if (value) {
            this.componentInstance = this.$root.map.componentInstance;
            this.onViewerReady();
          }
        }
      },

      async featureId (val) {
        if (val) {
          if (val !== this.$route.query.id) {
            await this.$router.replace({ name: "services-ideas", query: { id: val } });
          }
          await this.GET_DATA(val);
        } else if (this.$route.query.id) {
          await this.$router.replace({ name: "services-ideas", query: { } });
        }
      }
    }
  };
</script>

<style scoped>

</style>
