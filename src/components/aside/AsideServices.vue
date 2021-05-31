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
      ...mapGetters(["getUserRolesNames"]),
      isUser () {
        return this.getUserRolesNames.includes("ROLE_USER");
      },

      meta () {
        return this.$route.meta;
      },

      items () {
        return [
          {
            label: this.$t("entity.services.living"),
            action: {
              name: "services-living"
            },
            icon: "o_person",
            show: this.isUser
          },
          {
            label: this.$t("entity.services.commerce"),
            action: {
              name: "services-commerce"
            },
            icon: "o_text_snippet",
            show: this.isUser
          },
          {
            label: this.$t("entity.services.parking.title"),
            action: {
              name: "services-parking"
            },
            icon: "o_library_add_check",
            show: this.isUser
          },
          {
            label: this.$t("entity.services.warehouse"),
            action: {
              name: "services-warehouse"
            },
            icon: "o_article",
            show: this.isUser
          },
          {
            label: this.$t("entity.services.ideas"),
            action: {
              name: "services-ideas"
            },
            icon: "o_article",
            show: this.isUser
          },
          {
            label: this.$t("entity.services.vacancies"),
            action: {
              name: "services-vacancies"
            },
            icon: "o_article",
            show: this.isUser
          }
        ];
      }
    }
  };
</script>

<style lang="stylus">

</style>
