<template lang="pug">
  aside-router-view(name="asideBuildings")
    q-list
      q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map' }")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ getMenu | i18nName }}
      q-separator

      q-expansion-item(
        v-for="section in getMenu.subSections"
        :key="section.id"
        :label="section | i18nName"
        :header-style="{ 'fontSize': '16px' }"
        :value="visibleSection === section.id"
        group="layers"
        @show="onShowSection(section.id)"
        @hide="onHideSection(section.id)"
        switch-toggle-side
        expand-separator
      )
        q-inner-loading(:showing="!(section.id in getGeoJSON)")
          q-spinner(size="36px" color="primary")

        q-list(
          :class="{'layer__list_invisible': !(section.id in getGeoJSON), 'layer__list': !$q.dark.isActive, 'q-dark': $q.dark.isActive}"
        )
          q-item(
            v-for="layer in section.layers"
            :key="layer.id"
            clickable
          )
            q-item-section(avatar)
              span.layer__color(:style="{ backgroundColor: layer.color }")
            q-item-section
              | {{ layer | i18nName }}

            q-btn(
              @click.stop.prevent="toggleLayerVisibility(layer.id)"
              :icon="disabledLayers[layer.id] ? 'visibility_off' : 'visibility'"
              size="12px"
              flat
              dense
              round
            )
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import {
    FETCH_BUILDINGS_SECTION_GEOJSON,
    SET_BUILDINGS_SECTION_GEOJSON,
    TOGGLE_BUILDINGS_VISIBILITY_BY_LAYER
  } from "../../../../store/constants/action-constants";
  import { SET_GEODATA } from "../../../../store/constants/mutation-constants";
  import AsideRouterView from "../../services/AsideRouterView";

  export default {
    name: "AsideMapsBuildings",
    components: { AsideRouterView },
    async preFetch ({ store, currentRoute, redirect }){
      const sectionId = currentRoute.query.section ? parseInt(currentRoute.query.section, 10) : null;

      if (!sectionId) {
        return;
      }

      const section = store.getters["maps/buildings/getMenu"].subSections.find(x => x.id === sectionId);

      if (!section) {
        return redirect("/404");
      }

      await store.dispatch(`maps/buildings/${ FETCH_BUILDINGS_SECTION_GEOJSON }`, section.id);
      await store.dispatch(`maps/buildings/${ SET_BUILDINGS_SECTION_GEOJSON }`, section.id);
    },
    data (){
      const { section } = this.$route.query;

      return {
        visibleSection: section ? parseInt(section, 10) : null,
        disabledLayers: {}
      };
    },
    computed: {
      ...mapGetters("maps/buildings", ["getMenu", "getGeoJSON"])
    },
    methods: {
      ...mapActions("maps/buildings", {
        fetchSectionGeoJSON: FETCH_BUILDINGS_SECTION_GEOJSON,
        setSectionGeoJSON: SET_BUILDINGS_SECTION_GEOJSON,
        toggleVisibilityByLayer: TOGGLE_BUILDINGS_VISIBILITY_BY_LAYER
      }),
      onShowSection (sectionId){
        this.disabledLayers = {};
        this.visibleSection = sectionId;

        const route = Object.assign({}, this.$route,{ query: { section: sectionId } });

        this.$router.replace(route).catch(() => {
          // Do nothing
        });
      },

      loadSectionGeoJSON (sectionId){
        if (sectionId) {
          this.visibleSection = parseInt(sectionId, 10);
          this.fetchSectionGeoJSON(sectionId).then(() => {
            if (sectionId === this.visibleSection) {
              this.setSectionGeoJSON(sectionId);
            }
          });
        }
      },

      toggleLayerVisibility (layerId) {
        const visibility = !this.disabledLayers[layerId];

        this.$set(this.disabledLayers, layerId, visibility);
        this.toggleVisibilityByLayer({ id: layerId, visibility: !visibility });
      },

      onHideSection (id){
        if (id === this.visibleSection) {
          this.$store.commit(`services/${ SET_GEODATA }`, null);
          const route = Object.assign({}, this.$route,{ query: { } });
          this.$router.replace(route).catch(() => {
            // Do nothing
          });
        }
      }
    },
    watch: {
      "$route.query.section": "loadSectionGeoJSON"
    }
  };
</script>
<style lang="stylus" scoped>
.layer__list
  background: #F5F9FE;

.layer__color
  width 14px
  height 14px
  border-radius: 100%;
  margin-left 6px

.layer__list_invisible
  visibility hidden
</style>
