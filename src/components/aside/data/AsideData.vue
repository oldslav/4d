<template lang="pug">
  q-list
    q-item.q-py-md(
      v-for="(section, index) in menuSections"
      :key="index"
      clickable
      :to="{name: section.link}"
      active-class="list-item-active"
    )
      q-item-section
        .row.items-center
          img.col-auto(:src="require(`@/assets/svg/data/aside/${ section.icon }`)")

          .col.q-ml-md
            | {{ section.name }}
</template>

<script>
  export default {
    name: "AsideData",
    computed: {
      menuSections () {
        return [
          {
            name: this.$t("entity.data.aside.buildings.title"),
            link: "data-buildings",
            icon: "asideBuildings.svg"
          },
          {
            name: this.$t("entity.data.aside.transport.title"),
            link: "data-transport",
            icon: "asideTransport.svg"
          },
          {
            name: this.$t("entity.data.aside.improvement.title"),
            link: "data-improvement",
            icon: "asideImprovement.svg"
          },
          {
            name: this.$t("entity.data.aside.lighting.title"),
            link: "data-lighting",
            icon: "asideLighting.svg"
          },
          {
            name: this.$t("entity.data.aside.tourism.title"),
            link: "data-tourism",
            icon: "asideTourism.svg"
          },
          {
            name: this.$t("entity.data.aside.territory.title"),
            link: "data-territory",
            icon: "asideTerritory.svg"
          },
          {
            name: this.$t("entity.data.aside.environment.title"),
            link: "data-environment",
            icon: "asideEnvironment.svg"
          }
        ];
      }
    }
  };
</script>
