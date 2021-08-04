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
  import { mapGetters } from "vuex";

  export default {
    name: "AsideServices",
    computed: {
      ...mapGetters(["isUserNature", "isUserLegal"]),

      meta () {
        return this.$route.meta;
      },

      items () {
        return [
          {
            label: this.$t("entity.services.living.title"),
            action: {
              name: "services-apartments"
            },
            icon: "o_person",
            show: this.$route.query.requestId && this.isUserNature || this.isUserLegal
          },
          {
            label: this.$t("entity.services.commerce"),
            action: {
              name: "services-commerce"
            },
            icon: "o_text_snippet",
            show: this.isUserLegal
          },
          {
            label: this.$t("entity.services.parking.title"),
            action: {
              name: "services-parking"
            },
            icon: "o_library_add_check",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.warehouse.title"),
            action: {
              name: "services-warehouse"
            },
            icon: "o_article",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.ideas"),
            action: {
              name: "services-ideas"
            },
            icon: "o_article",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.crowdfunding.title"),
            action: {
              name: "services-crowdfunding"
            },
            icon: "o_article",
            show: this.isUserNature
          },
          {
            label: this.$t("entity.services.vacancies.title"),
            action: {
              name: "services-vacancies"
            },
            icon: "o_article",
            show: this.isUserNature
          }
        ];
      }
    }
  };
</script>

<style lang="stylus">

</style>
