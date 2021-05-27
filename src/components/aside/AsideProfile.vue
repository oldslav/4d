<template lang="pug">
  div.aside-profile
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
  import { mapGetters } from "vuex";

  export default {
    name: "AsideProfile",
    computed: {
      ...mapGetters(["getUserRolesNames"]),
      isUser () {
        return this.getUserRolesNames.includes("ROLE_USER") || this.isJuristic;
      },
      isJuristic () {
        return this.getUserRolesNames.includes("ROLE_USER_JURISTIC");
      },

      items () {
        return [
          {
            label: this.$t("entity.profile"),
            action: { name: "user-profile" },
            icon: "o_person",
            show: this.isUser
          },
          {
            label: this.$t("entity.companyProfile.title"),
            action: { name: "user-company" },
            icon: "o_business_center",
            show: this.isJuristic
          },
          {
            label: this.$t("entity.documents.title"),
            action: { name: "user-documents" },
            icon: "o_text_snippet",
            show: this.isUser
          },
          {
            label: this.$t("entity.tickets.title"),
            action: { name: "user-tickets" },
            icon: "o_library_add_check",
            show: this.isUser
          },
          {
            label: this.$t("entity.bills"),
            action: { name: "user-bills" },
            icon: "o_article",
            show: this.isUser
          }
        ];
      }
    }
  };
</script>

<style lang="stylus">
  .aside-profile {
  }
</style>
