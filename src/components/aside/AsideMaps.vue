<template lang="pug">
  q-list(v-if="!meta.asideMaps")
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator
    q-item.q-py-md.text-subtitle(
      v-for="(item, index) in items"
      :key="index"
      clickable
      :to="item.action"
      active-class="list-item-active"
      v-if="item.show"
    )
      q-item-section.list-item-avatar(avatar)
        q-icon(:name="item.icon")
      q-item-section
        | {{ item.label }}

  router-view(name="asideMaps" v-else)
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "AsideMaps",
    computed: {
      ...mapGetters(["isUserGIS", "isEmployee"]),
      meta () {
        return this.$route.meta;
      },

      items () {
        return [
          {
            label: this.$t("entity.tourism"),
            action: { name: "map-tourism" },
            icon: "o_photo_camera",
            show: true
          },
          {
            label: this.$t("entity.maps.buildings.title"),
            action: { name: "map-buildings" },
            icon: "o_domain",
            show: true
          },
          {
            label: this.$t("entity.maps.security.title"),
            action: { name: "map-security" },
            icon: "o_lock",
            show: this.isUserGIS || this.isEmployee
          },
          {
            label: this.$t("entity.maps.engineering.menu"),
            action: { name: "map-engineering" },
            icon: "engineering",
            show: this.isUserGIS
          },
          {
            label: this.$t("entity.maps.transport.title"),
            action: { name: "map-transport" },
            icon: "directions_bus",
            show: true
          },
          {
            label: this.$t("entity.maps.territory.title"),
            action: { name: "map-territory" },
            icon: "o_explore",
            show: true
          },
          {
            label: this.$t("entity.maps.light.title"),
            action: { name: "map-light" },
            icon: "o_lightbulb",
            show: true
          },
          {
            label: this.$t("entity.maps.improvement.title"),
            action: { name: "map-improvement" },
            icon: "o_nature",
            show: true
          }
        ];
      }
    }
  };
</script>

<style scoped>

</style>
