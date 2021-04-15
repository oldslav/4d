<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header
      router-view(name="toolbar")
    q-page-container
      router-view
</template>

<script lang="ts">
  import { defineComponent } from "@vue/composition-api";

  export default defineComponent({
    name: "MainLayout",
    preFetch ({ store, ssrContext, currentRoute }) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      return store.dispatch("serverInit", { ssrContext, currentRoute });
    }
  });
</script>
