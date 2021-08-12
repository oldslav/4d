<template lang="pug">
  div(v-if="!$route.meta.asideSection")
    q-list
      q-item.q-py-lg.text-subtitle
        q-item-section
          | Разделы
      q-separator
      q-item(clickable :to="{name: 'design-intro'}" active-class="list-item-active").q-py-md.text-subtitle
        q-item-section
          | Введение
      q-item(
        v-for="section in menuSections"
        :key="section.id"
        clickable
        :to="{name: 'design-section', params: {id: section.id}}"
      ).q-py-md.text-subtitle
        q-item-section
          | {{ section.name }}
  router-view(name="asideSection" v-else)
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "AsideDesignCode",
    computed: {
      ...mapGetters("design", ["getDesignSections"]),
      menuSections () {
        return this.getDesignSections.map((s) => ({
          id: s.id,
          name: s.name
        }));
      }
    }
  };
</script>
