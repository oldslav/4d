<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable to="/services/tourism")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ getCategoryMenu | i18nName }}
    q-separator

    q-item.q-py-md.text-subtitle(
      v-for="(layer, index) in getCategoryMenu.layers"
     :key="layer.id"
     :to="{ name: 'map-tourism-layer', params: { layer: layer.id } }"
     clickable
    )
      q-item-section.list-item-avatar(v-if="item.icon" avatar)
        q-icon(:name="item.icon")
      q-item-section
        | {{ layer | i18nName }}
</template>

<script>
  import { mapGetters } from "vuex";
  import AsideRouterView from "../../services/AsideRouterView";

  export default {
    name: "AsideMapsTourismCategory",
    components: { AsideRouterView },
    computed: {
      ...mapGetters("services", ["getPickedFeatureId"]),
      ...mapGetters("services/tourism", ["getServiceMenu"]),

      getCategoryMenu (){
        const categoryId = parseInt(this.$route.params.category, 10);
        return this.getServiceMenu.subSections.find(x => x.id === categoryId);
      }
    }
  };
</script>
