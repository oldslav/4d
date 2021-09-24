<template lang="pug">
  aside-router-view(name="asideEngineering")
    div.full-height.flex.column
      q-list
        q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map' }")
          q-item-section.list-item-avatar(avatar)
            q-icon.text-primary(name="arrow_back")
          q-item-section(avatar)
            | {{ getMenu.name }}

      q-separator

      div.column.col.items-center.justify-center.text-h6(v-if="!getMenu.subSections.length") {{ $t('common.noData') }}
      div.full-width(v-else)
        q-expansion-item(
          v-for="section in getMenu.subSections"
          :key="section.id"
          :header-style="{ 'fontSize': '16px' }"
          :ref="`section:${section.id}`"
          :value="sectionId === section.id"
          @show="onShowSection(section.id)"
          group="sections"
          switch-toggle-side
          expand-separator
        )
          div.row.items-center.full-width(slot="header")
            div.col {{ section.name }}
            div.col-auto
              q-btn(
                @click.stop.prevent="toggleSectionVisibility(section.id)"
                size="12px"
                :icon="!sectionsVisibility[section.id] ? 'visibility_off' : 'visibility'"
                flat
                dense
                round
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
                | {{ layer.name }}

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
    FETCH_ENGINEERING_SECTION_GEOJSON,
    TOGGLE_ENGINEERING_VISIBILITY_BY_LAYER
  } from "../../../../store/constants/action-constants";
  import AsideRouterView from "../../services/AsideRouterView";

  export default {
    name: "AsideMapsEngineering",
    components: { AsideRouterView },
    created (){
      const routeSection = parseInt(this.$route.query.section, 10);
      this.sectionId = routeSection in this.layersBySection ? routeSection : null;

      this.disabledLayers = Object.entries(this.layersBySection)
        .reduce((res, [sectionId, layerIds]) => {
          if (sectionId !== routeSection) {
            for (const id of layerIds) {
              res[id] = true;
            }
          }
          return res;
        }, {});
    },
    data (){
      return {
        disabledLayers: {},
        sectionId: null
      };
    },
    computed: {
      ...mapGetters("maps/engineering", ["getMenu", "getGeoJSON"]),
      layersBySection (){
        return this.getMenu.subSections.reduce((res, subSection) => {
          res[subSection.id] = subSection.layers.map(x => x.id);
          return res;
        }, {});
      },

      sectionsVisibility (){
        const { disabledLayers, layersBySection } = this;
        const ids = Object.keys(layersBySection);

        return ids.reduce((res, id) => {
          const layersIds = layersBySection[id];
          res[id] = !layersIds.every(x => disabledLayers[x]);
          return res;
        }, {});
      }
    },
    methods: {
      ...mapActions("maps/engineering", {
        fetchSectionGeoJSON: FETCH_ENGINEERING_SECTION_GEOJSON,
        toggleVisibilityByLayer: TOGGLE_ENGINEERING_VISIBILITY_BY_LAYER
      }),

      onShowSection (sectionId){
        this.sectionId = sectionId;
        return this.loadSectionGeoJSON(sectionId);
      },

      loadSectionGeoJSON (sectionId){
        for (const section of this.getMenu.subSections) {
          const layerIds = this.layersBySection[section.id];
          for (const layerId of layerIds) {
            const hasVisibleLayer = sectionId === section.id;
            this.$set(this.disabledLayers, layerId, !hasVisibleLayer);
          }
        }

        if (sectionId) {
          this.fetchSectionGeoJSON(sectionId);
        }
      },

      toggleLayerVisibility (layerId) {
        const visibility = !this.disabledLayers[layerId];

        this.$set(this.disabledLayers, layerId, visibility);
        this.toggleVisibilityByLayer({ ids: [ layerId ], visibility: !visibility });
      },

      toggleSectionVisibility (sectionId){
        const visibility = !this.sectionsVisibility[sectionId];

        if (visibility) {
          const id = `section:${ sectionId }`;
          this.$refs[id][0].show();
        }

        const layerIds = this.layersBySection[sectionId];
        layerIds.map(layerId => this.$set(this.disabledLayers, layerId, !visibility));

        if (sectionId in this.getGeoJSON) {
          this.toggleVisibilityByLayer({ ids: layerIds, visibility });
        }
      }
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
