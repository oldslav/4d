<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map' }")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ getMenu.name }}
    q-separator

    q-expansion-item.territory-aside-expansion-item(
      v-for="section in getMenu.subSections"
      :key="section.id"
      :value="section.id === sectionId"
      :header-style="{ 'fontSize': '16px' }"
      @show="onShowSection(section.id)"
      group="territory"
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
  import { mapGetters, mapActions } from "vuex";
  import AsideRouterView from "../../services/AsideRouterView";
  import { SET_TERRITORY_LAYERS_VISIBILITY } from "../../../../store/constants/mutation-constants";
  import { FETCH_TERRITORY_SECTION_GEOJSON } from "../../../../store/constants/action-constants";

  export default {
    name: "AsideMapsTerritory",
    components: { AsideRouterView },
    created () {
      this.disabledLayers = Object.values(this.layersBySection)
        .reduce((res, layerIds) => {
          for (const id of layerIds) {
            res[id] = true;
          }
          return res;
        }, {});
    },
    data () {
      return {
        disabledLayers: {},
        sectionId: null
      };
    },
    computed: {
      ...mapGetters("maps/territory", ["getMenu", "getGeoJSON"]),
      layersBySection () {
        return this.getMenu.subSections.reduce((res, subSection) => {
          res[subSection.id] = subSection.layers.map(x => x.id);
          return res;
        }, {});
      },

      sectionsVisibility () {
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
      ...mapActions("maps/territory", {
        setLayersVisibility: SET_TERRITORY_LAYERS_VISIBILITY,
        fetchSectionGeoJSON: FETCH_TERRITORY_SECTION_GEOJSON
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

      toggleLayerVisibility (layerId) {
        const visibility = !this.disabledLayers[layerId];
        this.$set(this.disabledLayers, layerId, visibility);

        this.setLayersVisibility({ ids: [layerId], visibility: !visibility });
      },

      onShowSection (sectionId) {
        if (this.sectionId !== sectionId) {
          this.sectionId = sectionId;
          this.setLayerVisibilityBySection(sectionId);
          this.fetchSectionGeoJSON(sectionId);
        }
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
