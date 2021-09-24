<template lang="pug">
  aside-router-view(name="asideTourism")
    q-list
      q-item.q-py-lg.text-subtitle(clickable :to="{ name: 'map' }")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ getServiceMenu.name }}
      q-separator

      q-item.q-py-md.text-subtitle(
        v-for="(item, index) in getServiceMenu.subSections"
        :key="item.id"
        :to="{ name: 'map-tourism-category', params: { category: item.id } }"
        clickable
      )
        q-item-section.list-item-avatar(avatar)
          q-icon(:name="`img:${item.icon}`")
        q-item-section
          | {{ item.name }}
</template>

<script>
  import { mapGetters } from "vuex";
  import AsideRouterView from "../../services/AsideRouterView";

  export default {
    name: "AsideMapsTourism",
    components: { AsideRouterView },
    data (){
      return {
        visible: false
      };
    },
    computed:{
      ...mapGetters("services/tourism", ["getServiceMenu"])
    }
  };
</script>
