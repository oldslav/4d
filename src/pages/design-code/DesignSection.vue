<template lang="pug">
  .row.q-pa-lg
    .col-9
      SubSection(v-for="(section, index) in getCurrentSection.sub_sections" :key="index" :value="section").q-mb-lg
</template>

<script>
  import { mapGetters } from "vuex";
  import { GET_DESIGN_SECTION } from "@/store/constants/action-constants";
  import SubSection from "components/design-code/SubSection";

  export default {
    name: "DesignSection",
    components: { SubSection },
    preFetch ({ store, currentRoute }) {
      const id = currentRoute.params.id;
      return store.dispatch(`design/${ GET_DESIGN_SECTION }`, id);
    },
    computed: {
      ...mapGetters("design", ["getCurrentSection"])
    }
  };
</script>
