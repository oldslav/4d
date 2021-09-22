<template lang="pug">
  aside-router-view(name="asideSecurity")
    q-list
      q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map' }")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ getMenu | i18nName }}
      q-separator

      q-expansion-item.security-aside-expansion-item(
        v-for="section in getMenu.subSections"
        :key="section.id"
        :header-style="{ 'fontSize': '16px' }"
        :disable="hasOneSection"
        default-opened
        switch-toggle-side
        expand-separator
      )
        div.row.items-center.full-width(slot="header")
          div.col {{ section | i18nName }}
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
          :class="{'security-layer__list': !$q.dark.isActive, 'q-dark': $q.dark.isActive}"
        )
          q-item(
            v-for="layer in section.layers"
            :key="layer.id"
            clickable
          )
            q-item-section(avatar)
              span.security-layer__color(:style="{ backgroundColor: layer.color }")
            q-item-section
              | {{ layer }} {{ layer | i18nName }}

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
  import { SET_SECURITY_LAYERS_VISIBILITY } from "../../../../store/constants/mutation-constants";

  export default {
    name: "AsideMapsSecurity",
    components: { AsideRouterView },
    data (){
      return {
        disabledLayers: {}
      };
    },
    computed: {
      ...mapGetters("maps/security", ["getMenu"]),
      canDisplaySectionVisible () {
        return this.getMenu.subSections.length > 1;
      },
      hasOneSection () {
        return this.getMenu.subSections.length === 1;
      },
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
      ...mapActions("maps/security", {
        setSecurityLayersVisibility: SET_SECURITY_LAYERS_VISIBILITY
      }),
      toggleSectionVisibility (sectionId) {
        const visibility = !this.sectionsVisibility[sectionId];
        const layerIds = this.layersBySection[sectionId];

        layerIds.map(layerId => this.$set(this.disabledLayers, layerId, !visibility));

        this.setSecurityLayersVisibility({ ids: layerIds, visibility });
      },

      toggleLayerVisibility (layerId) {
        const visibility = !this.disabledLayers[layerId];
        this.$set(this.disabledLayers, layerId, visibility);

        this.setSecurityLayersVisibility({ ids: [ layerId ], visibility: !visibility });
      }
    }
  };
</script>
<style lang="stylus">
.security-layer__list
  background: #F5F9FE;

.security-layer__color
  width 14px
  height 14px
  border-radius: 100%;
  margin-left 6px

.security-layer__list_invisible
  visibility hidden

.security-aside-expansion-item .q-item.disabled,
.security-aside-expansion-item .q-item.disabled *
  cursor default !important
</style>
