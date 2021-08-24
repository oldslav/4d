<template>
  <div v-if="cesiumInstance" class="q-pa-lg full-height column">
    <div class="bg-primary column col">
    </div>
    <div>
      <q-btn color="primary" label="Отметить на карте" @click="componentInstance.toggle('handlerPoint')">
      </q-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AsideServicesIdeas",
    created () {
      this.$root.$once("onViewerReady", ({ cesiumInstance, componentInstance }) => {
        this.cesiumInstance = cesiumInstance;
        this.componentInstance = componentInstance;
      });
    },
    data () {
      return {
        cesiumInstance: null,
        componentInstance: null
      };
    }
  };
</script>

<style scoped>

</style>
