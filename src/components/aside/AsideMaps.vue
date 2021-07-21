<template lang="pug">
  q-list
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
</template>

<script>
  export default {
    name: "AsideMaps",
    computed: {
      items () {
        return [
          {
            label: this.$t("entity.services.living.title"),
            action: {
              name: "map-apartments"
            },
            icon: "o_person",
            show: true
          }
        ];
      }
    }
  };
</script>

<style scoped>

</style>
