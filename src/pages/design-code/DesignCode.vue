<template lang="pug">
  q-page.bg-blue
    router-view
</template>

<script>
  import { GET_DESIGN_SECTIONS } from "@/store/constants/action-constants";

  export default {
    name: "DesignCode",
    preFetch ({ store }) {
      return store.dispatch(`design/${ GET_DESIGN_SECTIONS }`);
    }
  };
</script>

