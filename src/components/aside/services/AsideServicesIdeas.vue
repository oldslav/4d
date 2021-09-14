<template lang="pug">
  div(v-if="cesiumInstance").q-pa-lg.full-height.column
    q-list.column.col.q-pb-md
      q-virtual-scroll(
        :items="features"
        separator
      )
        template(v-slot="{ item, index }")
          q-item(clickable :key="index" @click="selectFeature(item.id)")
            q-item-label
              | {{ item.title }}
    div
      q-btn(color="primary" label="Отметить на карте" @click="componentInstance.toggle('handlerPoint')").full-width
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import { SET_FEATURE_ID } from "../../../store/constants/mutation-constants";

  export default {
    name: "AsideServicesIdeas",
    data () {
      return {
        componentInstance: null
      };
    },
    computed: {
      ...mapState("services", {
        cesiumInstance: state => state.cesiumInstance,
        geoJson: state => state.geoJson
      }),

      features () {
        return this.geoJson && this.geoJson.data.features.map(({ id, properties: { title } }) => ({
          id,
          title
        }));
      }
    },
    methods: {
      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      selectFeature (id) {
        this.SET_FEATURE_ID(id);
      }
    },
    watch: {
      cesiumInstance: {
        immediate: true,
        handler (value) {
          if (value) {
            this.componentInstance = this.$root.map.componentInstance;
          }
        }
      }
    }
  };
</script>

<style scoped>

</style>
