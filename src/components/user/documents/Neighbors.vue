<template lang="pug">
  .full-width
    base-tabs(v-model="tab")
      q-tab(v-for="(neighbor, index) in neighbors" :key="index" :name="neighbor.name" :label="neighbor.name")
      q-btn-dropdown(flat auto-close label="Добавить")
        q-list
          q-item(clickable @click="addNeighbor()")
            q-item-section
              | Супруга (у)
          q-item(clickable @click="addNeighbor()")
            q-item-section
              | Ребенка
    q-tab-panels(v-model="tab" animated keep-alive)
      q-tab-panel.q-px-none(v-for="(neighbor, index) in neighbors" :name="neighbor.name" :key="index")
        spouse-form
</template>

<script>
  import BaseTabs from "components/common/BaseTabs";
  import SpouseForm from "components/forms/documents/SpouseForm";
  import ChildForm from "components/forms/documents/ChildForm";

  export default {
    name: "Neighbors",
    components: { BaseTabs, SpouseForm, ChildForm },
    data () {
      return {
        neighbors: [],
        tab: null
      };
    },
    methods: {
      addNeighbor () {
        const item = {
          name: `Родственник ${ this.neighbors.length + 1 }`
        };
        this.neighbors.push(item);
        this.tab = item.name;
      }
      // addSpouse () {
      // },
      // addChild () {
      // }
    }
  };
</script>

