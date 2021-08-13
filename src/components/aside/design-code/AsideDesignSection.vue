<template lang="pug">
  div.full-height
    q-list.full-height
      q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
        q-item-section.list-item-avatar(avatar)
          q-icon.text-primary(name="arrow_back")
        q-item-section(avatar)
          | {{ $t("action.back") }}
      q-separator
      q-item(v-for="section in subSections" :key="section.number").text-subtitle
        q-item-section
          | {{ section.number }}. {{ section.name }}
      q-item
        q-item-section
          q-btn.full-width(outline color="primary" label="Скачать этот раздел" @click="downloadSection")
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { DOWNLOAD_FILE } from "@/store/constants/action-constants";

  export default {
    name: "AsideDesignSection",
    computed: {
      ...mapGetters("design", ["getCurrentSection"]),
      subSections () {
        return this.getCurrentSection.subSections.map(({ name, number }) => ({
          name,
          number
        }));
      }
    },
    methods: {
      ...mapActions([DOWNLOAD_FILE]),
      downloadSection () {
        return this.DOWNLOAD_FILE(this.getCurrentSection.docUrl);
      }
    }

  };
</script>
