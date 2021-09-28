<template lang="pug">
  .q-pa-lg(style="height: calc(100vh - 50px)")
    .col-12.column.justify-between.full-height(v-if="componentInstance && geoJson")
      .row
        IdeaDetailsCard(v-if="id" :id="id")
        q-inner-loading(:showing="isLoading")
      .row.justify-end.justify-lg-center
        q-card.bg-white.column.row-md
          q-item(
            v-for="(item, index) in legendData"
            :key="index"
            :active="Boolean(currentLayer === item.layer)"
            active-class="bg-primary-light text-primary"
            clickable
            @click="toggleSectionVisibility(item.layer)"
          )
            q-item-section.text-center
              q-item-label(:class="item.color")
                | {{ item.label }}
              q-item-label
                | {{ item.caption }}
      //.text-center
      //  q-btn(color="primary" label="Создать заявку" @click="setDrawType('pointPrimitive')")
    NewIdeaModal(v-if="pointCoords" v-model="pointCoords" @created="onIdeaCreated")
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  import {
    GET_DATA,
    GET_IDEAS_GEO,
    GET_REFERENCES,
    TOGGLE_VISIBILITY_BY_LAYER,
    UPDATE_LIKE
  } from "../../store/constants/action-constants";
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
    async created () {
      if (!this.references) {
        await this.GET_REFERENCES();
      }
    },
    data () {
      return {
        componentInstance: null,
        currentLayer: null
      };
    },
    computed: {
      ...mapState("services", {
        geoJson: state => state.geoJson,
        featureId: state => state.pickedFeatureId,
        cesiumInstance: state => state.cesiumInstance,
        isDraw: state => state.isDraw
      }),

      ...mapState("services/ideas", {
        references: state => state.references
      }),

      dataLayers () {
        return this.geoJson.data.features.reduce((acc, i) => {
          acc.add(i.properties.layer);
          return acc;
        }, new Set());
      },

      ideasCount () {
        return this.geoJson.data.features.reduce((acc, i) => {
          acc.ideas += i.properties.typeId === 1 ? 1 : 0;
          acc.problems += i.properties.typeId === 2 ? 1 : 0;
          return acc;
        }, { ideas: 0, problems: 0 });
      },

      legendData () {
        const { ideas, problems } = this.ideasCount;

        return [
          {
            label: "Идеи",
            caption: ideas,
            layer: 1,
            color: "text-green"
          },
          {
            label: "Проблемы",
            caption: problems,
            layer: 2,
            color: "text-red"
          }
        ];
      },

      id () {
        return this.$route.query.id;
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
        GET_IDEAS_GEO,
        TOGGLE_VISIBILITY_BY_LAYER
      ]),

      ...mapActions("services/ideas", [
        GET_DATA,
        UPDATE_LIKE,
        GET_REFERENCES
      ]),

      ...mapMutations("services", {
        SET_POINT_COORDS,
        setDrawType: SET_DRAW_TYPE
      }),

      toggleSectionVisibility (id) {
        const layers = Array.from(this.dataLayers);

        if (this.currentLayer === id) {
          this.TOGGLE_VISIBILITY_BY_LAYER({ ids: layers, visibility: true });
          this.currentLayer = null;
        } else {
          this.TOGGLE_VISIBILITY_BY_LAYER({ ids: layers.filter(i => i !== id), visibility: false });
          this.TOGGLE_VISIBILITY_BY_LAYER({ ids: [id], visibility: true });
          this.currentLayer = id;
        }
      },

      async onIdeaCreated () {
        await this.GET_IDEAS_GEO();
        this.$q.notify({
          type: "positive",
          message: "Идея успешно создана"
        });
        this.pointCoords = null;
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
        } else if (this.$route.query.id) {
          await this.$router.replace({ name: "services-ideas", query: { } });
        }
      }
    }
  };
</script>

<style scoped>

</style>
