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
  export default {
    name: "AsideMaps",
    computed: {
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
            action: {
              name: "map-buildings"
            },
            icon: "o_domain",
            show: true
          }
        ];
      }
    }
  };
</script>

<style scoped>

</style>
