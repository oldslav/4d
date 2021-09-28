<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map' }")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ getMenu.name }}
    q-separator

    q-expansion-item.security-light-expansion-item(
      v-for="section in getSections"
      :key="section.id"
      :header-style="{ 'fontSize': '16px' }"
      :disable="hasOneSection"
      :value="section.id === sectionId"
      @show="onShowSection(section.id)"
      default-opened
      switch-toggle-side
      expand-separator
    )
      div.row.items-center.full-width(slot="header")
        div.col {{ section.name }}
        div.col-auto(v-if="canDisplaySectionVisible")
          q-btn(
            @click.stop.prevent="toggleSectionVisibility(section.id)"
            size="12px"
            :icon="!sectionsVisibility[section.id] ? 'visibility_off' : 'visibility'"
            flat
            dense
            round
          )

      q-list(
        :class="{'layer__list': !$q.dark.isActive, 'q-dark': $q.dark.isActive}"
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
  import AsideRouterView from "../../services/AsideRouterView";
  import {
    FETCH_LIGHT_SECTION_GEOJSON,
    SET_LIGHT_LAYERS_VISIBILITY
  } from "../../../../store/constants/action-constants";

  export default {
    name: "AsideMapsLight",
    components: { AsideRouterView },
    created () {
      if (this.getSections.length === 1) {
        this.sectionId = this.getSections[0].id;
      }

      this.disabledLayers = Object.entries(this.layersBySection)
        .reduce((res, [sectionId, layerIds]) => {
          const section = parseInt(sectionId, 10);
          for (const id of layerIds) {
            res[id] = this.sectionId !== section;
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
      ...mapGetters("maps/light", ["getMenu", "getGeoJSON"]),
      getSections (){
        return this.getMenu.subSections;
      },

      canDisplaySectionVisible () {
        return this.getSections.length > 1;
      },

      hasOneSection () {
        return this.getSections.length === 1;
      },

      layersBySection (){
        return this.getSections.reduce((res, subSection) => {
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
      ...mapActions("maps/light",{
        fetchSectionGeoJSON: FETCH_LIGHT_SECTION_GEOJSON,
        setLayersVisibility: SET_LIGHT_LAYERS_VISIBILITY
      }),
      setLayerVisibilityBySection (sectionId) {
        for (const section of this.getMenu.subSections) {
          const layerIds = this.layersBySection[section.id];
          for (const layerId of layerIds) {
            const hasVisibleLayer = sectionId === section.id;
            this.$set(this.disabledLayers, layerId, !hasVisibleLayer);
          }
        }
      },

      onShowSection (sectionId){
        if (this.sectionId !== sectionId) {
          this.sectionId = sectionId;
          this.setLayerVisibilityBySection(sectionId);
          this.fetchSectionGeoJSON(sectionId);
        }
      },

      toggleLayerVisibility (layerId) {
        const visibility = !this.disabledLayers[layerId];
        this.$set(this.disabledLayers, layerId, visibility);

        this.setLayersVisibility({ ids: [layerId], visibility: !visibility });
      },

      toggleSectionVisibility (sectionId) {
        if (!(sectionId in this.getGeoJSON) || this.sectionId !== sectionId) {
          this.onShowSection(sectionId);
          return;
        }

        const layers = this.layersBySection[sectionId];
        const visibility = !this.sectionsVisibility[sectionId];

        for (const layerId of layers) {
          this.$set(this.disabledLayers, layerId, !visibility);
        }

        this.setLayersVisibility({ ids: layers, visibility });
      }
    }
  };
</script>
<style lang="stylus">
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
