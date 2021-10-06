<template lang="pug">
  q-list(v-if="!meta.asideServices")
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
      class="list-item"
      active-class="list-item-active"
      v-if="item.show"
    )
      q-item-section.list-item-avatar(avatar)
        q-icon(:name="item.icon")
      q-item-section
        | {{ item.label }}

  router-view(name="asideServices" v-else)
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import { SET_EMPTY } from "../../store/constants/mutation-constants";

  export default {
    name: "AsideServices",
    beforeRouteUpdate (to, from, next) {
      if (to.name === "services" && from.meta.map) {
        this.SET_EMPTY();
      }
      next();
    },
    computed: {
      ...mapGetters(["isUserNature", "isUserLegal", "isUserGIS", "isEmployee", "isDev"]),

      meta () {
        return this.$route.meta;
      },

      items () {
        return [
          {
            label: this.$t("entity.estate.title"),
            action: { name: "gis-services-estate" },
            icon: "o_article",
            show: this.isUserGIS
          },
          {
            label: this.$t("entity.transport"),
            action: { name: "gis-services-transport" },
            icon: "o_directions_bus",
            show: this.isUserGIS
          },
          {
            label: this.$t("entity.tourism"),
            action: { name: "gis-services-tourism" },
            icon: "o_photo_camera",
            show: this.isDev && this.isUserGIS
          },
          {
            label: this.$t("entity.landscape"),
            action: { name: "gis-services-landscape" },
            icon: "o_park",
            show: this.isDev && this.isUserGIS
          },
          {
            label: this.$t("entity.lighting"),
            action: { name: "gis-services-light" },
            icon: "o_lightbulb",
            show: this.isUserGIS
          },
          {
            label: this.$t("entity.planning"),
            action: { name: "gis-services-planning" },
            icon: "o_explore",
            show: this.isDev && this.isUserGIS
          },
          {
            label: this.$t("entity.services.living.title"),
            action: {
              name: "services-apartments"
            },
            icon: "o_person",
            show: (this.isDev && this.isUserNature || this.isUserLegal) && this.$route.query.requestId
          },
          {
            label: this.$t("entity.services.commerce.title"),
            action: {
              name: "services-commerce"
            },
            icon: "o_text_snippet",
            show: this.isDev && this.isUserLegal
          },
          {
            label: this.$t("entity.services.parking.title"),
            action: {
              name: "services-parking"
            },
            icon: "o_local_parking",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.warehouse.title"),
            action: {
              name: "services-warehouse"
            },
            icon: "pedal_bike",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.ideas"),
            action: {
              name: "services-ideas"
            },
            icon: "o_online_prediction",
            show: this.isDev && this.isUserNature || this.isEmployee
          },
          {
            label: this.$t("entity.services.crowdfunding.title"),
            action: {
              name: "services-crowdfunding"
            },
            icon: "o_groups",
            show: this.isDev && this.isUserNature
          },
          {
            label: this.$t("entity.services.vacancies.title"),
            action: {
              name: "services-vacancies"
            },
            icon: "work_outline",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.trees.title"),
            action: {
              name: "services-trees"
            },
            icon: "o_park",
            show: this.isDev && this.isEmployee
          },
          {
            label: this.$t("entity.lighting"),
            action: {
              name: "services-light"
            },
            icon: "o_lightbulb",
            show: this.isDev && this.isEmployee
          }
        ];
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_EMPTY
      ])
    }
  };
</script>

<style lang="stylus">

</style>
