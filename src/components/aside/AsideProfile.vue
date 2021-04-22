<template lang="pug">
  div.aside-profile
    q-list
      q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ $t("action.goBack") }}
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
    name: "AsideProfile",
    data () {
      return {
        items: [
          {
            label: this.$t("entity.profile"),
            action: "/profile",
            icon: "o_person",
            show: true
          },
          {
            label: this.$t("entity.documents"),
            action: "/stub",
            icon: "o_text_snippet",
            show: true
          },
          {
            label: this.$t("entity.tickets"),
            action: "/stub",
            icon: "o_library_add_check",
            show: true
          },
          {
            label: this.$t("entity.bills"),
            action: "/stub",
            icon: "o_article",
            show: true
          },
          {
            label: "Hidden stuff",
            action: "/stub",
            icon: "o_article",
            show: this.role === "admin"
          }
        ]
      };
    },
    computed: {
      // stub
      role () {
        return "user";
      }
    }
  };
</script>

<style lang="stylus">
  .aside-profile {
  }
</style>
